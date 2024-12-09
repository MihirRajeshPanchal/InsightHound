from typing import Optional
from aihounds.services.outreach import LinkedinOutreach, get_rivals_test
from fastapi import APIRouter, Request
from pydantic import BaseModel

outreach_router = APIRouter()


class LinkedinRequest(BaseModel):
    user_id: str
    linkedin_urls: list[str]
    message: Optional[str] = None
    domain: str


linkedin_outreach = LinkedinOutreach()


@outreach_router.post("/generate_linkedin")
async def generate_message(request: LinkedinRequest):
    response = linkedin_outreach.generate_message(request.user_id, request.domain)
    return {"detail": response}


@outreach_router.post("/send_linkedin")
async def send_linkedin_message(request: LinkedinRequest):
    response = linkedin_outreach.send_message_to_all(
        "Axq_BT2xSrilkSRtXGW8AQ", request.message, request.linkedin_urls
    )
    return {"detail": response}


@outreach_router.post("/get_rivals")
async def get_company_profile(data: Request):
    data = await data.json()
    response = get_rivals_test(
        data["locations"], data["num_employees_ranges"], data.get("keyword_tags", None)
    )
    return {"detail": response}
