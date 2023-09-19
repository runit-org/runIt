from events import EventListener
from base.events.api import EventUpdated
from base.traits import LogUserActivity

def logUserActivity(event):
    link = '/event/' + str(event.id)
    details =  'Updated details of your event: ' + event.title.upper() + '.'
    LogUserActivity.log(event.user.id, details, link)

class EventUpdatedListener(EventListener):
    listensFor = [
        EventUpdated,
    ]

    def handle_event(self, event):
        eventObject = event.event
        logUserActivity(eventObject)
        pass
    pass
