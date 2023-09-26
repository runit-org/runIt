from rest_framework import serializers
from base.models import *
from base.traits import GetHumanTimeDifferenceToNow

class UserActivitySerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserActivity
        fields = ['id', 'userId', 'title', 'type', 'details', 'link', 'humanTimeDiffCreatedAt', 'createdAt']

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)
