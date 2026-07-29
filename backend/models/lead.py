from sqlalchemy import Column, String, Text, DateTime, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from database import Base
from datetime import datetime, timezone
import uuid
import enum

class LeadStatus(str, enum.Enum):
    new        = "new"
    contacted  = "contacted"
    proposal   = "proposal_sent"
    won        = "won"
    lost       = "lost"

class Lead(Base):
    __tablename__ = "leads"

    id         = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name       = Column(String(200), nullable=False)
    email      = Column(String(200), nullable=False)
    company    = Column(String(200), nullable=True)
    service    = Column(String(100), nullable=True)
    message    = Column(Text, nullable=False)
    status     = Column(SAEnum(LeadStatus), default=LeadStatus.new, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))