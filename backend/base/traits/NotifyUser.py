from base.models import *

from datetime import datetime

def notify(userId, details, link=None):
    Notification.objects.create(
        userId = userId,
        details = details,
        link = link,

        createdAt = datetime.now()
    )