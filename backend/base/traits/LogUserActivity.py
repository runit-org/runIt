from base.models import *

from datetime import datetime
from django.utils import timezone

def log(userId, title, type, details, link=None):
    UserActivity.objects.create(
        userId = userId,
        title = title,
        type = type,
        details = details,
        link = link,

        createdAt = timezone.make_aware(datetime.now())
    )