from django.db import models
from django.contrib.auth.models import User
from base.models import *

class EventCommentLike(models.Model):
    eventComment = models.ForeignKey(EventComment, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id