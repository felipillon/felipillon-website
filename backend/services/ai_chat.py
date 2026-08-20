import json
import logging
import os
from pathlib import Path

import httpx

logger = logging.getLogger(__name__)

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-5.6-luna")
OPENAI_URL = "https://api.openai.com/v1/responses"

KNOWLEDGE_PATH = Path(__file__).resolve().parent.parent / "knowledge" / "felipillon.md"

DETAILED_TERMS = (
    "price", "pricing", "cost", "quote", "proposal", "contract",
    "partnership", "visa", "relocation", "salary", "guarantee",
    "timeline", "custom", "specific", "integration", "api",
    "legal", "compliance", "data", "security", "enterprise",
)


def is_configured() -> bool:
    return bool(OPENAI_API_KEY)


def _load_knowledge() -> str:
    return KNOWLEDGE_PATH.read_text(encoding="utf-8")


def _needs_support(message: str) -> bool:
    text = message.lower()
    return len(message) > 160 or any(term in text for term in DETAILED_TERMS)


def _fallback_reply(message: str) -> dict:
    text = message.lower()
    support = _needs_support(message)

    if support:
        content = (
            "That needs a support conversation so the team can give you an accurate answer. "
            "You can use the contact page, email hello@felipillon.com, or connect with Felipillon on LinkedIn."
        )
    elif any(term in text for term in ("job", "role", "career", "apply")):
        content = "You can view current opportunities on the Open Roles page. For role-specific questions, contact support."
    elif any(term in text for term in ("location", "office", "where")):
        content = "Felipillon is headquartered in Berlin, with hubs in Pune, India and Makati City, Philippines."
    elif any(term in text for term in ("service", "offer", "do", "company", "about")):
        content = (
            "Felipillon provides staffing and recruitment, software development, digital marketing, "
            "AI applications, CRM platforms, and technology solutions."
        )
    else:
        content = (
            "I can help with quick questions about Felipillon's services, locations, hiring, jobs, "
            "and contact details. For anything specific, support can help directly."
        )
        support = True

    return {"reply": content, "support": support, "jobs": "job" in text or "role" in text or "career" in text}


def _system_prompt() -> str:
    return f"""
You are Felipillon's website support assistant.

Use only the company knowledge below. Keep answers short, helpful, and professional.
If the visitor asks a detailed, custom, legal, pricing, proposal, hiring-contract,
visa, relocation, security, or job-specific question, do not guess. Tell them support
can help and direct them to /contact, hello@felipillon.com, or LinkedIn.

Return only JSON with this shape:
{{"reply":"...", "support": false, "jobs": false}}

Set support true when the user should contact support.
Set jobs true when the user should visit open roles.

Company knowledge:
{_load_knowledge()}
""".strip()


def _history_input(history: list[dict], message: str) -> str:
    recent = history[-8:] if history else []
    lines = []
    for item in recent:
      role = item.get("role", "user")
      content = str(item.get("content", ""))[:600]
      if role in ("user", "assistant") and content:
          lines.append(f"{role}: {content}")
    lines.append(f"user: {message}")
    return "\n".join(lines)


def _extract_output_text(data: dict) -> str:
    if data.get("output_text"):
        return data["output_text"]

    parts = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            if content.get("type") == "output_text" and content.get("text"):
                parts.append(content["text"])
    return "\n".join(parts)


async def generate_chat_reply(message: str, history: list[dict] | None = None) -> dict:
    if not is_configured():
        return _fallback_reply(message)

    payload = {
        "model": OPENAI_MODEL,
        "instructions": _system_prompt(),
        "input": _history_input(history or [], message),
        "max_output_tokens": 220,
        "text": {
            "format": {
                "type": "json_schema",
                "name": "felipillon_support_reply",
                "strict": True,
                "schema": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "reply": {"type": "string"},
                        "support": {"type": "boolean"},
                        "jobs": {"type": "boolean"},
                    },
                    "required": ["reply", "support", "jobs"],
                },
            }
        },
    }

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(20.0, connect=8.0)) as client:
            resp = await client.post(OPENAI_URL, headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPStatusError as e:
        logger.error("OpenAI chat failed: %s %s", e.response.status_code, e.response.text)
        return _fallback_reply(message)
    except httpx.RequestError as e:
        logger.error("OpenAI chat unreachable: %s", e)
        return _fallback_reply(message)

    try:
        parsed = json.loads(_extract_output_text(data) or "{}")
    except json.JSONDecodeError:
        logger.error("OpenAI chat returned non-JSON output: %s", _extract_output_text(data))
        return _fallback_reply(message)

    reply = str(parsed.get("reply", "")).strip()
    if not reply:
        return _fallback_reply(message)

    return {
        "reply": reply,
        "support": bool(parsed.get("support", False)),
        "jobs": bool(parsed.get("jobs", False)),
    }