from pydantic import BaseModel

class Suggestions(BaseModel):
    suggestions: list[str]
    