from fastapi import FastAPI
from api.controller import project, user_controller

api = FastAPI()

api.include_router(user_controller.router, prefix="/v1")

@api.get("/")
def home():
    return {"message": "Bienvenue sur l'API D4G Community Manager"}