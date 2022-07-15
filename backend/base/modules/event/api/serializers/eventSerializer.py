from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.views.baseViews import getHumanTimeDifferenceToNow
from base.views.utils.enums import NotificationStatus, EventMemberStatus

class EventSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return getHumanTimeDifferenceToNow(obj.createdAt)