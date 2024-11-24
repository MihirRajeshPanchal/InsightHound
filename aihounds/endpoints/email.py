from aihounds.models.email import Email, EmailRequest
from aihounds.services.email import generate_email
from aihounds.constants.hound import mongo_client
from fastapi import APIRouter

router = APIRouter()

@router.post("/email", response_model=Email)
async def get_email(request: EmailRequest):
    company_data  = mongo_client.read("company", request.id)

    subject, email = generate_email(
        vision=company_data["vision"],
        mission=company_data["mission"],
        description=company_data["description"],
        domain=company_data["domain"],
        array=request.array,
    )
    return Email(subject=subject, email_template=email)