from base.views.baseViews import validationError
from base.enums import Utils

def validate(request):
    data = request.data

    if data.get('content') == None:
        return validationError('Please provide the following field(s): content')

    if str(data['content']) == '' or str(data['content']).isspace() == True:
        return validationError('Content cannot be empty')
    
    if len(data['content']) > Utils.get.MAX_CONTENT_LENGTH.value:
        return validationError('Content too long: ' + Utils.get.MAX_CONTENT_LENGTH.value)

    return None