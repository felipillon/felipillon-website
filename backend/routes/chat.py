from fastapi import APIRouter, Request
from pydantic import BaseModel, Field
from slowapi import Limiter
from slowapi.util import get_remote_address

from services.ai_chat import generate_chat_reply

router = APIRouter(prefix="/api/chat", tags=["chat"])
limiter = Limiter(key_func=get_remote_address)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatIn(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    history: list[ChatMessage] = Field(default_factory=list, max_length=12)


@router.post("")
@limiter.limit("20/hour")
async def chat(request: Request, data: ChatIn):
    result = await generate_chat_reply(
        message=data.message,
        history=[item.model_dump() for item in data.history],
    )
    return {
        "reply": result["reply"],
        "support": result.get("support", False),
        "jobs": result.get("jobs", False),
    }