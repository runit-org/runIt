from events import EventListener
from base.events.api import FriendRequestResponded
from base.traits import NotifyUser

def sendNotification(target, user):
    link = '/profile?user=' + user.username
    notificationMessage = 'User <b>' + user.username + '</b> has accepted your friendship request.'  
    NotifyUser.notify(
        target.id, notificationMessage, link
    )

class FriendRequestRespondedListener(EventListener):
    listensFor = [
        FriendRequestResponded,
    ]

    def handle_event(self, event):
        target = event.target
        user = event.user
        sendNotification(target, user)
        pass
    pass
