from pydantic import BaseModel
from aihounds.constants.hound import mongo_client
from fastapi import APIRouter

router = APIRouter()

class MongoRequest(BaseModel):
    query: str

@router.post("/getObjects")
async def get_marketsegement(request: MongoRequest):
    segments_data = mongo_client.read_all(request.query)
    if segments_data and request.query == "company":
        filtered_data = [
            {
                "name": segment.get("name"),
                "description": segment.get("description"),
                "vision": segment.get("vision"),
                "mission": segment.get("mission"),
                "valuation": segment.get("valuation"),
                "domain": segment.get("domain")
            }
            for segment in segments_data
        ]
        return filtered_data
    else:
        return {"message": "No data found for the given query."}
