from django.db import models
from django.contrib.auth.models import User
from base.models import *
from datetime import datetime

# Create your models here.

class EventCategory(models.Model):
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)
    tag = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title