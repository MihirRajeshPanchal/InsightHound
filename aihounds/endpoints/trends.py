from aihounds.models.trends import InterestByRegionData, TrendsQueryRequest
from aihounds.services.trends import get_trends_search
from fastapi import APIRouter

router = APIRouter()

@router.post("/trends")
def generate_trends(request: TrendsQueryRequest):
    result = get_trends_search(request.query,request.geo)
    print(result, request.query)
    return result