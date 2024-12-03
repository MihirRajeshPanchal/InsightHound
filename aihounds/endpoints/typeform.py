from fastapi import HTTPException
import httpx
from aihounds.constants.hound import TYPEFORM_API_TOKEN, TYPEFORM_API_URL
from aihounds.constants.hound import mongo_client
from aihounds.models.typeform import SurveyRequest, TypeformMongo, TypeformResponse
from aihounds.services.typeform import create_typeform_definition
from fastapi import APIRouter

router = APIRouter()

@router.post("/typeform", response_model=TypeformResponse)
async def create_typeform(survey_request: SurveyRequest):
    typeform_data = mongo_client.read_by_key_value("typeform", "id", survey_request.id)
    if typeform_data:
        return TypeformResponse(
            form_url=typeform_data[0]["form_url"],
            form_id=typeform_data[0]["form_id"]
        )
    else:
        if not TYPEFORM_API_TOKEN:
            raise HTTPException(
                status_code=500,
                detail="Typeform API token not configured"
            )

        try:

            typeform_data = await create_typeform_definition(survey_request)

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    TYPEFORM_API_URL,
                    json=typeform_data,
                    headers={
                        "Authorization": f"Bearer {TYPEFORM_API_TOKEN}",
                        "Content-Type": "application/json"
                    },
                    timeout=30.0
                )

                print(f"Typeform API Response: {response.status_code}")
                print(f"Response body: {response.text}")

                if response.status_code not in (200, 201):
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Typeform API error: {response.text}"
                    )

                typeform_response = response.json()
                
                mongo_client.create("typeform", TypeformMongo(id=survey_request.id, form_url=typeform_response["_links"]["display"], form_id=typeform_response["id"]))
                return TypeformResponse(
                    form_url=typeform_response["_links"]["display"],
                    form_id=typeform_response["id"]
                )

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error communicating with Typeform API: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Unexpected error: {str(e)}"
            )