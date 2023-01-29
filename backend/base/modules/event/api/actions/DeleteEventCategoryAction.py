from base.models import EventCategory
from base.serializers import EventSerializer
from base.views.baseViews import response, error

def checkEventCategoryId(pk):
    checkEventCategoryExist = EventCategory.objects.filter(id = pk)

    if len(checkEventCategoryExist) > 0:
        return True
    else:
        return False

def delete(request, pk):
    data = request.data
    user = request.user

    if not checkEventCategoryId(pk):
        return error('Event category ID not found')

    eventCategory = EventCategory.objects.get(id=pk)

    if user.id != eventCategory.event.user.id:
        return error('Can only delete your own event tags')

    eventCategory.delete()

    return response('Event category deleted.')