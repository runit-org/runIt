from rest_framework import serializers
from base.models import *
from base.enums import UserVoteStatus

def getUserTotalVotes(userId):
    findUserVotes = UserVote.objects.filter(votedUserId = userId)

    totalVotes = 0

    for i in findUserVotes:
        totalVotes += i.status
    
    return totalVotes

def getAuthUserVoteOnThisUser(votedUserId, voterId):
    voteStatus = UserVote.objects.filter(votedUserId = votedUserId, voterId = voterId)

    if len(voteStatus) < 1:
        return 'NOT VOTED'
    else:
        return UserVoteStatus.get(voteStatus[0].status).name

class UserProfileSerializer(serializers.ModelSerializer):
    totalVote = serializers.SerializerMethodField(read_only=True)
    voteStatus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'totalVote', 'voteStatus']

    def get_totalVote(self, obj):
        return getUserTotalVotes(obj.id)

    def get_voteStatus(self, obj):
        authUserId = self.context.get('userId')
        return getAuthUserVoteOnThisUser(obj.id, authUserId)
        

