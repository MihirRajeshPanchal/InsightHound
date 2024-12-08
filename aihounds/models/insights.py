from pydantic import BaseModel


class Insight(BaseModel):
    insight: str

