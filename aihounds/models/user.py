from pydantic import BaseModel
from typing import Optional, Type, TypeVar, Any, Dict

class User(BaseModel):
    email: str
    password: str
    props: Optional[str] = None
    companyId: Optional[str] = None
    createdAt: Optional[Any] = None