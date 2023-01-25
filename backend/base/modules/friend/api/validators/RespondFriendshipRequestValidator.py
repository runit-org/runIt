from base.views.baseViews import validationError
from base.enums import UserVoteStatus

def validate(request):
    data = request.data

    if data.get('respond') == None:
        return validationError('Please provide a respond')

    if data['respond'] != 1 and data['respond'] != 0:
        return validationError('Invalid respond (1/0)')

    return None