from pydantic import BaseModel

class SummaryGenerationRequest(BaseModel):
    conversation_id: str
    
class SummaryGenerationResponse(BaseModel):
    summary: str