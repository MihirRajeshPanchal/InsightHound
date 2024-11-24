from aihounds.services.outreach import LinkedinOutreach
from fastapi import APIRouter, HTTPException,Request
from pydantic import BaseModel
outreach_router = APIRouter()

class LinkedinRequest(BaseModel):
    user_id:str
    linkedin_urls:list[str]
    domain:str

linkedin_outreach=LinkedinOutreach()

@outreach_router.post("/linkedin")
async def send_linkedin_message(request:LinkedinRequest):
    response= linkedin_outreach.send_message_to_all('5On_vtxqSiGIsXRrOfmf1g',request.user_id,request.domain,request.linkedin_urls)
    return {"detail":response}

