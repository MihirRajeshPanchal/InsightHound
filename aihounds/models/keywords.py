from pydantic import BaseModel

class StartupRequest(BaseModel):
    vision: str
    mission: str
    description: str
    domain: str

class KeywordsResponse(BaseModel):
    keywords: list[str]