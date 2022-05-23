from posts.models import Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    """
    This serializer is used when getting Post objects. Can be used for making, editing and fetching.
    """
    class Meta:
        model = Post
        fields = ['id', 'post_type', 'event', 'price',
                  'description', 'user', 'location','traded_with']
