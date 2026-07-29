from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr
from database import get_db
from models.lead import Lead
from services.email import send_contact_notification, send_contact_confirmation
from slowapi import Limiter
from slowapi.util import get_remote_address
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contact", tags=["contact"])
limiter = Limiter(key_func=get_remote_address)


class ContactIn(BaseModel):
    name:    str
    email:   EmailStr
    company: str = ""
    service: str = ""
    message: str

    class Config:
        str_strip_whitespace = True


@router.post("", status_code=201)
@limiter.limit("5/hour")
async def submit_contact(
    request: Request,
    data: ContactIn,
    db: AsyncSession = Depends(get_db),
):
    # Validate
    if not data.name or not data.message:
        raise HTTPException(status_code=422, detail="Name and message are required.")

    # Save to PostgreSQL
    lead = Lead(
        name    = data.name,
        email   = str(data.email),
        company = data.company,
        service = data.service,
        message = data.message,
    )
    db.add(lead)
    await db.flush()  # get the ID before commit

    logger.info(f"New lead saved: {lead.id} — {data.name} <{data.email}>")

    # Send emails (fire and forget — don't block response)
    try:
        await send_contact_notification(
            name    = data.name,
            email   = str(data.email),
            company = data.company,
            service = data.service,
            message = data.message,
        )
        await send_contact_confirmation(
            name  = data.name,
            email = str(data.email),
        )
    except Exception as e:
        logger.error(f"Email sending failed: {e}")
        # Don't raise — lead is saved, email failure shouldn't fail the request

    return {
        "success": True,
        "message": "Thank you. We'll be in touch within one business day.",
        "id": str(lead.id),
    }