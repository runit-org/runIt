from django.db import models
from base.models import *
from base.enums import Utils

class UserActivity(models.Model):
    userId      = models.IntegerField(null=True, blank=True)
    details     = models.CharField(max_length=Utils.get.MAX_CONTENT_LENGTH.value*2, null=True, blank=True)
    link        = models.CharField(max_length=300, null=True, blank=True)
    title       = models.CharField(max_length=500, null=True, blank=True)
    type        = models.CharField(max_length=300, null=True, blank=True)

    createdAt   = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.id