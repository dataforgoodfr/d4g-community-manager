from api.model.user_model import User
from typing import Dict, Any, Optional
from clients.authentik_client import AuthentikClient

class UserLogic:
    def __init__(self, authentik_client: AuthentikClient):
        self.client = authentik_client

    def get_all_users(self) -> list[dict[str, User]]:
        """
        Retrieves raw user data from the client and transforms it 
        into a list of AuthentikUser model objects.
        """
        raw_users = self.client.get_all_users_data() 
        print(raw_users)
        
        user_objects = []
        for user_data in raw_users:
            user_obj = User(
                email=user_data.get("email"),
                attributes=user_data.get("attributes", {})
            )
            user_objects.append({"user" : user_obj})
            
        return user_objects