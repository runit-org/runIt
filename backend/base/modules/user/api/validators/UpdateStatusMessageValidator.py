from base.views.baseViews import validationError

def validate(request):
    data = request.data
    
    if data.get('message') == None:
        return validationError('Required fields not met')

    if str(data['message']) == '' or str(data['message']).isspace() == True:
        return validationError('Message cannot be empty')

    return None