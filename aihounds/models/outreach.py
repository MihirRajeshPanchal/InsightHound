from pydantic import BaseModel

class LinkedInLLMResponse(BaseModel):
    message: str
    
class LinkedInResponse(BaseModel):
    user_id: str
    linkedin_urls: list[str]
    message: str
    domain: str