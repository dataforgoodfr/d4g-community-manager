from pydantic import BaseModel
# from api.model.user import User


class Project(BaseModel):
    project_name: str
    # description: str
    channel_type: str | None
    team_id: str | None
    # users: list[User] | None
