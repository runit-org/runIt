from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import EventComment, EventCommentLike
from base.traits import GetHumanTimeDifferenceToNow

from datetime import datetime

def checkCommentLikeExist(comment, user):
    if len(EventCommentLike.objects.filter(eventComment=comment, user=user)) > 0:
        return True
    return False

class AllEventCommentSerializer(serializers.ModelSerializer):
    humanTimeDiffCreatedAt = serializers.SerializerMethodField(read_only=True)
    likeStatus = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EventComment
        fields = '__all__'

    def get_humanTimeDiffCreatedAt(self, obj):
        return GetHumanTimeDifferenceToNow.get(obj.createdAt)

    def get_likeStatus(self, obj):
        authUserId = self.context.get('userId')
        user = User.objects.get(id=authUserId)
        return checkCommentLikeExist(obj, user)

    def get_username(self, obj):
        return obj.user.username
