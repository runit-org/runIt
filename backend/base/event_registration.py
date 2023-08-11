from base.events.api import (
    UserRegistered,
    UserVerifiedEmail,
)
from base.listeners.api import (
    UserRegisteredListener,
    UserVerifiedEmailListener,
)

def register_events():
    UserRegistered.register(UserRegisteredListener)
    UserVerifiedEmail.register(UserVerifiedEmailListener)
