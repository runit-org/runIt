from base.models import User, Event
from base.events.BaseEvent import BaseEvent

class EventCommentCreated(BaseEvent):
    def __init__(self, user: User, event: Event):
        self.user = user
        self.event = event
        super().__init__()
