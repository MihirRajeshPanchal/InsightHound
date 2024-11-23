from pydantic import BaseModel, Field
from typing import List

class Question(BaseModel):
    questionText: str
    questionOptions: List[str]

class QuestionnaireSchema(BaseModel):
    questions: List[Question]
    
class QuestionnaireMongoSchema(BaseModel):
    id: str
    questions: List[Question]