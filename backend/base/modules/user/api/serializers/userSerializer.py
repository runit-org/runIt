from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.views.baseViews import getHumanTimeDifferenceToNow
from base.views.utils.enums import NotificationStatus, EventMemberStatus

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']