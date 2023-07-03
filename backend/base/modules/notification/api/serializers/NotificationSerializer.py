from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.enums import NotificationStatus
from base.traits import GetHumanTimeDifferenceToNow

class NotificationSerializer(serializers.ModelSerializer):
    statusName = serializers.SerializerMethodField(read_only=True)
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'details', 'statusName', 'userId', 'humanTimeDiffCreatedAt', 'link']
    
    def get_statusName(self, obj):
        return NotificationStatus.get(obj.status).name

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)
