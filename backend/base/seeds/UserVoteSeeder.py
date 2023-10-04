from base.models import UserVote
from base.enums import UserVoteStatus

def create_seed_data():
    create_votes_for_one_user(1, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(2, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(3, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(4, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(5, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(6, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(7, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(8, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(9, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(10, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(11, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(12, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(13, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(14, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(15, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(16, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(17, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(18, UserVoteStatus.get.UPVOTE.value)
    create_votes_for_one_user(19, UserVoteStatus.get.UPVOTE.value)

    print('User Votes seeded successfully')

def create_votes_for_one_user(targetUserId, voteStatus):
    for i in range(1, 18):
        if i != targetUserId:
            create_individual_vote(i, targetUserId, voteStatus)

def create_individual_vote(voterUserId, targetUserId, voteStatus):
    UserVote.objects.create(voterId=voterUserId, votedUserId=targetUserId, status=voteStatus)
