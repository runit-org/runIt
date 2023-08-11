from base.events.api.UserRegistered import UserRegistered
from base.listeners.api.UserRegisteredListener import UserRegisteredListener

def register_events():
    UserRegistered.register(UserRegisteredListener)
