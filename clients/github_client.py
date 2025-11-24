import logging
from github import Auth, Github, GithubException


class GithubClient:
    def __init__(self, token: str, organization: str):
        """
        Initializes the GithubClient.
        :param token: The personal access token for GitHub API operations.
        :param organization: The name of the GitHub organization.
        """
        if not token or not organization:
            raise ValueError("GitHub token and organization must be provided.")
        auth = Auth.Token(token)
        self.g = Github(auth=auth)
        self.organization = organization

    def create_repo(self, repo_name: str) -> bool:
        """
        Creates a new repository in the organization.
        :param repo_name: The name of the repository to create.
        :return: True if successful, False otherwise.
        """
        try:
            org = self.g.get_organization(self.organization)
            org.create_repo(repo_name, private=True)
            logging.info(f"Successfully created repository '{repo_name}' in organization '{self.organization}'.")
            return True
        except GithubException as e:
            if e.status == 422 and "name already exists" in e.data["errors"][0]["message"]:
                logging.warning(f"Repository '{repo_name}' already exists in organization '{self.organization}'.")
                return True
            logging.error(f"Error creating repository '{repo_name}': {e}")
            return False

    def close(self):
        """
        Closes the connection to the GitHub API.
        """
        self.g.close()
