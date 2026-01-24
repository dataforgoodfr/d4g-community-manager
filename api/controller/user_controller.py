from fastapi import APIRouter, Depends
from api.logic.user_logic import UserLogic
from clients.authentik_client import AuthentikClient
import api.deps as dependecies

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.get("/all")
def list_users(logic: UserLogic = Depends(dependecies.get_user_logic)):
    return logic.get_all_users()

@router.get("/projectsById/{id}")
def list_users(id : str, logic: UserLogic = Depends(dependecies.get_user_logic)):
    return logic.get_projects_for_user(id)

@router.get("/projects/{username}")
def list_users(username : str, logic: UserLogic = Depends(dependecies.get_user_logic)):
    return logic.get_projects_for_user(username)