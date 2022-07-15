from django.db import models
from django.contrib.auth.models import User
from base.models import *
from base.views.utils.enums import NotificationStatus

class Notification(models.Model):
    userId = models.IntegerField(null=True, blank=True, default=0)
    details = models.CharField(max_length=200, null=True, blank=True)
    status = models.IntegerField(null=True, blank=True, default=NotificationStatus.UNREAD.value)

    def __str__(self):
        return self.id