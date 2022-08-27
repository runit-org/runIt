from base.views.baseViews import validationError
from base.enums import UserVoteStatus

def validate(request):
    data = request.data

    if data.get('status') == None:
        return validationError('Please provide a status')

    if data['status'] not in [e.value for e in UserVoteStatus.get]:
        return validationError('Invalid vote status')

    return None