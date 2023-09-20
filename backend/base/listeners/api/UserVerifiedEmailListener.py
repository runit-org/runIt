from events import EventListener
from base.events.api import UserVerifiedEmail
from base.traits import NotifyUser, LogUserActivity

def sendNotification(user):
    message = 'Hi, <b>' + user.username + '</b>! Your email has been successfuly verified. Now you have full unrestricted access accross the app, such as joining events, creating your own, and interact with other users. Enjoy!'
    NotifyUser.notify(user.id, message)

def logUserActivity(user):
    details = 'Verified email.'
    LogUserActivity.log(user.id, details)

class UserVerifiedEmailListener(EventListener):
    listensFor = [
        UserVerifiedEmail,
    ]

    def handle_event(self, event):
        user = event.user
        sendNotification(user)
        logUserActivity(user)
        pass
    pass
