from distutils.command.upload import upload
from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from users.managers import UserManager


class User(AbstractUser):
    """
    Here we override Django's default User model to use email as identifying field, an
    disable the use of the `username` field.
    """
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["first_name", "last_name"]
    username = None
    objects = UserManager()

    email = models.EmailField(_('email address'), unique=True)
    image = models.ImageField(
        _("Image"), upload_to='', default='default.jpg')


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    value = models.FloatField()


class Report(models.Model):
    reported = models.ForeignKey(User, verbose_name="reported",
                                 on_delete=models.CASCADE, related_name="received_reports")

    reported_by = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name="created_reports")

    description = models.TextField("reason for reporting")

    def __str__(self) -> str:
        return f"\"{self.reported}\" reported by \"{self.reported_by}\""
