from aihounds.models.kanban import KanbanBoard, KanbanRequest
from aihounds.services.kanban import generate_kanban
from aihounds.constants.hound import mongo_client
from fastapi import APIRouter

router = APIRouter()

@router.post("/kanban", response_model=KanbanBoard)
async def get_kanban(request: KanbanRequest):
    company_data  = mongo_client.read("company", request.id)

    tasks = generate_kanban(
        vision=company_data["vision"],
        mission=company_data["mission"],
        description=company_data["description"],
        domain=company_data["domain"],
    )
    return KanbanBoard(tasks=tasks)