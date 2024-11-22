from pydantic import BaseModel

class StartupRequest(BaseModel):
    id: str

class KeywordsResponse(BaseModel):
    keywords: list[str]