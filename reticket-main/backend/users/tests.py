from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from users.views import UserViewSet
from users.models import User
import json


class CreateUserTest(APITestCase):
    """
    Test the endpoint for creating users.
    """
    # The URL to the create endpoint is the same as the URL to the list endpoint, and
    # is called `user-list` by Django.
    uri = reverse("user-list")

    def test_can_create_valid_user(self):
        data = {
            "first_name": "Test",
            "password": "#et-vanskelig-passord-123",
            "email": "test@example.com",
        }
        response = self.client.post(self.uri, data)
        assert response.status_code == 201, f"Expected 201 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_cannot_create_invalid_user(self):
        data = {
            "first_name": "test2",
            "password": "#et-vanskelig-passord-123",
        }
        response = self.client.post(self.uri, data)
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_cannot_use_same_email(self):
        data = {
            "email": "non-unique-email@example.com",
            "password": "#et-vanskelig-passord-123",
            "first_name": "Test",
            "last_name": "Testesen",
        }
        response = self.client.post(self.uri, data)
        assert response.status_code == 201, f"Expected 201 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

        data["first_name"] = "En annen test"
        response = self.client.post(self.uri, data)
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"


class TestUserLogin(APITestCase):
    """
    Tests the login endpoint for users.
    """
    uri = reverse("user-login")
    password = "#et-vanskelig-passord-123"
    email = "non-unique-email@example.com"
    user: User

    def setUp(self) -> None:
        """
        The setUp method is run before each test, and creates a User object that can be
        used in the tests.
        """
        super().setUp()
        self.user = User(email=self.email)
        self.user.set_password(self.password)
        self.user.save()

    def test_can_login_with_correct_credentials(self):
        data = {
            "email": self.email,
            "password": self.password,
        }

        response = self.client.post(self.uri, data)
        assert response.status_code == 200, f"Expected 200 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_cannot_login_with_incorrect_credentials(self):
        data = {
            "email": self.email,
            "password": "wrong-password",
        }

        response = self.client.post(self.uri, data)
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"
