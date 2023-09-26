from events import EventListener
from base.events.api import EventCommentDeleted
from base.enums import EventMemberStatus, ActivityLogTypes
from base.traits import LogUserActivity

def logUserActivity(user, commentContent, event):
    details = 'Deleted comment on event ' + event.title.upper() + ': <i>' + commentContent + '</i>.'
    title = 'Deleted comment'
    type = ActivityLogTypes.get.COMMENT.value
    link = '/event/' + str(event.id)
    LogUserActivity.log(user.id, title, type, details, link)

class EventCommentDeletedListener(EventListener):
    listensFor = [
        EventCommentDeleted,
    ]

    def handle_event(self, event):
        user = event.user
        eventObject = event.event
        commentContent = event.commentContent
        logUserActivity(user, commentContent, eventObject)
        pass
    pass
