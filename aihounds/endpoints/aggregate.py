from aihounds.models.aggregate import AgentRequest
from fastapi import APIRouter
from aihounds.services.aggregate import do_aggregate

router = APIRouter()

@router.post("/agent")
async def get_aggregator(request: AgentRequest):
    '''
    This endpoint is used to get the aggregated data from the AI Hounds
    '''
    
    response  = do_aggregate(request.conversation_id,request.query)
    return response