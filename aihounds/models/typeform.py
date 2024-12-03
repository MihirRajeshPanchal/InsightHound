from typing import List, Optional
from pydantic import BaseModel


class QuestionOption(BaseModel):
    value: str

class Question(BaseModel):
    questionText: str
    questionOptions: List[str]

class SurveyRequest(BaseModel):
    id: str
    questions: List[Question]
    title: Optional[str] = "InsightHounds Survey"

class TypeformResponse(BaseModel):
    form_url: str
    form_id: str
    
class TypeformMongo(BaseModel):
    id: str
    form_url: str
    form_id: str