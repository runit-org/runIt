from events import Event
from base.models import User

class UserRegistered(Event):
    _listeners = []

    def __init__(self, user):
        self.user = user

    @classmethod
    def register(cls, listener):
        cls._listeners.append(listener)

    @classmethod
    def dispatch(cls, user):
        event = cls(user)
        print(event.user.email)
        for listener in cls._listeners:
            listener.handle_event(None, event)