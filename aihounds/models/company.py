from pydantic import BaseModel, Field
from typing import Optional, TYPE_CHECKING,Any
from bson import ObjectId
from datetime import datetime



class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)

class Company(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: str
    vision: str
    mission: str
    props: str
    user: Optional[Any] = None
    createdAt: datetime = Field(default_factory=datetime.now)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

Company.update_forward_refs()