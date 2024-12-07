from pydantic import BaseModel
from typing import Dict, List

class Question(BaseModel):
    questionText: str
    questionOptions: List[str]

class QuestionnaireSchema(BaseModel):
    questions: List[Dict[str, List[str]]]
    
class QuestionnaireMongoSchema(BaseModel):
    id: str
    questions: List[Question]