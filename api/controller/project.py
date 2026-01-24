from fastapi import APIRouter
from api.logic.project import Project

router = APIRouter(prefix="/project", tags=["Project"])


@router.get("/")
def list_projects():
    return []


@router.post("/", status_code=201)
def create_project(project: Project):
    return project
