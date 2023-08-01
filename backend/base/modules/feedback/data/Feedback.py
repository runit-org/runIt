from django.db import models
from django.contrib.auth.models import User
from base.models import *
from datetime import datetime

class Feedback(models.Model):

    # Whenever the user that created this product got deleted, we set it to null so the product dont just dissapear
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    details = models.TextField(null=True, blank=True)

    createdAt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.details