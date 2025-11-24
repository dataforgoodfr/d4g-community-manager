import logging

import config
from app.status_manager import status_manager
from clients.authentik_client import AuthentikClient
from clients.brevo_client import BrevoClient
from clients.github_client import GithubClient
from clients.mattermost_client import MattermostClient
from clients.nocodb_client import NocoDBClient
from clients.outline_client import OutlineClient
from clients.vaultwarden_client import VaultwardenClient


def create_clients() -> dict:
    """
    Initializes and returns a dictionary of API clients.

    This factory function reads the configuration from the `config` module
    and initializes the API clients for the different services used by the bot.
    If a service is not configured, its client will not be initialized.

    :return: A dictionary where keys are service names (e.g., "authentik")
             and values are the initialized client objects.
    """
    clients = {}

    if config.AUTHENTIK_URL and config.AUTHENTIK_TOKEN:
        try:
            clients["authentik"] = AuthentikClient(config.AUTHENTIK_URL, config.AUTHENTIK_TOKEN)
            logging.info("AuthentikClient initialized successfully.")
            status_manager.update_status("Authentik", "OK", "Client initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize AuthentikClient: {e}")
            status_manager.update_status("Authentik", "Error", str(e))
    else:
        logging.warning("Authentik URL or Token not configured. Authentik features will be disabled.")
        status_manager.update_status("Authentik", "Not configured", "URL or Token not configured.")

    if config.OUTLINE_URL and config.OUTLINE_TOKEN:
        try:
            clients["outline"] = OutlineClient(config.OUTLINE_URL, config.OUTLINE_TOKEN)
            logging.info("OutlineClient initialized successfully.")
            status_manager.update_status("Outline", "OK", "Client initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize OutlineClient: {e}")
            status_manager.update_status("Outline", "Error", str(e))
    else:
        logging.warning("Outline URL or Token not configured. Outline features will be disabled.")
        status_manager.update_status("Outline", "Not configured", "URL or Token not configured.")

    if config.MATTERMOST_URL and config.BOT_TOKEN and config.MATTERMOST_TEAM_ID:
        try:
            clients["mattermost"] = MattermostClient(
                base_url=config.MATTERMOST_URL,
                token=config.BOT_TOKEN,
                team_id=config.MATTERMOST_TEAM_ID,
                login_id=config.MATTERMOST_LOGIN_ID,
                password=config.MATTERMOST_PASSWORD,
                debug=config.DEBUG,
            )
            logging.info("MattermostClient initialized successfully.")
            status_manager.update_status("Mattermost", "OK", "Client initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize MattermostClient: {e}")
            status_manager.update_status("Mattermost", "Error", str(e))
    else:
        logging.warning(
            "Mattermost URL, Bot Token, or Team ID not fully configured. Mattermost API operations may fail or be disabled."
        )
        status_manager.update_status("Mattermost", "Not configured", "URL, Bot Token, or Team ID not configured.")

    if config.BREVO_API_URL and config.BREVO_API_KEY:
        try:
            clients["brevo"] = BrevoClient(config.BREVO_API_URL, config.BREVO_API_KEY)
            logging.info("BrevoClient initialized successfully.")
            status_manager.update_status("Brevo", "OK", "Client initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize BrevoClient: {e}")
            status_manager.update_status("Brevo", "Error", str(e))
    else:
        logging.warning("Brevo API URL or Key not configured. Brevo features will be disabled.")
        status_manager.update_status("Brevo", "Not configured", "API URL or Key not configured.")

    if config.NOCODB_URL and config.NOCODB_TOKEN:
        try:
            clients["nocodb"] = NocoDBClient(config.NOCODB_URL, config.NOCODB_TOKEN)
            logging.info("NocoDBClient initialized successfully.")
            status_manager.update_status("NocoDB", "OK", "Client initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize NocoDBClient: {e}")
            status_manager.update_status("NocoDB", "Error", str(e))
    else:
        logging.warning("NocoDB URL or Token not configured. NocoDB features will be disabled.")
        status_manager.update_status("NocoDB", "Not configured", "URL or Token not configured.")

    if (
        config.VAULTWARDEN_ORGANIZATION_ID
        and config.VAULTWARDEN_SERVER_URL
        and config.VAULTWARDEN_API_USERNAME
        and config.VAULTWARDEN_API_PASSWORD
    ):
        try:
            clients["vaultwarden"] = VaultwardenClient(
                organization_id=config.VAULTWARDEN_ORGANIZATION_ID,
                server_url=config.VAULTWARDEN_SERVER_URL,
                api_username=config.VAULTWARDEN_API_USERNAME,
                api_password=config.VAULTWARDEN_API_PASSWORD,
            )
            logging.info("VaultwardenClient initialized successfully.")
            status_manager.update_status("Vaultwarden", "OK", "Client initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize VaultwardenClient: {e}")
            status_manager.update_status("Vaultwarden", "Error", str(e))
        except Exception as e:
            logging.error(
                f"An unexpected error occurred during VaultwardenClient initialization: {e}",
                exc_info=True,
            )
            status_manager.update_status("Vaultwarden", "Error", f"An unexpected error occurred: {e}")
    else:
        logging.warning("Vaultwarden Organization ID not configured. Vaultwarden features will be disabled.")
        status_manager.update_status("Vaultwarden", "Not configured", "Organization ID not configured.")

    if config.GITHUB_TOKEN and config.GITHUB_ORGANIZATION:
        try:
            clients["github"] = GithubClient(config.GITHUB_TOKEN, config.GITHUB_ORGANIZATION)
            logging.info("GithubClient initialized successfully.")
        except ValueError as e:
            logging.warning(f"Failed to initialize GithubClient: {e}")
    else:
        logging.warning("GitHub Token or Organization not configured. GitHub features will be disabled.")
    return clients
