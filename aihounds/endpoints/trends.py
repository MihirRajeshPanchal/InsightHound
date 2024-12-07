from aihounds.models.trends import InterestByRegionData, TrendsQueryRequest
from aihounds.services.trends import generate_heatmap
from fastapi import APIRouter

router = APIRouter()

@router.post("/trends")
def generate_trends(request: TrendsQueryRequest):
    result = generate_heatmap(request.query,request.geo)
    print(result, request.query)
    return result