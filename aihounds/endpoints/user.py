from aihounds.services.user import UserService
from fastapi import APIRouter

user_service = UserService()
user_router = APIRouter()


@user_router.get("/rivals/{user_id}")
def get_rivals(user_id: str):
    return user_service.get_rivals(user_id)

