from django.urls import path, include
from base.modules.event.api import EventViews
from base.modules.eventComment.api import EventCommentViews
from base.modules.notification.api import NotificationViews
from base.modules.user.api import UserViews
from base.modules.auth.api import AuthViews
from base.modules.userVote.api import UserVoteViews
from base.modules.friend.api import FriendViews
from base.modules.feedback.api import FeedbackViews


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

auth_patterns = [
    path('login/', AuthViews.MyTokenObtainPairView.as_view(), name='login'),
    path('register/', AuthViews.registerUser, name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', AuthViews.logout, name='logout'),
    path('sendResetPasswordEmail/', AuthViews.sendResetPasswordEmail, name='send_reset_password_email'),
    path('resetPassword/', AuthViews.resetPassword, name='reset_password'),
    path('resendVerifyEmail/', AuthViews.resendVerificationEmail, name='resend_verification_email'),
]

user_patterns = [
    path('all/', UserViews.getAllUsers, name='all_users'),
    path('profile/<str:username>/', UserViews.userProfile, name="get_user_profile"),
    path('me/', UserViews.currentUserProfile, name="get_current_user_profile"),
    path('updateStatusMessage/', UserViews.updateStatusMessage, name="update_my_status_message"),
    path('changePassword/', UserViews.changePassword, name="change_my_password"),
]

user_vote_patterns = [
    path('<str:userId>/', UserVoteViews.vote, name="vote_user"),
    path('', UserVoteViews.listVotedUsers, name="list_voted_users"),
]

event_patterns = [
    path('all/', EventViews.allEvent, name="all_event"),
    path('create/', EventViews.createEvent, name="create_event"),
    path('view/<str:pk>/', EventViews.viewEvent, name="view_event"),
    path('update/<str:pk>/', EventViews.updateEvent, name="update_event"),
    path('updateStatus/<str:pk>/', EventViews.updateEventStatus, name="update_event_status"),
    path('delete/<str:pk>/', EventViews.deleteEvent, name="delete_event"),
    path('deleteCategory/<str:pk>/', EventViews.deleteEventCategory, name="delete_event_category"),
    path('owned/', EventViews.ownedEvent, name="owned_event"),
    path('affiliated/', EventViews.participatedAndOwnedEvent, name='affiliated_event'),
    path('announce/<str:eventId>/', EventViews.announce, name='make_announcement'),
    path('createSuggestions/<str:page>/', EventViews.createEventSuggestions, name='create_event_suggestions'),
    path('inviteFriend/<str:userId>/', EventViews.inviteFriendToEvent, name="invite_a_friend_to_event"),
    path('getMonthYear/<str:userId>/<str:monthYear>/', EventViews.getNumEventsPerMonth, name="get_number_of_events_per_month"),
    path('getPerDate/<str:userId>/<str:fullDate>/', EventViews.getEventsPerFullDate, name="get_user_events_per_given_full_date"),
]

event_member_patterns = [
    path('requestJoin/', EventViews.requestJoinEvent, name="request_join_event"),
    path('getMembers/<str:pk>/', EventViews.getEventMembers, name="get_event_members"),
    path('changeStatus/', EventViews.changeEventMemberStatus, name="approve_member_request"),
]

event_comment_patterns = [
    path('show/<str:eventId>/', EventCommentViews.viewEventComments, name="get_event_comments"),
    path('create/<str:eventId>/', EventCommentViews.createComment, name="create_event_comment"),
    path('update/<str:commentId>/', EventCommentViews.updateComment, name="update_event_comment"),
    path('delete/<str:commentId>/', EventCommentViews.deleteComment, name="delete_event_comment"),
    path('likeUnlike/<str:commentId>/', EventCommentViews.likeOrUnlike, name="like_or_unlike_comment"),
]

notification_patterns = [
    path('all/', NotificationViews.index, name="user_notification"),
    path('read/<str:pk>/', NotificationViews.read, name="read_notification"),
    path('readAll/', NotificationViews.readAll, name="user_read_all_notification"),
]

friend_patterns = [
    path('request/<str:userId>/', FriendViews.requestFriendship, name="send_friendship_request"),
    path('respond/<str:userId>/', FriendViews.respondFriendshipRequest, name="respond_friendship_request"),
    path('show/', FriendViews.showFriends, name="show_current_user_friends"),
    path('showRequests/', FriendViews.showFriendRequests, name="show_current_user_friend_requests"),
    path('delete/<str:userId>/', FriendViews.deleteFriendship, name="delete_friendship"),
]

feedback_patterns = [
    path('create/', FeedbackViews.sendFeedback, name="send_feedback"),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),
    path('user/', include(user_patterns)),
    path('user/vote/', include(user_vote_patterns)),
    path('event/', include(event_patterns)),
    path('event/member/', include(event_member_patterns)),
    path('event/comment/', include(event_comment_patterns)),
    path('notifications/', include(notification_patterns)),
    path('friends/', include(friend_patterns)),
    path('feedback/', include(feedback_patterns)),
]