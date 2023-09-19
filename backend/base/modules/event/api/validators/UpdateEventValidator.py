from base.views.baseViews import validationError
from base.enums import Utils

def validate(request):
    data = request.data
    
    if data.get('title') == None or data.get('maxMember') == None or data.get('details') == None:
        return validationError('Required fields not met')

    if str(data['title']) == '' or str(data['title']).isspace() == True:
        return validationError('Title cannot be empty')
    
    if len(data['title']) > Utils.get.MAX_TITLE_LENGTH.value:
        return validationError('Title is too long')
    
    if len(data['details']) > Utils.get.MAX_CONTENT_LENGTH.value:
        return validationError('Details is too long')

    if  isinstance(data['maxMember'], int) == False:
        return validationError('Max member must be integer')
    
    if data['maxMember'] < 2:
        return validationError('Max member must be more than 1')

    return None