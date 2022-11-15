from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.traits import GetHumanTimeDifferenceToNow, CheckUserMemberEvent, EventDateToStringTime

from datetime import datetime

class EventSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    eventDateString = serializers.SerializerMethodField(read_only=True)
    eventDate = serializers.SerializerMethodField(read_only=True)
    joinedStatus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'userName', 'title', 'maxMember', 'details', 'createdAt', 'humanTimeDiffCreatedAt', 'eventDateString', 'eventDate', 'user', 'joinedStatus']

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_eventDateString(self, obj):
        return EventDateToStringTime.get(obj)
    
    def get_eventDate(self, obj):
        return datetime(obj.year, obj.month, obj.day, obj.hour, obj.minute)

    def get_joinedStatus(self, obj):
        if self.context.get('userId') != None:
            authUserId = self.context.get('userId')
            return CheckUserMemberEvent.get(obj.id, authUserId)
        else:
            return None
