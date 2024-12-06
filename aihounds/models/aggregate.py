from pydantic import BaseModel
from pymongo import MongoClient
from datetime import datetime
from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional, Union

class AgentRequest(BaseModel):
    """Agent Request schema"""
    conversation_id: str
    query: str
    
class RoleEnum(str, Enum):
    USER = 'user'
    AI = 'ai'

class ActionEnum(str, Enum):
    QUERY = 'query'
    RESPONSE = 'response'


class AIResponse(BaseModel):
    response: str


class Message(BaseModel):
    id: str
    createdAt: datetime = datetime.now()
    role: RoleEnum
    action: str
    query: Optional[Union[str, None]] = None
    data: Optional[Union[str, None]] = None
    tool_call_id: Optional[Union[str, None]] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }