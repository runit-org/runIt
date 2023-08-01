from base.models import User, UserVote
from base.views.baseViews import response, error, paginate
from base.serializers import ListVotedUsersSerializer
from base.enums import PaginationSizes, UserVoteStatus

def get(request):
    data = request.data
    user = request.user

    votedUsers = UserVote.objects.filter(voterId=user.id, status=UserVoteStatus.get.UPVOTE.value).order_by('-createdAt')

    context = {'userId' : request.user.id}
    return paginate(request, votedUsers, ListVotedUsersSerializer, PaginationSizes.get.S.value, context)
