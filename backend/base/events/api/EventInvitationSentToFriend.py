from base.models import User, Event
from base.events.BaseEvent import BaseEvent

class EventInvitationSentToFriend(BaseEvent):
    def __init__(self, currUser: User, target: User, event: Event):
        self.currUser = currUser
        self.target = target
        self.event = event
        super().__init__()
