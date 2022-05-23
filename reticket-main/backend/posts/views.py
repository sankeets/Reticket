from django.shortcuts import render
from rest_framework import viewsets
from posts.serializers import PostSerializer
from posts.models import Post

# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing post instances.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        if user := self.request.GET.get("user"):
            queryset = queryset.filter(user=user)
        if post_type := self.request.GET.get("post_type"):
            queryset = queryset.filter(post_type=post_type)
        return queryset
