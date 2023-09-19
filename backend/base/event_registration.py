from base.events.api import (
    UserRegistered,
    UserVerifiedEmail,
    EventInvitationSentToFriend,
    EventStatusUpdated,
    FriendRequestSent,
    FriendRequestResponded,
    EventAnnouncementSent,
    EventMemberStatusChanged,
    EventJoinRequestSent,
    EventCommentLiked,
    EventCommentCreated,
    ResendVerificationEmailSent,
    EventCreated,
    EventDeleted,
)
from base.listeners.api import (
    UserRegisteredListener,
    UserVerifiedEmailListener,
    EventInvitationSentToFriendListener,
    EventStatusUpdatedListener,
    FriendRequestSentListener,
    FriendRequestRespondedListener,
    EventAnnouncementSentListener,
    EventMemberStatusChangedListener,
    EventJoinRequestSentListener,
    EventCommentLikedListener,
    EventCommentCreatedListener,
    ResendVerificationEmailSentListener,
    EventCreatedListener,
    EventDeletedListener,
)

def register_events():
    UserRegistered.register(UserRegisteredListener)
    UserVerifiedEmail.register(UserVerifiedEmailListener)
    EventInvitationSentToFriend.register(EventInvitationSentToFriendListener)
    EventStatusUpdated.register(EventStatusUpdatedListener)
    FriendRequestSent.register(FriendRequestSentListener)
    FriendRequestResponded.register(FriendRequestRespondedListener)
    EventAnnouncementSent.register(EventAnnouncementSentListener)
    EventMemberStatusChanged.register(EventMemberStatusChangedListener)
    EventJoinRequestSent.register(EventJoinRequestSentListener)
    EventCommentLiked.register(EventCommentLikedListener)
    EventCommentCreated.register(EventCommentCreatedListener)
    ResendVerificationEmailSent.register(ResendVerificationEmailSentListener)
    EventCreated.register(EventCreatedListener)
    EventDeleted.register(EventDeletedListener)
