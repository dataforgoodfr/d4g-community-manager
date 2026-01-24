from clients.mattermost_client import MattermostClient
from api.model.project import Project


class ProjectService:
    def __init__(self, mattermost_client: MattermostClient):
        self.client = mattermost_client
        self.project = project

    def create_project(self, project: Project) -> dict:
        return self.client.create_channel(
            project.project_name, project.channel_type, project.team_id
        )


# from api.model.user_model import User
# from clients.authentik_client import AuthentikClient
#
# class UserLogic:
#     def init(self, authentik_client: AuthentikClient):
#         self.client = authentik_client
#
#
# def get_all_users(self) -> list[User]:
#     """
#     Retrieves raw user data from the client and transforms it
#     into a list of AuthentikUser model objects.
#     """
#     raw_users = self.client.get_all_users_data()
#
#     user_objects = []
#     for user_data in raw_users:
#         user_obj = User(
#             pk=user_data.get("pk"),
#             username=user_data.get("username", "N/A"),
#             email=user_data.get("email"),
#             attributes=user_data.get("attributes", {})
#         )
#         user_objects.append(user_obj)
#
#     return user_objects
