from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import EventComment
from base.traits import GetHumanTimeDifferenceToNow

from datetime import datetime

class EventCommentSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EventComment
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)
