from typing import Optional
from aihounds.models.aggregate import AgentRequest, ConversationResponse, CreateConversationRequest
from fastapi import APIRouter, HTTPException, Query
from aihounds.services.aggregate import do_aggregate, generate_conversation_title_from_query
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
        title = generate_conversation_title_from_query(request.query)
        return ConversationResponse(conversation_id=inserted_id, title=title['title'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating conversation: {str(e)}")
    
@router.get('/conversations')
async def get_conversations(conversation_id: Optional[str] = Query(None, description="The ID of the conversation to fetch")):
    try:
        if not conversation_id:
            raise HTTPException(status_code=400, detail="conversation_id query parameter is required")

        conversations = mongo_client.read_by_id("conversations", "_id", conversation_id)
        for i in conversations:
            messages = mongo_client.read_by_key_value("messages", "conversation_id", i["_id"])
            i["messages"] = messages
        return conversations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching conversations: {str(e)}")