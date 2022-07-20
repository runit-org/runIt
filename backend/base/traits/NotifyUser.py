from base.models import *

def notify(userId, details):
    Notification.objects.create(
        userId = userId,
        details = details
    )