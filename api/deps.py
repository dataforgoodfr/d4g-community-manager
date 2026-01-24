from api.logic.user_logic import UserLogic
from api.logic.project_logic import ProjectLogic
from clients import client_factory

clients = client_factory.create_clients()

_auth_client = clients["authentik"]
_mattermost_client = clients["mattermost"]

def get_user_logic() -> UserLogic:
    """
    Dependency provider for UserLogic.
    Ensures the Logic class has the client it needs.
    """
    return UserLogic(_auth_client, _mattermost_client)

def get_project_logic() -> ProjectLogic:
    """
    Dependency provider for ProjectLogic.
    Ensures the Logic class has the client it needs.
    """
    return ProjectLogic(_mattermost_client)