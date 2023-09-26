from events import EventListener
from base.events.api import FeedbackSubmitted
from base.traits import LogUserActivity
from base.enums import ActivityLogTypes

def logUserActivity(user, feedback):
    title = 'Submitted feedback'
    type = ActivityLogTypes.get.FEEDBACK.value
    details =  'Submitted feedback: <i>' + feedback.details + '</i>.'
    LogUserActivity.log(user.id, title, type,  details)

class FeedbackSubmittedListener(EventListener):
    listensFor = [
        FeedbackSubmitted,
    ]

    def handle_event(self, event):
        user = event.user
        feedback = event.feedback
        logUserActivity(user, feedback)
        pass
    pass
