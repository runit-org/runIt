from events import Event

class BaseEvent(Event):
    _listeners = []

    def __init__(self):
        pass

    @classmethod
    def register(cls, listener):
        cls._listeners.append(listener)

    @classmethod
    def dispatch(cls, *args, **kwargs):
        event = cls(*args, **kwargs)
        for listener in cls._listeners:
            listener.handle_event(None, event)
