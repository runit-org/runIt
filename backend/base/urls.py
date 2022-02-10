from django.urls import path
from base.views import eventViews, userViews

urlpatterns = [

    path('auth/login/', userViews.MyTokenObtainPairView.as_view(), name='login'),
    path('auth/register/', userViews.registerUser, name='register'),

    path('user/all/', userViews.getAllUsers, name='all_users'),

    path('event/all/', eventViews.allEvent, name="all_event"),
    path('event/create/', eventViews.createEvent, name="create_event"),
    path('event/view/<str:pk>/', eventViews.viewEvent, name="view_event"),
    path('event/update/<str:pk>/', eventViews.updateEvent, name="update_event"),
    path('event/delete/<str:pk>/', eventViews.deleteEvent, name="delete_event"),
]