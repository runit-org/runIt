from base.models import *

from datetime import datetime

def notify(userId, details):
    Notification.objects.create(
        userId = userId,
        details = details,

        createdAt = datetime.now()
    )