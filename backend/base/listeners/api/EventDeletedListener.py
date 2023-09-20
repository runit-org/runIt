from events import EventListener
from base.events.api import EventDeleted
from base.traits import LogUserActivity

def logUserActivity(eventTitle, user):
    details =  'Deleted an event: ' + eventTitle.upper() + '.'
    LogUserActivity.log(user.id, details)

class EventDeletedListener(EventListener):
    listensFor = [
        EventDeleted,
    ]

    def handle_event(self, event):
        user = event.user
        eventTitle = event.eventTitle
        logUserActivity(eventTitle, user)
        pass
    pass
