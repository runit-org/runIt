from base.events.api import (
    UserRegistered,
    UserVerifiedEmail,
    EventInvitationSentToFriend,
    EventStatusUpdated,
    FriendRequestSent,
    FriendRequestResponded,
)
from base.listeners.api import (
    UserRegisteredListener,
    UserVerifiedEmailListener,
    EventInvitationSentToFriendListener,
    EventStatusUpdatedListener,
    FriendRequestSentListener,
    FriendRequestRespondedListener,
)

def register_events():
    UserRegistered.register(UserRegisteredListener)
    UserVerifiedEmail.register(UserVerifiedEmailListener)
    EventInvitationSentToFriend.register(EventInvitationSentToFriendListener)
    EventStatusUpdated.register(EventStatusUpdatedListener)
    FriendRequestSent.register(FriendRequestSentListener)
    FriendRequestResponded.register(FriendRequestRespondedListener)
