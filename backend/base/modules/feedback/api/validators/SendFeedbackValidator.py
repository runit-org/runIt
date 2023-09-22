from base.views.baseViews import validationError
from base.enums import Utils, FeedbackTypes, FeedbackCategories

def validate(request):
    data = request.data

    if data.get('details') == None or str(data['details']) == '' or data.get('type') == None or str(data['type']) or data.get('category') == None or str(data['category']):
        return validationError('Please provide the details field')
    
    if len(data['details']) > Utils.get.MAX_CONTENT_LENGTH.value:
        return validationError('Details is too long')
    
    if data['type'] not in [e.value for e in FeedbackTypes.get]:
        return validationError('Invalid feedback type')
    
    if data['category'] not in [e.value for e in FeedbackCategories.get]:
        return validationError('Invalid feedback category')

    return None