from django_cron import CronJobBase, Schedule
from base.models import Event
from base.enums import EventStatus

from datetime import datetime
from django.utils import timezone

class UpdateEventStatusCronJob(CronJobBase):
    RUN_EVERY_MINS = 1  # Run the job every hour

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'base.update_event_status_cron_job'    # Unique identifier for this cron job

    def do(self):
        # # Get the current datetime in the appropriate timezone
        # current_datetime = timezone.make_aware(datetime.datetime.now(), timezone.utc)
        
        # # Calculate the time difference in seconds (startDate - current_datetime)
        # time_diff = current_datetime - F('startDate')

        # # Filter events where the time difference is greater than 24 hours (24*3600 seconds)
        # events = Event.objects.annotate(time_diff_seconds=time_diff.total_seconds()).filter(time_diff_seconds__gt=24*3600)

        # # Update the status of the filtered events to 'finished'
        # events.update(status=2)

        # # Update the status of the events to 'finished'
        # events.update(status=EventStatus.get.FINISHED.value)


        # print('called crons')
        # Get the current datetime in the appropriate timezone


        try:
            current_datetime = timezone.make_aware(datetime.now(), timezone.utc)

            time_threshold = current_datetime - timezone.timedelta(hours=0.5)

            # print(time_threshold)

            # Filter events where the time difference is greater than 24 hours (24*3600 seconds)
            # events = Event.objects.filter(startDate__lte=current_datetime - timezone.timedelta(hours=24)).update(status=EventStatus.get.FINISHED.value)
            events = Event.objects.filter(startDate__lte=time_threshold).update(status=EventStatus.get.FINISHED.value)

            # Update the status of the filtered events to 'finished'
            # events.update(status=EventStatus.get.FINISHED.value)
        except Exception as e:
            print(e)
