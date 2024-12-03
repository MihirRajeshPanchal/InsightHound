from pydantic import BaseModel


class VoteRequest(BaseModel):
    userId: str
    companyId: str
    liked: bool