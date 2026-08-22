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

FALLBACK_COPY = {
    "en": {
        "support": (
            "That needs a support conversation so the team can give you an accurate answer. "
            "You can use the contact page, email hello@felipillon.com, or connect with Felipillon on LinkedIn."
        ),
        "jobs": "You can view current opportunities on the Open Roles page. For role-specific questions, contact support.",
        "locations": "Felipillon is headquartered in Berlin, with hubs in Pune, India, Makati City, Philippines, and a new Italy office for European operations.",
        "services": (
            "Felipillon provides staffing and recruitment, software development, digital marketing, "
            "AI applications, CRM platforms, and technology solutions."
        ),
        "fallback": (
            "I can help with quick questions about Felipillon's services, locations, hiring, jobs, "
            "and contact details. For anything specific, support can help directly."
        ),
    },
    "de": {
        "support": (
            "Dafür sollte das Support-Team direkt antworten, damit Sie eine genaue Auskunft bekommen. "
            "Sie können die Kontaktseite nutzen, hello@felipillon.com schreiben oder Felipillon auf LinkedIn kontaktieren."
        ),
        "jobs": "Aktuelle Stellen finden Sie auf der Open-Roles-Seite. Für rollenspezifische Fragen hilft der Support.",
        "locations": "Felipillon hat den Hauptsitz in Berlin sowie Hubs in Pune, Indien, Makati City auf den Philippinen und einen neuen Standort in Italien.",
        "services": "Felipillon bietet Staffing und Recruiting, Softwareentwicklung, digitales Marketing, KI-Anwendungen, CRM-Plattformen und Technologielösungen.",
        "fallback": "Ich kann kurze Fragen zu Services, Standorten, Recruiting, Jobs und Kontaktdaten beantworten. Für spezifische Anliegen hilft der Support direkt.",
    },
    "tr": {
        "support": (
            "Bu konu için ekibin doğru yanıt verebilmesi adına destek görüşmesi gerekir. "
            "İletişim sayfasını kullanabilir, hello@felipillon.com adresine yazabilir veya LinkedIn'den ulaşabilirsiniz."
        ),
        "jobs": "Güncel fırsatları Open Roles sayfasında görebilirsiniz. Role özel sorular için destek ekibi yardımcı olur.",
        "locations": "Felipillon'un merkezi Berlin'dedir; Pune Hindistan, Makati City Filipinler ve Avrupa operasyonları için yeni İtalya ofisi bulunur.",
        "services": "Felipillon staffing ve işe alım, yazılım geliştirme, dijital pazarlama, yapay zeka uygulamaları, CRM platformları ve teknoloji çözümleri sunar.",
        "fallback": "Hizmetler, lokasyonlar, işe alım, işler ve iletişim bilgileri hakkında kısa soruları yanıtlayabilirim. Spesifik konularda destek ekibi yardımcı olur.",
    },
}


def is_configured() -> bool:
    return bool(OPENAI_API_KEY)


def _load_knowledge() -> str:
    return KNOWLEDGE_PATH.read_text(encoding="utf-8")


def _needs_support(message: str) -> bool:
    text = message.lower()
    return len(message) > 160 or any(term in text for term in DETAILED_TERMS)


def _language(message: str) -> str:
    text = message.lower()
    if any(char in text for char in "çğıöşü") or any(term in text for term in ("merhaba", "hizmet", "konum", "ofis", "başvuru", "destek")):
        return "tr"
    if any(char in text for char in "äöüß") or any(term in text for term in ("hallo", "standort", "büro", "stellen", "bewerben", "kontakt")):
        return "de"
    return "en"


def _fallback_reply(message: str) -> dict:
    text = message.lower()
    support = _needs_support(message)
    lang = _language(message)
    copy = FALLBACK_COPY.get(lang, FALLBACK_COPY["en"])

    if support:
        content = copy["support"]
    elif any(term in text for term in ("job", "role", "career", "apply", "stelle", "stellen", "bewerben", "karriere", "iş", "ilan", "başvuru", "basvuru", "kariyer")):
        content = copy["jobs"]
    elif any(term in text for term in ("location", "office", "where", "standort", "büro", "buero", "konum", "ofis", "nerede")):
        content = copy["locations"]
    elif any(term in text for term in ("service", "offer", "do", "company", "about", "hizmet", "angebot", "unternehmen", "firma")):
        content = copy["services"]
    else:
        content = copy["fallback"]
        support = True

    jobs = any(term in text for term in ("job", "role", "career", "stelle", "stellen", "iş", "ilan", "kariyer"))
    return {"reply": content, "support": support, "jobs": jobs}


def _system_prompt() -> str:
    return f"""
You are Felipillon's website support assistant.

Use only the company knowledge below. Keep answers short, helpful, and professional.
Reply in the same language as the visitor when they write in English, German, or Turkish.
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