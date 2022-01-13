from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):

    # Whenever the user that created this product got deleted, we set it to null so the product dont just dissapear
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    maxMember = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.title