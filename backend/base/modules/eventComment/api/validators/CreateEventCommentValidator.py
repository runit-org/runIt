from base.views.baseViews import validationError

def validate(request):
    data = request.data

    if data.get('content') == None:
        return validationError('Please provide the following field(s): content')

    if str(data['content']) == '' or str(data['content']).isspace() == True:
        return validationError('Content cannot be empty')

    return None