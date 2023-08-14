from base.events.api import (
    UserRegistered,
    UserVerifiedEmail,
    EventInvitationSentToFriend,
    EventStatusUpdated,
)
from base.listeners.api import (
    UserRegisteredListener,
    UserVerifiedEmailListener,
    EventInvitationSentToFriendListener,
    EventStatusUpdatedListener,
)

def register_events():
    UserRegistered.register(UserRegisteredListener)
    UserVerifiedEmail.register(UserVerifiedEmailListener)
    EventInvitationSentToFriend.register(EventInvitationSentToFriendListener)
    EventStatusUpdated.register(EventStatusUpdatedListener)
