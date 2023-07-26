from base.views.baseViews import validationError

def validate(request):
    data = request.data
    
    if data.get('title') == None or data.get('maxMember') == None or data.get('details') == None:
        return validationError('Required fields not met')

    if str(data['title']) == '' or str(data['title']).isspace() == True:
        return validationError('Title cannot be empty')
    
    if len(data['title']) > 100:
        return validationError('Title is too long (100 chars max)')

    if  isinstance(data['maxMember'], int) == False:
        return validationError('Max member must be integer')
    
    if data['maxMember'] < 2:
        return validationError('Max member must be more than 1')

    return None