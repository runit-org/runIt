from events import EventListener
from base.events.api import ResendVerificationEmailSent
from base.traits import NotifyUser
from base.modules.auth.api.actions import SendEmailOTPAction

class ResendVerificationEmailSentListener(EventListener):
    listensFor = [
        ResendVerificationEmailSent,
    ]

    def handle_event(self, event):
        user = event.user
        SendEmailOTPAction.send(user)

        pass
    pass
