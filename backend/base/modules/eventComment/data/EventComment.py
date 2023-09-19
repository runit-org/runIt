from django.db import models
from django.contrib.auth.models import User
from base.models import *
from base.enums import Utils

class EventComment(models.Model):
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.CharField(max_length=Utils.get.MAX_CONTENT_LENGTH.value, null=True, blank=True)

    createdAt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.id