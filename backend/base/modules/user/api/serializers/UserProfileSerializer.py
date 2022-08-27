from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import *

def getUserTotalVotes(userId):
    findUserVotes = UserVote.objects.filter(votedUserId = userId)

    totalVotes = 0

    for i in findUserVotes:
        totalVotes += i.status
    
    return totalVotes

class UserProfileSerializer(serializers.ModelSerializer):
    totalVote = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'totalVote']

    def get_totalVote(self, obj):
        return getUserTotalVotes(obj.id)
