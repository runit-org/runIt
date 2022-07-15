from base.models import *

def notifyUser(userId, details):
    Notification.objects.create(
        userId = userId,
        details = details
    )