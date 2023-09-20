from base.models import User, Event
from base.events.BaseEvent import BaseEvent

class EventCommentDeleted(BaseEvent):
    def __init__(self, user: User, event: Event, commentContent: str):
        self.user = user
        self.event = event
        self.commentContent = commentContent
        super().__init__()
