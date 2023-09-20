from events import EventListener
from base.events.api import PasswordReset
from base.traits import LogUserActivity

def logUserActivity(user):
    details =  'You successfully reset your password.'
    LogUserActivity.log(user.id, details)

class PasswordResetListener(EventListener):
    listensFor = [
        PasswordReset,
    ]

    def handle_event(self, event):
        user = event.user
        logUserActivity(user)
        pass
    pass
