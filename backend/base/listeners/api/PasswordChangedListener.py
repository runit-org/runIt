from events import EventListener
from base.events.api import PasswordChanged
from base.traits import LogUserActivity

def logUserActivity(user):
    details =  'Password changed.'
    LogUserActivity.log(user.id, details)

class PasswordChangedListener(EventListener):
    listensFor = [
        PasswordChanged,
    ]

    def handle_event(self, event):
        user = event.user
        logUserActivity(user)
        pass
    pass
