from aihounds.models.keywords import StartupRequest
from aihounds.models.marketresearch import QuestionnaireMongoSchema, QuestionnaireSchema
from aihounds.services.marketresearch import generate_questionnaire
from aihounds.constants.hound import mongo_client
from fastapi import APIRouter

router = APIRouter()

@router.post("/marketresearch", response_model=QuestionnaireSchema)
async def get_marketresearch(request: StartupRequest):
    questions_data  = mongo_client.read_by_key_value("questionnaire", key= "id", value=request.id)
    if questions_data:
        return QuestionnaireSchema(questions=questions_data[0]["questions"])
    else:
        questions_data = mongo_client.read("company", request.id)
        questions = generate_questionnaire(
            vision=questions_data["vision"],
            mission=questions_data["mission"],
            description=questions_data["description"],
            domain=questions_data["domain"],
        )
        mongo_client.create("questionnaire", QuestionnaireMongoSchema(id=request.id, questions=questions))
        return QuestionnaireSchema(questions=questions)