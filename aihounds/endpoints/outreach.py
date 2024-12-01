from typing import Optional
from aihounds.services.outreach import LinkedinOutreach
from fastapi import APIRouter, HTTPException,Request
from pydantic import BaseModel
outreach_router = APIRouter()

class LinkedinRequest(BaseModel):
    user_id:str
    linkedin_urls:list[str]
    message: Optional[str] = None
    domain:str

linkedin_outreach=LinkedinOutreach()

@outreach_router.post("/generate_linkedin")
async def generate_message(request:LinkedinRequest):
    response= linkedin_outreach.generate_message(request.user_id,request.domain)
    return {"detail":response}

@outreach_router.post("/send_linkedin")
async def send_linkedin_message(request:LinkedinRequest):
    response= linkedin_outreach.send_message_to_all('5On_vtxqSiGIsXRrOfmf1g',request.message,request.linkedin_urls)
    return {"detail":response}

