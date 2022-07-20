from django.db import models
from django.contrib.auth.models import User
from base.models import *
from base.enums import EventMemberStatus

class EventMember(models.Model):
    eventId = models.IntegerField(null=True, blank=True, default=0)
    userId = models.IntegerField(null=True, blank=True, default=0)
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.IntegerField(null=True, blank=True, default=EventMemberStatus.EventMemberStatus.PENDING.value)

    def __str__(self):
        return self.id