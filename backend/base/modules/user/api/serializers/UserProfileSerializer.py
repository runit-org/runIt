from rest_framework import serializers
from base.models import *
from base.enums import UserVoteStatus, FriendshipStatus
from base.traits import CreateGravatarProfile

from django.db.models import Q

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

def checkRequestExist(main, requester):
    checkRequestExist = FriendRequest.objects.filter(
        main = main,
        requester = requester
    )

    if len(checkRequestExist) > 0:
        return True
    else:
        return False

def checkAlreadyFriends(user1, user2):
    checkFriendshipExist = Friend.objects.filter(
        Q(user1=user1) | Q(user1=user2),
        Q(user2=user1) | Q(user2=user2)
        )
    
    if len(checkFriendshipExist) > 0:
        return True
    else:
        return False

def getAuthUserFriendshipStatusOnThisUser(targetUser, currentUser):
    if checkAlreadyFriends(targetUser, currentUser):
        return FriendshipStatus.get.FRIENDS.name
    if checkRequestExist(targetUser, currentUser):
        return FriendshipStatus.get.CURRENT_USER_REQUESTED.name
    if checkRequestExist(currentUser, targetUser):
        return FriendshipStatus.get.AWAITING_CURRENT_USER.name
    return FriendshipStatus.get.NO_REQUESTS.name
    
class UserProfileSerializer(serializers.ModelSerializer):
    totalVote = serializers.SerializerMethodField(read_only=True)
    voteStatus = serializers.SerializerMethodField(read_only=True)
    gravatarImage = serializers.SerializerMethodField(read_only=True)
    friendStatus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined', 'totalVote', 'voteStatus', 'gravatarImage', 'friendStatus']

    def get_totalVote(self, obj):
        return getUserTotalVotes(obj.id)

    def get_voteStatus(self, obj):
        authUserId = self.context.get('userId')
        return getAuthUserVoteOnThisUser(obj.id, authUserId)

    def get_gravatarImage(self, obj):
        return CreateGravatarProfile.create(obj.email)

    def get_friendStatus(self, obj):
        authUserId = self.context.get('userId')
        authUser = User.objects.get(id=authUserId)
        return getAuthUserFriendshipStatusOnThisUser(obj, authUser)
