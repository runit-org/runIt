from django.db import models
from django.contrib.auth.models import User
from base.models import *

class UserExtend(models.Model):
    userId = models.IntegerField(null=True, blank=True, default=0)
    resetToken = models.CharField(max_length=200, null=True, blank=True)
    resetTokenTime = models.DateTimeField(null=True)

    statusMessage = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.id