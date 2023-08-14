from base.events.api import (
    UserRegistered,
    UserVerifiedEmail,
    EventInvitationSentToFriend,
)
from base.listeners.api import (
    UserRegisteredListener,
    UserVerifiedEmailListener,
    EventInvitationSentToFriendListener,
)

def register_events():
    UserRegistered.register(UserRegisteredListener)
    UserVerifiedEmail.register(UserVerifiedEmailListener)
    EventInvitationSentToFriend.register(EventInvitationSentToFriendListener)
