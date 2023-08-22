from events import EventListener
from base.events.api import FriendRequestSent
from base.traits import NotifyUser

def sendNotification(target, user):
    link = '/friend-request/'
    notificationMessage = 'You have a pending friend request from <b>' + user.username + '</b>. Click to manage your friend requests.'  
    NotifyUser.notify(
        target.id, notificationMessage, link
    )

class FriendRequestSentListener(EventListener):
    listensFor = [
        FriendRequestSent,
    ]

    def handle_event(self, event):
        target = event.target
        user = event.user
        sendNotification(target, user)
        pass
    pass
