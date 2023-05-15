from django.urls import path
from base.modules.event.api import EventViews
from base.modules.eventComment.api import EventCommentViews
from base.modules.notification.api import NotificationViews
from base.modules.user.api import UserViews
from base.modules.auth.api import AuthViews
from base.modules.userVote.api import UserVoteViews
from base.modules.friend.api import FriendViews


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('auth/login/', AuthViews.MyTokenObtainPairView.as_view(), name='login'),
    path('auth/register/', AuthViews.registerUser, name='register'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', AuthViews.logout, name='logout'),
    path('auth/sendResetPasswordEmail/', AuthViews.sendResetPasswordEmail, name='send_reset_password_email'),
    path('auth/resetPassword/', AuthViews.resetPassword, name='reset_password'),

    path('user/all/', UserViews.getAllUsers, name='all_users'),
    path('user/vote/<str:userId>/', UserVoteViews.vote, name="vote_user"),
    path('user/profile/<str:username>/', UserViews.userProfile, name="get_user_profile"),
    path('user/me/', UserViews.currentUserProfile, name="get_current_user_profile"),
    path('user/updateStatusMessage/', UserViews.updateStatusMessage, name="update_my_status_message"),

    path('event/all/', EventViews.allEvent, name="all_event"),
    path('event/create/', EventViews.createEvent, name="create_event"),
    path('event/view/<str:pk>/', EventViews.viewEvent, name="view_event"),
    path('event/update/<str:pk>/', EventViews.updateEvent, name="update_event"),
    path('event/updateStatus/<str:pk>/', EventViews.updateEventStatus, name="update_event_status"),
    path('event/delete/<str:pk>/', EventViews.deleteEvent, name="delete_event"),
    path('event/deleteCategory/<str:pk>/', EventViews.deleteEventCategory, name="delete_event_category"),
    path('event/owned/', EventViews.ownedEvent, name="owned_event"),
    path('event/affiliated/', EventViews.participatedAndOwnedEvent, name='affiliated_event'),
    path('event/announce/<str:eventId>/', EventViews.announce, name='make_announcement'),
    path('event/createSuggestions/<str:page>/', EventViews.createEventSuggestions, name='create_event_suggestions'),
    path('event/inviteFriend/<str:userId>/', EventViews.inviteFriendToEvent, name="invite_a_friend_to_event"),
    path('event/getMonthYear/<str:userId>/<str:monthYear>/', EventViews.getNumEventsPerMonth, name="get_number_of_events_per_month"),
    path('event/getPerDate/<str:userId>/<str:fullDate>/', EventViews.getEventsPerFullDate, name="get_user_events_per_given_full_date"),

    path('event/member/requestJoin/', EventViews.requestJoinEvent, name="request_join_event"),
    path('event/member/getMembers/<str:pk>/', EventViews.getEventMembers, name="get_event_members"),
    path('event/member/changeStatus/', EventViews.changeEventMemberStatus, name="approve_member_request"),

    path('event/comment/show/<str:eventId>/', EventCommentViews.viewEventComments, name="get_event_comments"),
    path('event/comment/create/<str:eventId>/', EventCommentViews.createComment, name="create_event_comment"),
    path('event/comment/update/<str:commentId>/', EventCommentViews.updateComment, name="update_event_comment"),
    path('event/comment/delete/<str:commentId>/', EventCommentViews.deleteComment, name="delete_event_comment"),
    path('event/comment/likeUnlike/<str:commentId>/', EventCommentViews.likeOrUnlike, name="like_or_unlike_comment"),

    path('notifications/all/', NotificationViews.index, name="user_notification"),
    path('notifications/read/<str:pk>/', NotificationViews.read, name="read_notification"),
    path('notifications/readAll/', NotificationViews.readAll, name="user_read_all_notification"),

    path('friends/request/<str:userId>/', FriendViews.requestFriendship, name="send_friendship_request"),
    path('friends/respond/<str:userId>/', FriendViews.respondFriendshipRequest, name="respond_friendship_request"),
    path('friends/show/', FriendViews.showFriends, name="show_current_user_friends"),
    path('friends/showRequests/', FriendViews.showFriendRequests, name="show_current_user_friend_requests"),
    path('friends/delete/<str:userId>/', FriendViews.deleteFriendship, name="delete_friendship"),
]