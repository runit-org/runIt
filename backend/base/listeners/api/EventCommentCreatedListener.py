from events import EventListener
from base.events.api import EventCommentCreated
from base.enums import EventMemberStatus
from base.traits import NotifyUser

def sendNotification(user, event):
    eventCreatorUserId = event.user.id
    notificationMessage = 'User <b>' + user.username + '</b> commented on your event ' + '<b>' + event.title + '</b>'
    link = '/event/' + str(event.id)
    NotifyUser.notify(eventCreatorUserId, notificationMessage, link)

class EventCommentCreatedListener(EventListener):
    listensFor = [
        EventCommentCreated,
    ]

    def handle_event(self, event):
        user = event.user
        eventObject = event.event
        sendNotification(user, eventObject)
        pass
    pass
