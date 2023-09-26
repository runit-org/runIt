from events import EventListener
from base.events.api import EventUpdated
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(event):
    title = 'Updated event'
    type = ActivityLogTypes.get.EVENT.value
    link = '/event/' + str(event.id)
    details =  'Updated details of your event: ' + event.title.upper() + '.'
    LogUserActivity.log(event.user.id, title, type, details, link)

class EventUpdatedListener(EventListener):
    listensFor = [
        EventUpdated,
    ]

    def handle_event(self, event):
        eventObject = event.event
        logUserActivity(eventObject)
        pass
    pass
