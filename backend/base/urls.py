from django.urls import path
from base.views import eventViews, userViews

urlpatterns = [
    path('hello/', eventViews.hello, name="hello"),

    path('auth/login/', userViews.MyTokenObtainPairView.as_view(), name='login'),
    path('auth/register/', userViews.registerUser, name='register'),

    path('user/all/', userViews.getAllUsers, name='all_users'),
]