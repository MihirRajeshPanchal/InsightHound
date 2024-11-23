from pydantic import BaseModel

class YoutubeQueryRequest(BaseModel):
    query: str

class YoutubeQueryResponse(BaseModel):
    query: str
    urls: list[str]