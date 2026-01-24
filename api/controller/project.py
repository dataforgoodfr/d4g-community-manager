from fastapi import APIRouter, Depends
from api.logic.user_logic import UserLogic
from clients.authentik_client import AuthentikClient
import api.deps as dependecies

router = APIRouter(
    prefix="/user/projects",
    tags=["User"]
)

@router.get("/")
def list_users(logic: UserLogic = Depends(dependecies.get_user_logic)):
    return logic.get_projects_for_user("dpjnsxww4incxex1rbsrbykrnr")