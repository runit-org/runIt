from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.enums import NotificationStatus

class NotificationSerializer(serializers.ModelSerializer):
    statusName = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'details', 'statusName']
    
    def get_statusName(self, obj):
        return NotificationStatus.NotificationStatus(obj.status).name