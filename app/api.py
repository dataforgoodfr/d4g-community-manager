from fastapi import FastAPI

from clients.authentik_client import AuthentikClient
from clients.mattermost_client import MattermostClient
from clients.outline_client import OutlineClient
import config


app = FastAPI()


@app.get("/")
def read_root():

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
    return {
        "authentik": authenthik_client.get_all_users_data(),
        "mattermost": mattermost_client.list_users(),
        "outline": outline_client.list_collections(),
    }


@app.get("/status")
def get_status():
    return {"status": "ok"}
