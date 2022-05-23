from users.models import Rating, User, Report
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    """
    This serializer is used when getting user objects.
    """
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'image']


class RatingSerializer(serializers.ModelSerializer):
    """
    This serializer is used when getting or setting ratings.
    """
    class Meta:
        model = Rating
        fields = ['value']


class CreateReportSerializer(serializers.ModelSerializer):
    """
    This serializer is used when sending reports.
    """
    class Meta:
        model = Report
        fields = ['description']


class CreateUserSerializer(serializers.ModelSerializer):
    """
    This serializer is used when creating user objects.
    """
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'email', 'password', 'image']

    # The password needs to be hashed, so we need to override the field
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    # We need to override the create method to hash the password
    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password')
        )
        return super().create(validated_data)


class LoginSerializer(serializers.ModelSerializer):
    """
    This serializer is used for login.
    """
    class Meta:
        model = User
        fields = ["email", "password"]
