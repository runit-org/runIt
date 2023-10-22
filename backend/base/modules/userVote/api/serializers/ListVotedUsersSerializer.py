from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *
from base.traits import CreateGravatarProfile
from base.enums import UserVoteStatus

def getAuthUserVoteOnThisUser(votedUserId, voterId):
    voteStatus = UserVote.objects.filter(votedUserId = votedUserId, voterId = voterId)

    if len(voteStatus) < 1:
        return 'NOT VOTED'
    else:
        return UserVoteStatus.get(voteStatus[0].status).name

class ListVotedUsersSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField(read_only=True)
    userId = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    email    = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)
    voteStatus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EventMember
        fields = ['id', 'userId', 'username', 'email', 'gravatarImage', 'voteStatus']

    def get_id(self, obj):
        user = User.objects.get(id = obj.votedUserId).id
        return user

    def get_userId(self, obj):
        user = User.objects.get(id = obj.votedUserId).id
        return user

    def get_username(self, obj):
        user = User.objects.get(id = obj.votedUserId).username
        return user

    def get_email(self, obj):
        user = User.objects.get(id = obj.votedUserId).email
        return user

    def get_gravatarImage(self, obj):
        user = User.objects.get(id = obj.votedUserId)
        return CreateGravatarProfile.create(user.email)

    def get_voteStatus(self, obj):
        authUserId = self.context.get('userId')
        return getAuthUserVoteOnThisUser(obj.votedUserId, authUserId)
