from base.views.baseViews import validationError

def validate(request):
    data = request.data
    
    if data.get('message') == None:
        return validationError('Required fields not met')

    return None