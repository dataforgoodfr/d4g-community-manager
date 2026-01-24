from api.logic.user_logic import UserLogic
from clients import client_factory

clients = client_factory.create_clients()

_auth_client = clients["authentik"]
def get_user_logic() -> UserLogic:
    """
    Dependency provider for UserLogic.
    Ensures the Logic class has the client it needs.
    """
    return UserLogic(_auth_client)