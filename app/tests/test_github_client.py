import unittest
from unittest.mock import MagicMock, patch

from github import GithubException

from clients.github_client import GithubClient


class TestGithubClient(unittest.TestCase):
    @patch("clients.github_client.Github")
    def test_init_success(self, mock_github):
        """Test successful initialization of GithubClient."""
        client = GithubClient(token="fake-token", organization="fake-org")
        mock_github.assert_called_once()
        self.assertIsNotNone(client.g)
        self.assertEqual(client.organization, "fake-org")

    def test_init_missing_token(self):
        """Test that initialization fails if token is missing."""
        with self.assertRaises(ValueError):
            GithubClient(token="", organization="fake-org")

    def test_init_missing_organization(self):
        """Test that initialization fails if organization is missing."""
        with self.assertRaises(ValueError):
            GithubClient(token="fake-token", organization="")

    @patch("clients.github_client.Github")
    def test_create_repo_success(self, mock_github):
        """Test successful repository creation."""
        mock_g_instance = MagicMock()
        mock_org = MagicMock()
        mock_github.return_value = mock_g_instance
        mock_g_instance.get_organization.return_value = mock_org

        client = GithubClient(token="fake-token", organization="fake-org")
        result = client.create_repo("new-repo")

        self.assertTrue(result)
        mock_g_instance.get_organization.assert_called_once_with("fake-org")
        mock_org.create_repo.assert_called_once_with("new-repo", private=True)

    @patch("clients.github_client.Github")
    def test_create_repo_already_exists(self, mock_github):
        """Test repository creation when it already exists."""
        mock_g_instance = MagicMock()
        mock_org = MagicMock()
        mock_github.return_value = mock_g_instance
        mock_g_instance.get_organization.return_value = mock_org

        # Simulate GithubException for existing repo
        mock_org.create_repo.side_effect = GithubException(
            status=422,
            data={
                "message": "Repository creation failed.",
                "errors": [
                    {
                        "resource": "Repository",
                        "code": "custom",
                        "field": "name",
                        "message": "name already exists on this account",
                    }
                ],
            },
            headers=None,
        )

        client = GithubClient(token="fake-token", organization="fake-org")
        result = client.create_repo("existing-repo")

        self.assertTrue(result)  # Should be considered a success
        mock_g_instance.get_organization.assert_called_once_with("fake-org")
        mock_org.create_repo.assert_called_once_with("existing-repo", private=True)

    @patch("clients.github_client.Github")
    def test_create_repo_generic_error(self, mock_github):
        """Test repository creation with a generic GithubException."""
        mock_g_instance = MagicMock()
        mock_org = MagicMock()
        mock_github.return_value = mock_g_instance
        mock_g_instance.get_organization.return_value = mock_org

        # Simulate a generic GithubException
        mock_org.create_repo.side_effect = GithubException(
            status=500, data={"message": "Internal Server Error"}, headers=None
        )

        client = GithubClient(token="fake-token", organization="fake-org")
        result = client.create_repo("error-repo")

        self.assertFalse(result)
        mock_g_instance.get_organization.assert_called_once_with("fake-org")
        mock_org.create_repo.assert_called_once_with("error-repo", private=True)

    @patch("clients.github_client.Github")
    def test_close_connection(self, mock_github):
        """Test that the close method is called on the github instance."""
        mock_g_instance = MagicMock()
        mock_github.return_value = mock_g_instance

        client = GithubClient(token="fake-token", organization="fake-org")
        client.close()

        mock_g_instance.close.assert_called_once()


if __name__ == "__main__":
    unittest.main()
