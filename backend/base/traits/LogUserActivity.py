from base.models import *

from datetime import datetime
from django.utils import timezone

def log(userId, details, link=None):
    Notification.objects.create(
        userId = userId,
        details = details,
        link = link,

        createdAt = timezone.make_aware(datetime.now())
    )