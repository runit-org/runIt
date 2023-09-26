from events import EventListener
from base.events.api import EventDeleted
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(eventTitle, user):
    title = 'Deleted Event'
    type = ActivityLogTypes.get.EVENT.value
    details =  'Deleted an event: ' + eventTitle.upper() + '.'
    LogUserActivity.log(user.id, title, type, details)

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
