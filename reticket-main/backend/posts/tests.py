from multiprocessing import Event
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from posts.views import PostViewSet
from posts.models import Post
import json

from users.models import User
from posts.factories import PostFactory


class PostViewSetTest(APITestCase):
    """
    Test the endpoint for creating a "buy" post.
    """
    # The URL to the create endpoint is the same as the URL to the list endpoint, and
    # is called `post-list` by Django.
    list_create_url = reverse("post-list")

    def test_can_create_post(self):
        user = User.objects.create(email="test@test.com")
        data = {
            "event": "Test",
            "post_type": "SELLING",
            "price": 240,
            "description": "Testy",
            "user": user.pk,
            "location": "Hjemme",
        }
        response = self.client.post(self.list_create_url, data)
        assert response.status_code == 201, f"Expected 201 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_cannot_create_post_without_user(self):
        data = {
            "event": "Test",
            "post_type": "SELLING",
            "price": 240,
            "description": "Testy",
        }
        response = self.client.post(self.list_create_url, data)
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_cannot_create_post_without_eventname(self):
        user = User.objects.create(email="test@test.com")
        data = {
            "post_type": "SELLING",
            "price": 240,
            "description": "Testy",
            "user": user.pk,
        }
        response = self.client.post(self.list_create_url, data)
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_cannot_create_post_with_malformed_price(self):
        user = User.objects.create(email="test@test.com")
        data = {
            "event": "Test",
            "post_type": "SELLING",
            "price": "Not a number",
            "description": "Testy",
            "user": user.pk,
        }
        response = self.client.post(self.list_create_url, data)
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"

    def test_can_filter_by_post_type(self):
        user = User.objects.create(email="test@test.com")
        buy_post = PostFactory(post_type="BUYING", user=user)
        sell_post_1 = PostFactory(post_type="SELLING", user=user)
        sell_post_2 = PostFactory(post_type="SELLING", user=user)

        list_all_response = self.client.get(self.list_create_url)
        assert list_all_response.status_code == 200
        assert set(o["id"] for o in list_all_response.data) == set(
            o.id for o in [buy_post, sell_post_1, sell_post_2])

        list_all_response = self.client.get(
            self.list_create_url+"?post_type=SELLING")
        assert list_all_response.status_code == 200
        assert set(o["id"] for o in list_all_response.data) == set(
            o.id for o in [sell_post_1, sell_post_2])

        list_all_response = self.client.get(
            self.list_create_url+"?post_type=BUYING")
        assert list_all_response.status_code == 200
        assert set(o["id"]
                   for o in list_all_response.data) == set([buy_post.id])

    def test_can_edit_post(self):
        user = User.objects.create(email="test@test.com")
        post = PostFactory(user=user)
        url = reverse("post-detail", kwargs={"pk": post.id})

        data = {
            "event": "New event name",
        }

        response = self.client.patch(url, data)
        assert response.status_code == 200, f"Expected 200 but got {response.status_code}. Here is the data: {json.dumps(response.data, indent=4)}"
