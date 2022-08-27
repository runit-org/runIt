from django.db import models
from base.models import *

class UserVote(models.Model):
    votedUserId = models.IntegerField(null=True, blank=True)
    voterId     = models.IntegerField(null=True, blank=True)
    status      = models.IntegerField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id