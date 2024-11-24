from aihounds.services.agent import LangGraphAgent
from fastapi import APIRouter,Request
from fastapi.responses import StreamingResponse
from langchain_core.messages import AIMessage, ToolMessage
api_router = APIRouter()

agent=LangGraphAgent()

@api_router.post("/chat")
async def process_message(request: Request):
    body = await request.json()
    message = body.get("message")
    user_id = body.get("user_id")
    return agent.process_message(message, user_id)
    # def event_generator():
    #     events = agent.process_message(message, user_id)
    #     for event in events:
    #         for msg in event["messages"]:
    #             if isinstance(msg, (AIMessage, ToolMessage)):
    #                 print(f"Sending message: {msg.content}")
    #                 yield f"data: {msg.content}\n\n"

    # return StreamingResponse(event_generator(), media_type="text/event-stream")