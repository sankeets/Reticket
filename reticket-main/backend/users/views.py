from http.client import CREATED
from math import ceil
from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets, mixins, serializers
from rest_framework.response import Response
from users.models import Rating
from users.serializers import CreateUserSerializer, RatingSerializer, UserSerializer, LoginSerializer, CreateReportSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login, logout

"""
This view set allows:
- Creating new users
- Listing existing users
- Retrieving specific users by ID
- Logging in as a user with email and password
"""


class UserViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    def get_serializer_class(self):
        # When creating new users, we want to use the serializer that includes password
        if self.action == "create":
            return CreateUserSerializer
        # Otherwise, use the default
        return self.serializer_class

    @action(detail=False, methods=["POST"], serializer_class=LoginSerializer)
    def login(self, request):
        """
        This view allows logging in via email and password.
        It returns the serialized object of the user you logged in as.
        """
        email = request.POST.get("email") or request.data.get("email")
        password = request.POST.get("password") or request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            # Create a session, and return the user object.
            login(request, user)
            serializer = UserSerializer(user, context={"request": request})
            return Response(serializer.data)
        else:
            # Return an 'invalid login' error message.
            return Response({"error": ["Invalid email or password"]}, status=400)

    @action(detail=False, methods=["GET"])
    def current(self, request):
        """
        Returns the current user.
        """
        if isinstance(request.user, get_user_model()):
            serializer = self.serializer_class(request.user)
            return Response(serializer.data)
        return Response({"detail": "You are not logged in"}, status=404)

    @action(detail=False)
    def logout(self, request):
        logout(request)
        return Response(status=201)

    @action(detail=True, methods=["POST"], serializer_class=RatingSerializer)
    def rate(self, request, pk):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=pk)
        return Response(serializer.data, status=CREATED)

    @action(detail=True, serializer_class=serializers.BaseSerializer)
    def rating(self, request, pk):
        ratings = Rating.objects.filter(
            user_id=pk).values_list("value", flat=True)
        avg_rating = ceil(sum(ratings)/len(ratings)) if len(ratings) else None
        return Response(avg_rating)

    @action(detail=True, methods=["POST"], serializer_class=CreateReportSerializer)
    def report(self, request, pk):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(reported_by=request.user, reported_id=pk)
        return Response(serializer.data, status=CREATED)
