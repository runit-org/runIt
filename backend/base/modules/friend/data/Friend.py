from django.db import models
from django.contrib.auth.models import User
from base.models import *
from datetime import datetime

# Create your models here.

class Friend(models.Model):
    # Related name is needed to avoid clash between models, since we have both foreign key to the User model
    user1 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='first_user')
    user2 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='second_user')
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id