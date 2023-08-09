from django.db import models
from base.models import *

class UserActivity(models.Model):
    userId      = models.IntegerField(null=True, blank=True)
    details     = models.CharField(max_length=500, null=True, blank=True)
    link        = models.CharField(max_length=300, null=True, blank=True)

    createdAt   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id