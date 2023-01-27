from django.db import models
from django.contrib.auth.models import User
from base.models import *
from datetime import datetime

# Create your models here.

class FriendRequest(models.Model):
    # Related name is needed to avoid clash between models, since we have both foreign key to the User model
    main = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='main_user')
    requester = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='friendship_requester')
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id