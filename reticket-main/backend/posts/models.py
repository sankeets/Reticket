from pickle import TRUE
from django.db import models

# Create your models here.


class Post(models.Model):
    # Create constants that describes the possible types a post can have
    SELLING = "SELLING"
    BUYING = "BUYING"

    POST_TYPES = [
        (SELLING, "Selling"),
        (BUYING, "Buying"),
    ]

    class Meta:
        ordering = ["traded_with", "-id"]

    # The post_type field stores the type of the Post, and limits choices to POST_TYPES
    post_type = models.CharField('type', max_length=255, choices=POST_TYPES)

    event = models.CharField('name of event', max_length=255)

    price = models.FloatField('price', null=True, blank=True)

    description = models.TextField('description', null=True, blank=True)

    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, verbose_name='user')

    traded_with = models.ForeignKey(
        "users.User", on_delete=models.SET_NULL, default=None, null=True, blank=True, related_name="traded_posts"
    )

    location = models.CharField('location', max_length=255)

    def __str__(self) -> str:
        return f"{self.user} {self.post_type} {self.event}"
