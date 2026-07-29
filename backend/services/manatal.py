"""
Manatal Career Page API integration.

This is Manatal's dedicated *public* Career Page API (separate from their
main authenticated Open API) — it's designed to be called from a public
website, so it does not require an API token. It only needs your account's
career page "client slug", which identifies which company's job posts to
read from / submit applications to.

Docs: https://developers.manatal.com/reference/getting-started
Base: https://api.careers-page.com
"""
import base64
import logging
import os

import httpx

logger = logging.getLogger(__name__)

MANATAL_BASE = "https://api.careers-page.com"
CLIENT_SLUG = os.environ.get("MANATAL_CLIENT_SLUG", "")

_TIMEOUT = httpx.Timeout(15.0, connect=10.0)


def is_configured() -> bool:
    return bool(CLIENT_SLUG)


def _require_configured():
    if not is_configured():
        raise RuntimeError(
            "MANATAL_CLIENT_SLUG is not set. Add it to backend/.env — "
            "find it under Manatal → Career Page → General settings."
        )


async def list_job_posts(search: str | None = None, page: int = 1, size: int = 20) -> dict:
    """Paginated list of published job posts on the career page."""
    _require_configured()
    params = {"page": page, "size": size}
    if search:
        params["search"] = search

    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        resp = await client.get(
            f"{MANATAL_BASE}/open/v1/career-pages/{CLIENT_SLUG}/job-posts",
            params=params,
        )
        resp.raise_for_status()
        return resp.json()


async def get_job_post(job_post_id: str) -> dict:
    """Single job post detail."""
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        resp = await client.get(f"{MANATAL_BASE}/open/v1/job-posts/{job_post_id}")
        resp.raise_for_status()
        return resp.json()


async def get_application_form(job_post_id: str) -> dict:
    """
    The dynamic application form for a specific job post — each job can have
    a different set of fields (Manatal's own "Manatal" fields like full name/
    email/phone/resume, plus any "custom" fields the client has added). Each
    field has an `id` (UUID, unique per form) that submissions must be keyed
    by, and a `mapping_id` that stays consistent for standard fields across
    different forms (e.g. always identifies "email" as email, regardless of
    the random UUID) — useful for auto-mapping our own form to theirs.
    """
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        resp = await client.get(f"{MANATAL_BASE}/open/v1/job-posts/{job_post_id}/application-form")
        resp.raise_for_status()
        return resp.json()


async def submit_application(
    job_post_id: str,
    form_data: dict,
    utm_source: str | None = None,
    utm_medium: str | None = None,
    utm_campaign: str | None = None,
) -> dict:
    """
    Submit a completed application. `form_data` must be keyed by each field's
    `id` (from get_application_form), not by field name. File fields (e.g.
    resume) use file_to_base64_field() as their value.
    """
    params = {}
    if utm_source:
        params["utm_source"] = utm_source
    if utm_medium:
        params["utm_medium"] = utm_medium
    if utm_campaign:
        params["utm_campaign"] = utm_campaign

    async with httpx.AsyncClient(timeout=httpx.Timeout(30.0, connect=10.0)) as client:
        resp = await client.post(
            f"{MANATAL_BASE}/open/v1/job-posts/{job_post_id}/apply",
            params=params,
            json=form_data,
        )
        resp.raise_for_status()
        return resp.json()


def file_to_base64_field(file_bytes: bytes, filename: str) -> dict:
    """Shape a file into the {base64_content, filename} structure Manatal expects."""
    return {
        "base64_content": base64.b64encode(file_bytes).decode("utf-8"),
        "filename": filename,
    }