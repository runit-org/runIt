from base.models import User, Event
from base.events.BaseEvent import BaseEvent

class EventStatusUpdated(BaseEvent):
    def __init__(self, user: User, event: Event, status: int):
        self.user = user
        self.event = event
        self.status = status
        super().__init__()
