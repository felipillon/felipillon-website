"""
Job listing + application routes — backed live by Manatal's Career Page API.

Replaces the previous flow (static ROLES list on the frontend + applications
saved to our own Postgres + Cloudinary). Nothing here touches our database —
Manatal is now the single source of truth for both job posts and submitted
applications.
"""
import json
import logging

import httpx
from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from slowapi import Limiter
from slowapi.util import get_remote_address

from services import manatal

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/jobs", tags=["jobs"])
limiter = Limiter(key_func=get_remote_address)

MAX_CV_SIZE = 5 * 1024 * 1024  # 5 MB


def _manatal_unavailable():
    raise HTTPException(
        status_code=503,
        detail="Job listings are temporarily unavailable. Please try again shortly.",
    )


def _pick_translation(translations, lang="en"):
    """Manatal returns per-language translations for a job's name/description.
    Prefer the requested language, fall back to English, then whatever's first."""
    if not translations:
        return {}
    for t in translations:
        if t.get("language_code") == lang:
            return t
    for t in translations:
        if t.get("language_code") == "en":
            return t
    return translations[0]


def _format_location(location: dict | None) -> str:
    if not location:
        return "Remote"
    parts = [location.get("city"), location.get("state"), location.get("country")]
    return ", ".join(p for p in parts if p) or "Remote"


def _normalize_job(raw: dict, lang: str = "en") -> dict:
    """Flatten Manatal's raw job-post shape into a stable, simple shape our
    frontend can rely on without knowing Manatal's internal field names."""
    tr = _pick_translation(raw.get("translations"), lang)
    location = raw.get("location") or {}
    return {
        "id": raw.get("id"),
        "title": tr.get("name") or raw.get("name") or "Untitled Role",
        "description": tr.get("description") or "",
        "department": raw.get("organization_name") or raw.get("organization") or "General",
        "location": _format_location(location),
        "country": location.get("country"),
        "is_pinned": raw.get("is_pinned", False),
        "salary_min": raw.get("salary_min"),
        "salary_max": raw.get("salary_max"),
        "salary_currency": raw.get("salary_currency"),
        "status": raw.get("status"),
    }


def _normalize_option(opt, lang: str = "en") -> dict:
    """Options can plausibly come back as plain strings, {value,label}, or
    {id,translations[]} — normalize all of them to a consistent shape."""
    if isinstance(opt, str):
        return {"value": opt, "label": opt}
    if isinstance(opt, dict):
        if opt.get("translations"):
            tr = _pick_translation(opt["translations"], lang)
            label = tr.get("label") or tr.get("name")
        else:
            label = opt.get("label") or opt.get("name")
        value = opt.get("value") if opt.get("value") is not None else opt.get("id")
        return {"value": value if value is not None else label, "label": label or str(value)}
    return {"value": opt, "label": str(opt)}


def _normalize_field(raw: dict, lang: str = "en") -> dict:
    """Flatten one application-form field into a stable shape for the frontend
    to render generically, regardless of exact Manatal type strings."""
    tr = _pick_translation(raw.get("translations"), lang)
    raw_type = (raw.get("type") or "text").lower()

    # Map Manatal's field types to a small set our frontend knows how to render.
    if raw_type in ("file", "resume", "attachment", "cv"):
        kind = "file"
    elif raw_type in ("long_text", "textarea", "paragraph"):
        kind = "textarea"
    elif raw_type in ("dropdown", "select", "single_choice"):
        kind = "select"
    elif raw_type in ("multiple_choice", "checkbox_group", "multi_select"):
        kind = "multiselect"
    elif raw_type in ("boolean", "checkbox"):
        kind = "checkbox"
    elif raw_type == "email":
        kind = "email"
    elif raw_type == "phone":
        kind = "tel"
    elif raw_type == "number":
        kind = "number"
    elif raw_type == "date":
        kind = "date"
    else:
        kind = "text"

    return {
        "id": raw.get("id"),
        "mapping_id": raw.get("mapping_id"),
        "kind": kind,
        "label": tr.get("label") or raw.get("field_name") or "Field",
        "required": raw.get("is_required", False),
        "options": [_normalize_option(o, lang) for o in (raw.get("options") or [])],
    }


@router.get("")
async def list_jobs(search: str | None = None, page: int = 1, size: int = 50, lang: str = "en"):
    """
    List published job posts from Manatal (normalized shape). Fetches a
    generous page size by default so the frontend can filter by department/
    location client-side, matching the old static-list UX.
    """
    if not manatal.is_configured():
        _manatal_unavailable()
    try:
        raw = await manatal.list_job_posts(search=search, page=page, size=size)
    except httpx.HTTPStatusError as e:
        logger.error(f"Manatal list jobs failed: {e.response.status_code} {e.response.text}")
        _manatal_unavailable()
    except httpx.RequestError as e:
        logger.error(f"Manatal list jobs unreachable: {e}")
        _manatal_unavailable()

    items = raw.get("items", raw if isinstance(raw, list) else [])
    jobs = [_normalize_job(j, lang) for j in items]
    return {
        "jobs": jobs,
        "total": raw.get("total", len(jobs)) if isinstance(raw, dict) else len(jobs),
        "page": page,
    }


@router.get("/{job_post_id}")
async def get_job(job_post_id: str, lang: str = "en"):
    """Single job post detail (normalized shape)."""
    try:
        raw = await manatal.get_job_post(job_post_id)
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Job not found.")
        logger.error(f"Manatal get job failed: {e.response.status_code} {e.response.text}")
        _manatal_unavailable()
        return
    except httpx.RequestError as e:
        logger.error(f"Manatal get job unreachable: {e}")
        _manatal_unavailable()
        return
    return _normalize_job(raw, lang)


@router.get("/{job_post_id}/application-form")
async def get_application_form(job_post_id: str, lang: str = "en"):
    """
    The dynamic set of fields to render for this job's application form.
    Each field comes back with a `kind` the frontend can switch on directly
    (text / textarea / email / tel / number / date / select / multiselect /
    checkbox / file) instead of needing to know Manatal's raw type strings.
    IMPORTANT: submit answers keyed by each field's `id` (not `kind` or
    `label`) — that's what Manatal's /apply endpoint expects.
    """
    try:
        raw = await manatal.get_application_form(job_post_id)
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail="Application form not found.")
        logger.error(f"Manatal get form failed: {e.response.status_code} {e.response.text}")
        _manatal_unavailable()
        return
    except httpx.RequestError as e:
        logger.error(f"Manatal get form unreachable: {e}")
        _manatal_unavailable()
        return

    raw_fields = raw.get("fields", raw if isinstance(raw, list) else [])
    fields = [_normalize_field(f, lang) for f in raw_fields]
    return {"fields": fields}


@router.post("/{job_post_id}/apply", status_code=201)
@limiter.limit("3/hour")
async def apply(
    request: Request,
    job_post_id: str,
    answers: str = Form(...),        # JSON object: { "<field-id>": value, ... }
    cv_field_id: str | None = Form(None),  # which field id the CV file belongs to, if any
    cv: UploadFile | None = File(None),
    utm_source: str | None = Form(None),
    utm_medium: str | None = Form(None),
    utm_campaign: str | None = Form(None),
):
    """
    Submit a job application directly to Manatal. `answers` must be a JSON
    string keyed by each field's id (as returned by the application-form
    endpoint) — the frontend fetches the form first, then submits against
    those exact field ids.
    """
    try:
        form_data = json.loads(answers)
        if not isinstance(form_data, dict):
            raise ValueError
    except (json.JSONDecodeError, ValueError):
        raise HTTPException(status_code=422, detail="`answers` must be a JSON object.")

    if cv is not None:
        if not cv_field_id:
            raise HTTPException(status_code=422, detail="cv_field_id is required when a CV file is attached.")
        if cv.content_type not in ("application/pdf", "application/octet-stream"):
            raise HTTPException(status_code=422, detail="CV must be a PDF file.")
        cv_bytes = await cv.read()
        if len(cv_bytes) > MAX_CV_SIZE:
            raise HTTPException(status_code=422, detail="CV must be under 5MB.")
        form_data[cv_field_id] = manatal.file_to_base64_field(cv_bytes, cv.filename or "cv.pdf")

    try:
        result = await manatal.submit_application(
            job_post_id, form_data,
            utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign,
        )
    except httpx.HTTPStatusError as e:
        logger.error(f"Manatal apply failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=422, detail="Your application could not be submitted. Please check the form and try again.")
    except httpx.RequestError as e:
        logger.error(f"Manatal apply unreachable: {e}")
        raise HTTPException(status_code=503, detail="Could not reach the application service. Please try again shortly.")

    logger.info(f"Application submitted to Manatal: {result.get('id')} for job {job_post_id}")

    return {
        "success": True,
        "message": "Application received. We'll be in touch soon.",
        "id": result.get("id"),
    }