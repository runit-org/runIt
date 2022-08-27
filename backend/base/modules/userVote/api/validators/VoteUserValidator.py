from base.views.baseViews import validationError
from base.enums import UserVoteStatus

def validate(request):
    data = request.data

    if data.get('vote') == None:
        return validationError('Please provide a vote')

    if data['vote'] not in [e.value for e in UserVoteStatus.get]:
        return validationError('Invalid vote status')

    return None