from base.models import Event
from base.events.BaseEvent import BaseEvent

class EventCreated(BaseEvent):
    def __init__(self, event: Event):
        self.event = event
        super().__init__()
