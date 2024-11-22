from aihounds.models.company import Company
from aihounds.services.onboard import generate_onboard_schema
from fastapi import APIRouter, File, UploadFile
from typing import Dict

router = APIRouter()

@router.post("/onboard", response_model=Company)
async def generate_schema(document: UploadFile = File(...)) -> Dict:
    result = await generate_onboard_schema(document)
    return result