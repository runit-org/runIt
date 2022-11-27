from base.views.baseViews import validationError
from base.enums import EventStatus

def validate(request):
    data = request.data
    
    if data.get('status') == None:
        return validationError('Required fields not met')

    if data['status'] != EventStatus.get.FINISHED.value and data['status'] != EventStatus.get.CANCELLED.value:
        return validationError('Status must be either FINISHED (2) or CANCELLED (3)')

    return None