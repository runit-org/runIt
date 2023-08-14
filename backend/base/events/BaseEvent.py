from events import Event

class BaseEvent(Event):
    def __init__(self):
        pass

    @classmethod
    def register(cls, listener):
        if not hasattr(cls, '_listeners'):
            cls._listeners = []  # Create a unique list for each event class
        cls._listeners.append(listener)

    @classmethod
    def dispatch(cls, *args, **kwargs):
        event = cls(*args, **kwargs)
        for listener in cls._listeners:
            listener.handle_event(None, event)