from base.views.baseViews import validationError

def validate(request):
    data = request.data
    if data.get('refresh') == None:
        return validationError('Please provide the refresh token :)') 

    return None