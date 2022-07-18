from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.views.baseViews import getHumanTimeDifferenceToNow
from base.views.utils.enums import NotificationStatus, EventMemberStatus

class NotificationSerializer(serializers.ModelSerializer):
    statusName = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'details', 'statusName']
    
    def get_statusName(self, obj):
        return NotificationStatus(obj.status).name