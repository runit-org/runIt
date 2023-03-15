from base.views.baseViews import validationError


def validate(request):

    data = request.data
    if data.get('eventId') == None:
        return validationError('Please provide an eventId')

    return None
