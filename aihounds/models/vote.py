from pydantic import BaseModel


class VoteRequest(BaseModel):
    userId: str
    companyId: str
    liked: bool
    
class CoinsRequest(BaseModel):
    userId: str
    
class CoinsMongo(BaseModel):
    userId: str
    coins: int