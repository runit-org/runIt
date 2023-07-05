from .celery import app as celery_app
from base.tasks import update_past_24_hour_event_status_to_finished

__all__ = ['celery_app']

result = update_past_24_hour_event_status_to_finished.delay()