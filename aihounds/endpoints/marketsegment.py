from aihounds.models.keywords import StartupRequest
from aihounds.models.marketsegment import MarketSegmentMongoSchema, MarketSegmentSchema, Segment
from aihounds.constants.hound import mongo_client
from aihounds.services.marketsegment import generate_segmentation
from fastapi import APIRouter

router = APIRouter()

@router.post("/marketsegment", response_model=MarketSegmentSchema)
async def get_marketsegement(request: StartupRequest):
    segments_data  = mongo_client.read_by_key_value("segment", key= "id", value=request.id)
    if segments_data:
        return MarketSegmentSchema(segments=segments_data[0]["segments"])
    else:
        segments_data = mongo_client.read("company", request.id)
        segments = generate_segmentation(
            vision=segments_data["vision"],
            mission=segments_data["mission"],
            description=segments_data["description"],
            domain=segments_data["domain"],
        )
        mongo_client.create("segment", MarketSegmentMongoSchema(id=request.id, segments=segments))
        return MarketSegmentSchema(segments=segments)