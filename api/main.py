from fastapi import FastAPI
from api.controller import project_controller, user_controller

import secrets

import config
from fastapi import FastAPI, Cookie, Header, HTTPException, Response
from pydantic import BaseModel

from controller import user, project


api = FastAPI()


api.include_router(user_controller.router, prefix="/v1")
api.include_router(project_controller.router, prefix="/v1")


class LoginRequest(BaseModel):
    username: str
    password: str


active_sessions: dict[str, dict] = {}


@api.post("/login")
def login(payload: LoginRequest, response: Response):
    """Basic username/password login against env settings."""
    if (
        payload.username != config.BASIC_AUTH_USERNAME
        or payload.password != config.BASIC_AUTH_PASSWORD
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = secrets.token_urlsafe(32)
    user = {
        "id": "basic-user",
        "username": payload.username,
        "email": "",
    }
    active_sessions[token] = user
    response.set_cookie(
        "auth-token",
        token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=7200,  # 2 hours
    )
    return {"user": user}


@api.get("/validate-token")
def validate_token(auth_token: str | None = Cookie(default=None)):
    if not auth_token:
        return {"valid": False}

    user = active_sessions.get(auth_token)
    if not user:
        return {"valid": False}

    return {"valid": True, "user": user}


@api.post("/logout")
def logout(response: Response):
    response.delete_cookie("auth-token")
    return {"message": "Logged out"}


@api.get("/")
def home():
    return {"message": "Bienvenue sur l'API D4G Community Manager"}
