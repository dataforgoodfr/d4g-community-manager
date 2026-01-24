from fastapi import APIRouter, Depends
from api.logic.project_logic import ProjectLogic
import api.deps as dependencies
from api.model.project_model import Project

router = APIRouter(prefix="/project", tags=["Project"])


@router.get("/")
def list_projects():
    return []


@router.post("/", status_code=201)
def create_project(project: Project, logic: ProjectLogic = Depends(dependencies.get_project_logic)):
    logic.create_project(project=project)
    return "Project created successfully"
