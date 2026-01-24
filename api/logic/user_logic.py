from github.Project import Project

from api.model.user_model import User
from typing import Dict, Any, Optional

from clients import MattermostClient
from clients.authentik_client import AuthentikClient

class UserLogic:
    def __init__(self, authentik_client: AuthentikClient, mattermost_client: MattermostClient):
        self.authentik_client = authentik_client
        self.mattermost_client = mattermost_client

    def get_all_users(self) -> list[dict[str, User]]:
        """
        Retrieves raw user data from the client and transforms it 
        into a list of AuthentikUser model objects.
        """
        raw_users = self.authentik_client.get_all_users_data()
        print(raw_users)
        
        user_objects = []
        for user_data in raw_users:
            user_obj = User(
                username=user_data.get("username"),
                email=user_data.get("email"),
                attributes=user_data.get("attributes", {})
            )
            user_objects.append({"user" : user_obj})
            
        return user_objects

    def get_projects_for_user(self, user_id) -> list[dict[str, Project]]:
        """"
        Retrieves raw project data from the client and transforms it
        """
        raw_projects = self.mattermost_client.get_channels_for_user(user_id)
        print(raw_projects)