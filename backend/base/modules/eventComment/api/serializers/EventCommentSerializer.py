from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import EventComment, EventCommentLike
from base.traits import GetHumanTimeDifferenceToNow, CreateGravatarProfile

from datetime import datetime

class EventCommentSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EventComment
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_username(self, obj):
        return obj.user.username

    def get_gravatarImage(self, obj):
        return CreateGravatarProfile.create(obj.user.email)