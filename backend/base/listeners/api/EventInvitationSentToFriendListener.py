from events import EventListener
from base.events.api import EventInvitationSentToFriend
from base.traits import NotifyUser

def sendNotification(currUser, target, event):
    link = '/event/' + str(event.id)
    notificationMessage = 'Your friend ' + currUser.username + \
        ' has invited you to join their event <b><i>' + \
        event.title.upper() + '</i></b>. Click here to view event.'
    NotifyUser.notify(
        target.id, notificationMessage, link
    )

class EventInvitationSentToFriendListener(EventListener):
    listensFor = [
        EventInvitationSentToFriend,
    ]

    def handle_event(self, event):
        currUser = event.currUser
        target = event.target
        event = event.event
        sendNotification(currUser, target, event)
        pass
    pass
