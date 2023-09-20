from events import EventListener
from base.events.api import UserDetailsUpdated
from base.traits import LogUserActivity

def logUserActivity(user):
    link = '/profile?user=' + user.username
    details =  'Updated profile details.'
    LogUserActivity.log(user.id, details, link)

class UserDetailsUpdatedListener(EventListener):
    listensFor = [
        UserDetailsUpdated,
    ]

    def handle_event(self, event):
        user = event.user
        logUserActivity(user)
        pass
    pass
