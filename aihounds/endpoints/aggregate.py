from aihounds.models.aggregate import AgentRequest, ConversationResponse, CreateConversationRequest
from fastapi import APIRouter, HTTPException
from aihounds.services.aggregate import do_aggregate
from aihounds.constants.hound import mongo_client

router = APIRouter()

@router.post("/agent")
async def get_aggregator(request: AgentRequest):
    '''
    This endpoint is used to get the aggregated data from the AI Hounds
    '''
    conversations = mongo_client.read_by_id("conversations", "_id", request.conversation_id)
    print(conversations)
    companies = mongo_client.read_by_id("company", "_id", conversations[0]["company_id"])
    context =  "My company details are " + str(companies[0]["name"]) + " " + str(companies[0]["description"]) + " " + str(companies[0]["vision"]) + " " + str(companies[0]["mission"]) + str(companies[0]["valuation"]) + str(companies[0]["domain"])
    response  = do_aggregate(request.conversation_id,request.query, context)
    return response

@router.post('/create_conversation')
async def create_conversation(request: CreateConversationRequest):
    try:
        collection_name = "conversations"
        inserted_id = mongo_client.create(collection_name, request)
        return ConversationResponse(conversation_id=inserted_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating conversation: {str(e)}")
    
@router.get('/conversations')
async def get_conversations(request: CreateConversationRequest):
    try:
        conversations = mongo_client.read_multiple_by_key_value("conversations", "user_id", request.user_id, "company_id", request.company_id)
        for i in conversations:
            messages = mongo_client.read_by_key_value("messages", "conversation_id", i["_id"])
            i["messages"] = messages
        return conversations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching conversations: {str(e)}")