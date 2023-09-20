from events import EventListener
from base.events.api import EventStatusUpdated
from base.models import EventMember
from base.enums import EventMemberStatus
from base.traits import NotifyUser, LogUserActivity

def sendNotification(user, event, status):
    eventMemberObjects = EventMember.objects.filter(event=event)
    for eventMember in eventMemberObjects:
        if eventMember.user != user:
            if eventMember.status == EventMemberStatus.get.ACCEPTED.value:
                link = '/event/' + str(event.id)
                notificationMessage = 'User <b>' + user.username + '</b> has updated the status of an event you are affiliated with: <b>' + event.title + '</b>. New status: ' + status
                NotifyUser.notify(eventMember.user.id, notificationMessage, link)

def logUserActivity(user, event, status):
    link = '/event/' + str(event.id)
    details = 'Updated status of an event you created: <b>' + event.title.upper() + '</b>. New status: ' + status
    LogUserActivity.log(user.id, details, link)

class EventStatusUpdatedListener(EventListener):
    listensFor = [
        EventStatusUpdated,
    ]

    def handle_event(self, event):
        user = event.user
        status = event.status
        eventObject = event.event
        sendNotification(user, eventObject, status)
        logUserActivity(user, eventObject, status)
        pass
    pass
