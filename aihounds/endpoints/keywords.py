from fastapi import APIRouter
from aihounds.models.keywords import StartupRequest, KeywordsResponse
from aihounds.services.keywords import generate_keywords
from aihounds.constants.keywords import mongo_client

router = APIRouter()

@router.post("/keywords", response_model=KeywordsResponse)
async def get_keywords(request: StartupRequest):
    company_data  = mongo_client.read("company", request.id)
    if company_data.get("keywords"):
        return KeywordsResponse(keywords=company_data["keywords"])
    
    keywords = generate_keywords(
        vision=company_data["vision"],
        mission=company_data["mission"],
        description=company_data["description"],
        domain=company_data["domain"],
    )
    mongo_client.update("company", request.id, {"keywords": keywords})
    return KeywordsResponse(keywords=keywords)