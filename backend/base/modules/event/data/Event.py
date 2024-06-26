from django.db import models
from django.contrib.auth.models import User
from base.models import *
from datetime import datetime
from base.enums import Utils

# Create your models here.

class Event(models.Model):

    # Whenever the user that created this product got deleted, we set it to null so the product dont just dissapear
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # userName = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=Utils.get.MAX_TITLE_LENGTH.value, null=True, blank=True)
    maxMember = models.IntegerField(null=True, blank=True, default=0)
    details = models.TextField(max_length=Utils.get.MAX_CONTENT_LENGTH.value, null=True, blank=True)
    startDate = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(null=True, blank=True)

    year = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    day = models.IntegerField(null=True, blank=True)
    hour = models.IntegerField(null=True, blank=True)
    minute = models.IntegerField(null=True, blank=True)

    status = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title