from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import User, FriendRequest
from base.traits import GetHumanTimeDifferenceToNow, CreateGravatarProfile

from datetime import datetime

class FriendRequestsSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    requesterUsername = serializers.SerializerMethodField(read_only=True)
    requesterEmail = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FriendRequest
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_requesterUsername(self, obj):
        return obj.requester.username
    
    def get_requesterEmail(self, obj):
        return obj.requester.email
