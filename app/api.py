from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from clients.authentik_client import AuthentikClient
from clients.mattermost_client import MattermostClient
from clients.outline_client import OutlineClient
import config


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

authenthik_client = AuthentikClient(
    base_url=config.AUTHENTIK_URL,
    token=config.AUTHENTIK_TOKEN,
)
mattermost_client = MattermostClient(
    base_url=config.MATTERMOST_URL,
    token=config.BOT_TOKEN,
    team_id=config.MATTERMOST_TEAM_ID,
)
outline_client = OutlineClient(
    base_url=config.OUTLINE_URL,
    token=config.OUTLINE_TOKEN,
)


@app.get("/api/users")
def list_users():
    all_groups = authenthik_client.get_groups_with_users()[0]
    all_users = []
    for group in all_groups:
        for user in group["users_obj"]:
            user_data = user.copy()
            user_data["authentik_group"] = group["name"]
            all_users.append(user_data)
    return {
        "users": [
            {
                "id": -1,
                "pk_id": user["pk"],
                "username": user["username"],
                "email": user["email"],
                "projects": [],
                "authentik_group": user["authentik_group"],
                "is_active": user["is_active"],
            }
            for user in all_users
        ],
        "count": len(all_users),
    }


@app.get("/api/projects")
def get_all_projects():
    all_projects = mattermost_client.get_all_channels()
    return {
        "data": [
            {
                "id": -1,
                "pk_id": project["id"],
                "name": project["display_name"],
                "description": "Beautiful project",
                "season": "N/A",
                "users": [],
            }
            for project in all_projects
        ]
    }


@app.get("/status")
def get_status():
    return {"status": "ok"}
