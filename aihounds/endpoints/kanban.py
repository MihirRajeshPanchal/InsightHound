from aihounds.models.kanban import KanbanBoard, KanbanBoardMongo, KanbanRequest
from aihounds.services.kanban import generate_kanban
from aihounds.constants.hound import mongo_client
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/kanban", response_model=KanbanBoard)
async def get_kanban(request: KanbanRequest):
    kanban_data  = mongo_client.read_by_key_value("kanban", key= "id", value=request.id)
    if kanban_data:
        return KanbanBoard(tasks=kanban_data[0]["tasks"])
    else:
        company_data  = mongo_client.read("company", request.id)
        tasks = generate_kanban(
            vision=company_data["vision"],
            mission=company_data["mission"],
            description=company_data["description"],
            domain=company_data["domain"],
        )
        mongo_client.create("kanban", KanbanBoardMongo(id=request.id, tasks=tasks))
        return KanbanBoard(tasks=tasks)

@router.put("/kanban_put", response_model=KanbanBoard)
async def update_kanban(request: KanbanBoardMongo):
    kanban_data = mongo_client.read_by_key_value("kanban", key="id", value=request.id)
    if not kanban_data:
        raise HTTPException(status_code=404, detail="Kanban board not found")
    
    update_success = mongo_client.update(
        "kanban",
        document_id=kanban_data[0]["_id"],
        update_data={"tasks": [task.dict() for task in request.tasks]}
    )
    
    if not update_success:
        raise HTTPException(status_code=500, detail="Failed to update Kanban board")
    
    return KanbanBoard(tasks=request.tasks)