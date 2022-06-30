from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):

    # Whenever the user that created this product got deleted, we set it to null so the product dont just dissapear
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    userName = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    maxMember = models.IntegerField(null=True, blank=True, default=0)
    details = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class EventMember(models.Model):
    eventId = models.IntegerField(null=True, blank=True, default=0)
    userId = models.IntegerField(null=True, blank=True, default=0)
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # status=0 (pending) | status=1 (accepted) | status=2 (rejected)
    status = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.id
        
