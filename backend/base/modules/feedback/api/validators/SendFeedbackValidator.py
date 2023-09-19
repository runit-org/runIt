from base.views.baseViews import validationError
from base.enums import Utils

def validate(request):
    data = request.data

    if data.get('details') == None or str(data['details']) == '':
        return validationError('Please provide the details field')
    
    if len(data['details']) > Utils.get.MAX_CONTENT_LENGTH.value:
        return validationError('Details is too long')

    return None