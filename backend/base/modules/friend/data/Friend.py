from django.db import models
from django.contrib.auth.models import User
from base.models import *
from datetime import datetime

# Create your models here.

class Friend(models.Model):

    user1 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    user2 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id