from events import EventListener
from base.events.api import EventAnnouncementSent
from base.models import EventMember
from base.enums import EventMemberStatus
from base.traits import NotifyUser

def sendNotification(user, event, content):
    members = EventMember.objects.filter(event=event)

    message = '<b>' + user.username + '</b> made an announcement on event <b>' + event.title + '</b>: ' + '<i>' + content + '</i>'
    link = '/event/' + str(event.id)
    for member in members:
        NotifyUser.notify(member.userId, message, link)

class EventAnnouncementSentListener(EventListener):
    listensFor = [
        EventAnnouncementSent,
    ]

    def handle_event(self, event):
        user = event.user
        content = event.content
        eventObject = event.event
        sendNotification(user, eventObject, content)
        pass
    pass
