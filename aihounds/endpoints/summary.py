from aihounds.constants.hound import mongo_client
from fastapi import APIRouter
from aihounds.models.summary import SummaryGenerationRequest, SummaryGenerationResponse
from aihounds.services.summary import generate_summary

router = APIRouter()

@router.post("/generate_summary", response_model=SummaryGenerationResponse)
async def get_summary(request: SummaryGenerationRequest):
    
    previous_conversations = list(mongo_client.read_by_id(
        "messages", 
        "conversation_id",
        request.conversation_id
    ))
    
    print(previous_conversations)
    context_parts = []
    for conv in previous_conversations:
        if conv.get('role') == 'user':
            context_parts.append(f"User: {conv.get('query', '')}")
        elif conv.get('role') == 'ai':
            context_parts.append(f"AI: {conv.get('data', '')}")
    

    context = "Previous Conversation Context:\n" + "\n".join(context_parts)
    
    print(context)
    summary = generate_summary(context)
    
    mongo_client.update("conversations", request.conversation_id, {"summary": summary})
    return SummaryGenerationResponse(summary=summary)
    