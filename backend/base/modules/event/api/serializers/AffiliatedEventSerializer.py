from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.modules.event.api.serializers.EventCategorySerializer import EventCategorySerializer
from base.traits import GetHumanTimeDifferenceToNow, EventDateToStringTime, CreateGravatarProfile
from base.enums import EventStatus, EventMemberStatus

from datetime import datetime
from django.utils import timezone

class AffiliatedEventSerializer(serializers.ModelSerializer):
    userName = serializers.SerializerMethodField(read_only=True)
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    eventDateString = serializers.SerializerMethodField(read_only=True)
    eventDate = serializers.SerializerMethodField(read_only=True)
    timeToEvent = serializers.SerializerMethodField(read_only=True)
    eventStatus = serializers.SerializerMethodField(read_only=True)
    eventTags = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)
    fullStatus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'userName', 'title', 'maxMember', 'details', 'createdAt', 'humanTimeDiffCreatedAt', 
        'eventDateString', 'eventDate', 'timeToEvent', 'eventStatus', 'eventTags', 'gravatarImage', 'fullStatus']

    def get_userName(self, obj):
        return obj.user.username

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_eventDateString(self, obj):
        return EventDateToStringTime.get(obj)
    
    def get_eventDate(self, obj):
        return datetime(obj.year, obj.month, obj.day, obj.hour, obj.minute)

    def get_timeToEvent(self, obj):
        if obj.status == None:
            currentTime = timezone.make_aware(datetime.now())
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
            currentTime = timezone.make_aware(datetime.now())
            if currentTime < obj.startDate:
                return EventStatus.get.PENDING.name
            else:
                return EventStatus.get.ONGOING.name

    def get_eventTags(self, obj):
        tags = EventCategory.objects.filter(event=obj)
        serializer = EventCategorySerializer(tags, many=True)

        return serializer.data

    def get_gravatarImage(self, obj):
        return CreateGravatarProfile.create(obj.user.email)
        
    def get_fullStatus(self, obj):
        if len(EventMember.objects.filter(eventId = obj.id, status = EventMemberStatus.get.ACCEPTED.value)) >= obj.maxMember:
            return True
        return False
    