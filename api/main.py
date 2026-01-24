from fastapi import FastAPI
from controller import user, project

api = FastAPI()

api.include_router(user.router)

@api.get("/")
def home():
    return {"message": "Bienvenue sur l'API principale"}