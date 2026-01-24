from clients.mattermost_client import MattermostClient
from api.model.project_model import Project


class ProjectLogic:
    def __init__(self, mattermost_client: MattermostClient):
        self.client = mattermost_client

    def create_project(self, project: Project) -> dict:
        return self.client.create_channel(
            project.project_name, project.channel_type, project.team_id
        )

    def get_projects_by_team(self, team : str) -> list:
        return self.client.get_channels_for_team()

