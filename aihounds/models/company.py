from pydantic import BaseModel
from typing import Optional, Type, TypeVar, Any, Dict

class Company(BaseModel):
    name: str
    description: str
    vision: Optional[str] = None
    mission: Optional[str] = None
    valuation: Optional[str] = None
    domain: Optional[str] = None
    props: Optional[str] = None
    createdAt: Optional[Any] = None