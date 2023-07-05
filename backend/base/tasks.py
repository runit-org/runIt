from celery import shared_task
from base.models import Event
from base.enums import EventStatus

from datetime import datetime
from django.utils import timezone
from backend.celery import app

@app.task
def update_past_24_hour_event_status_to_finished():
    current_datetime = timezone.make_aware(datetime.now(), timezone.utc)
    time_threshold = current_datetime - timezone.timedelta(hours=24)
    events = Event.objects.filter(startDate__lte=time_threshold).update(status=EventStatus.get.FINISHED.value)
