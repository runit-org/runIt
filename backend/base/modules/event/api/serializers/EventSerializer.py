from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.traits import GetHumanTimeDifferenceToNow, CheckUserMemberEvent, EventDateToStringTime, CreateGravatarProfile
from base.enums import EventStatus

from datetime import datetime
from django.utils.timezone import utc

class EventSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    eventDateString = serializers.SerializerMethodField(read_only=True)
    eventDate = serializers.SerializerMethodField(read_only=True)
    joinedStatus = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)
    timeToEvent = serializers.SerializerMethodField(read_only=True)
    eventStatus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'userName', 'title', 'maxMember', 'details', 'createdAt', 'humanTimeDiffCreatedAt', 'eventDateString', 'eventDate', 'user', 'joinedStatus', 'gravatarImage', 'timeToEvent', 'eventStatus']

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

    def get_gravatarImage(self, obj):
        return CreateGravatarProfile.create(obj.user.email)

    def get_timeToEvent(self, obj):
        if obj.status == None:
            currentTime = datetime.utcnow().replace(tzinfo=utc)
            if currentTime < obj.startDate:
                return GetHumanTimeDifferenceToNow.get(obj.startDate)
            else:
                return '-'
        else:
            return '-'
    
    def get_eventStatus(self, obj):
        if obj.status != None:
            return EventStatus.get(obj.status).name
        else:
            currentTime = datetime.utcnow().replace(tzinfo=utc)
            if currentTime < obj.startDate:
                return EventStatus.get.PENDING.name
            else:
                return EventStatus.get.ONGOING.name


    
