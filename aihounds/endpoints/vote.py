from aihounds.models.vote import CoinsMongo, CoinsRequest, VoteRequest
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
    else:
        coins_data = mongo_client.read_by_key_value("coins", "userId", request.userId)
        if coins_data:
            mongo_client.update(
                "coins",
                document_id=coins_data[0]["_id"],
                update_data={"userId": request.userId, "coins": coins_data[0]["coins"] + 1}
            )
        else:
            mongo_client.create("coins", CoinsMongo(userId=request.userId, coins=1))
        mongo_client.create("vote", request)
        return {"message": "Vote added"}
    
@router.get("/coins")
def get_votes(request: CoinsRequest):
    coins = mongo_client.read_by_key_value("coins", "userId", request.userId)
    if coins:
        return {"coins": coins[0]["coins"]}
    else:
        return {"coins": 0}