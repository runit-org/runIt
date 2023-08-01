from base.views.baseViews import validationError

def validate(request):

    data = request.data
    if data.get('eventId') == None:
        return validationError('Please provide an eventId')

    if data.get('userId') == None:
        return validationError('Please provide a user ID')

    if data.get('status') == None:
        return validationError('Please provide a status')

    if data['status'] != 1 and data['status'] != 2 and data['status'] != 3:
        return validationError('Invalid status code (1=accept, 2=reject, 3=delete)')

    return None