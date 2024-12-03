from aihounds.models.vote import VoteRequest
from aihounds.constants.hound import mongo_client
from fastapi import APIRouter

router = APIRouter()

@router.post("/vote")
def generate_trends(request: VoteRequest):
    vote_data = mongo_client.read_multiple_by_key_value("vote", "userId", request.userId, "companyId", request.companyId)
    if vote_data:
        mongo_client.update(
            "vote",
            document_id=vote_data[0]["_id"],
            update_data={"userId": request.userId, "companyId": request.companyId, "liked": request.liked}
        )
        return {"message": "Vote updated"}
    vote_id = mongo_client.create("vote", request)
    return {"message": "Vote added"}