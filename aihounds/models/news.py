from pydantic import BaseModel


class NewsRequest(BaseModel):
    id: str