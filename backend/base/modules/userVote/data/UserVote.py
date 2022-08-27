from telnetlib import STATUS
from django.db import models
from django.contrib.auth.models import User
from base.models import *

class EventCommentLike(models.Model):
    votedUser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    voter     = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status    = models.IntegerField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id