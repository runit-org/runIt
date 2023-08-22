from base.models import User, Event
from base.events.BaseEvent import BaseEvent

class EventAnnouncementSent(BaseEvent):
    def __init__(self, user: User, event: Event, content: str):
        self.user = user
        self.event = event
        self.content = content
        super().__init__()
