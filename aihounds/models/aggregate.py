from pydantic import BaseModel
from datetime import datetime
from pydantic import BaseModel
from enum import Enum
from typing import Any, List, Optional, Union

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
    conversation_id: str
    createdAt: datetime = datetime.now()
    role: RoleEnum
    action: str
    query: Optional[Union[str, None]] = None
    data: Optional[Any] = None
    tool_call_id: Optional[Union[str, None]] = None
    insight: Optional[str] = None
    suggestions: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        
class CreateConversationRequest(BaseModel):
    user_id: str
    company_id: str
    query: str
    
class ConversationResponse(BaseModel):
    conversation_id: str
    title: str

class ConversationMongoStore(BaseModel):
    user_id: str
    company_id: str
    title: str
    summary: Optional[str] = None 
    messages: Optional[List[dict]] = None 
    
class GenerateQueryResponse(BaseModel):
    query: str

class GenerateTitleResponse(BaseModel):
    title: str