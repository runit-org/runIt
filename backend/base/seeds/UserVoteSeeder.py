from base.models import User, UserVote
from base.enums import UserVoteStatus
from django.contrib.auth.hashers import make_password

def create_seed_data():
    create_votes_for_one_user(1, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(2, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(3, UserVoteStatus.get.DOWNVOTE.value)
    create_votes_for_one_user(4, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(5, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(6, UserVoteStatus.get.DOWNVOTE.value)
    create_votes_for_one_user(7, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(8, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(9, UserVoteStatus.get.DOWNVOTE.value)
    create_votes_for_one_user(10, UserVoteStatus.get.UPVOTE.value)

    print('User Votes seeded successfully')

def create_votes_for_one_user(targetUserId, voteStatus):
    for i in range(1, 6):
        if i != targetUserId:
            create_individual_vote(i, targetUserId, voteStatus)


def create_individual_vote(voterUserId, targetUserId, voteStatus):
    UserVote.objects.create(voterId=voterUserId, votedUserId=targetUserId, status=voteStatus)
