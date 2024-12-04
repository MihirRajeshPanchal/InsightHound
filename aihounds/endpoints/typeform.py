from typing import List
from fastapi import HTTPException
import httpx
from aihounds.constants.hound import TYPEFORM_API_TOKEN, TYPEFORM_API_URL
from aihounds.constants.hound import mongo_client
from aihounds.models.typeform import ResponseFrequency, ResponseTypeformFrequency, SurveyRequest, TypeformMongo, TypeformResponse
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
            
@router.get("/typeform_responses", response_model=List[ResponseFrequency])
async def get_typeform_responses(response_request: ResponseTypeformFrequency):
    if not TYPEFORM_API_TOKEN:
        raise HTTPException(
            status_code=500,
            detail="Typeform API token not configured"
        )

    typeform_data = mongo_client.read_by_key_value("typeform", "id", response_request.id)
    form_id = typeform_data[0]["form_id"]
    
    questionnaire_data = mongo_client.read_by_key_value("questionnaire", "id", response_request.id)
    questionnaire_data = questionnaire_data[0]["questions"]

    question_mapping = {str(idx): question for idx, question in enumerate(questionnaire_data)}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{TYPEFORM_API_URL}/{form_id}/responses?page_size=50&since=2024-01-01T00:00:00Z&workspace_id=QDcqdz",
                headers={
                    "Authorization": f"Bearer {TYPEFORM_API_TOKEN}",
                    "Content-Type": "application/json"
                },
                timeout=30.0
            )

            if response.status_code not in (200, 201):
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Typeform API error: {response.text}"
                )

            typeform_responses = response.json()

            question_refs = {}
            if typeform_responses.get('items'):
                first_response = typeform_responses['items'][0]
                for answer in first_response.get('answers', []):
                    question_ref = answer['field'].get('ref')
                    question_id = answer['field'].get('id')
                    question_text = question_ref or question_id
                    question_refs[question_ref] = question_text

            response_frequencies = []
            option_frequencies = {str(idx): {} for idx in range(len(questionnaire_data))}

            for item in typeform_responses.get('items', []):
                for answer in item.get('answers', []):
                    question_ref = str(list(question_refs.keys()).index(answer['field'].get('ref')))
                    option_label = answer.get('choice', {}).get('label', 'Unknown')
                    
                    if question_ref in option_frequencies:
                        option_frequencies[question_ref][option_label] = \
                            option_frequencies[question_ref].get(option_label, 0) + 1

            for ref, frequencies in option_frequencies.items():
                question_details = question_mapping.get(ref, {})

                full_frequencies = {
                    option: frequencies.get(option, 0) 
                    for option in question_details.get('questionOptions', [])
                }

                response_frequencies.append(
                    ResponseFrequency(
                        question_text=question_details.get('questionText', f'Question {ref}'),
                        options=full_frequencies
                    )
                )
            
            return response_frequencies

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