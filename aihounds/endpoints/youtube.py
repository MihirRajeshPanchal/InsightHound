from fastapi import APIRouter
from aihounds.models.youtube import YoutubeQueryRequest, YoutubeQueryResponse
from aihounds.services.youtube import scrape_youtube
from aihounds.constants.hound import mongo_client

router = APIRouter()

@router.post("/youtube")
def generate_schema(request: YoutubeQueryRequest):
    result = mongo_client.read_by_key_value("youtube", "query", request.query)
    if result:
        return result
    else:
        result = scrape_youtube(request.query)
        mongo_client.create("youtube", YoutubeQueryResponse(**result))
        return result