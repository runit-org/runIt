from django.urls import path
from base.views import eventViews, userViews, notificationViews
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('auth/login/', userViews.MyTokenObtainPairView.as_view(), name='login'),
    path('auth/register/', userViews.registerUser, name='register'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', userViews.logout, name='token_refresh'),

    path('user/all/', userViews.getAllUsers, name='all_users'),

    path('event/all/', eventViews.allEvent, name="all_event"),
    path('event/create/', eventViews.createEvent, name="create_event"),
    path('event/view/<str:pk>/', eventViews.viewEvent, name="view_event"),
    path('event/update/<str:pk>/', eventViews.updateEvent, name="update_event"),
    path('event/delete/<str:pk>/', eventViews.deleteEvent, name="delete_event"),

    path('event/member/requestJoin/', eventViews.requestJoinEvent, name="request_join_event"),
    path('event/member/getMembers/<str:pk>/', eventViews.getEventMembers, name="get_event_members"),
    path('event/member/changeStatus/', eventViews.changeEventMemberStatus, name="approve_member_request"),

    path('notifications/all/', notificationViews.index, name="user_notification"),
]