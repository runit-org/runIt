from django.urls import path
from base.modules.event.api import EventViews
from base.modules.notification.api import NotificationViews
from base.modules.user.api import UserViews
from base.modules.auth.api import AuthViews


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('auth/login/', AuthViews.MyTokenObtainPairView.as_view(), name='login'),
    path('auth/register/', AuthViews.registerUser, name='register'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', AuthViews.logout, name='logout'),
    path('auth/sendResetPasswordEmail/', AuthViews.sendResetPasswordEmail, name='send_reset_password_email'),

    path('user/all/', UserViews.getAllUsers, name='all_users'),

    path('event/all/', EventViews.allEvent, name="all_event"),
    path('event/create/', EventViews.createEvent, name="create_event"),
    path('event/view/<str:pk>/', EventViews.viewEvent, name="view_event"),
    path('event/update/<str:pk>/', EventViews.updateEvent, name="update_event"),
    path('event/delete/<str:pk>/', EventViews.deleteEvent, name="delete_event"),
    path('event/owned/', EventViews.ownedEvent, name="owned_event"),
    path('event/affiliated/', EventViews.participatedAndOwnedEvent, name='affiliated_event'),

    path('event/member/requestJoin/', EventViews.requestJoinEvent, name="request_join_event"),
    path('event/member/getMembers/<str:pk>/', EventViews.getEventMembers, name="get_event_members"),
    path('event/member/changeStatus/', EventViews.changeEventMemberStatus, name="approve_member_request"),

    path('notifications/all/', NotificationViews.index, name="user_notification"),
    path('notifications/read/<str:pk>/', NotificationViews.read, name="read_notification"),
    path('notifications/readAll/', NotificationViews.readAll, name="user_read_all_notification"),
]