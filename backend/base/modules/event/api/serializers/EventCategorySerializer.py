from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.traits import GetHumanTimeDifferenceToNow, CheckUserMemberEvent, EventDateToStringTime, CreateGravatarProfile
from base.enums import EventStatus

from datetime import datetime
from django.utils import timezone

class EventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = ['id', 'event', 'tag']

    
