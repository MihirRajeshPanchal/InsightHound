from fastapi import APIRouter
from aihounds.models.keywords import StartupRequest, KeywordsResponse
from aihounds.services.keywords import generate_keywords

router = APIRouter()

@router.post("/keywords", response_model=KeywordsResponse)
async def get_keywords(request: StartupRequest):
    """
    Endpoint to generate keywords based on startup details.
    """
    keywords = generate_keywords(
        vision=request.vision,
        mission=request.mission,
        description=request.description,
        domain=request.domain,
    )
    return KeywordsResponse(keywords=keywords)