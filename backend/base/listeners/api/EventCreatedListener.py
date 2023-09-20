from events import EventListener
from base.events.api import EventCreated
from base.traits import LogUserActivity

def logUserActivity(event):
    link = '/event/' + str(event.id)
    details =  'Created a new event: ' + event.title.upper() + '.'
    LogUserActivity.log(event.user.id, details, link)

class EventCreatedListener(EventListener):
    listensFor = [
        EventCreated,
    ]

    def handle_event(self, event):
        eventObject = event.event
        logUserActivity(eventObject)
        pass
    pass
