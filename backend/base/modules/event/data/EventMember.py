from django.db import models
from django.contrib.auth.models import User
from base.models import *

class EventMember(models.Model):
    eventId = models.IntegerField(null=True, blank=True, default=0)
    userId = models.IntegerField(null=True, blank=True, default=0)
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # status=0 (pending) | status=1 (accepted) | status=2 (rejected)
    status = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.id