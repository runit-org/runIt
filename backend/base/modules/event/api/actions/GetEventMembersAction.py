from base.models import Event, EventMember
from base.serializers import EventSerializer, EventMemberSerializer
from base.views.baseViews import response, error

from django.db.models import Q
from itertools import chain

def checkEventId(pk):
    checkEventExist = Event.objects.filter(id = pk)

    if len(checkEventExist) > 0:
        return True
    else:
        return False

def getMembers(request, pk):
    user = request.user

    if not checkEventId(pk):
        return error('Event ID not found')

    event = Event.objects.get(id=pk)
    eventMember = EventMember.objects.filter(eventId = pk)

    owner = EventMember(
        id = int(EventMember.objects.latest('id').id) + 1,
        eventId = pk,
        userId = event.user.id,
        event = event,
        user = event.user,
        status = 'OWNER'
    )


    ownerList = [owner]

    combinedQuery = list(chain(eventMember, ownerList))

    serializer = EventMemberSerializer(combinedQuery, many=True)

    return response('Members of event retrieved', serializer.data)








    # # Create a queryset for the owner and combine it with the original eventMember queryset
    # owner_queryset = EventMember.objects.filter(Q(id=owner.id) | Q(pk__isnull=True))
    # eventMember = eventMember.union(owner_queryset)

    # serializer = EventMemberSerializer(eventMember, many=True)

    # return response('Members of event retrieved', serializer.data)







    # eventMember = eventMember.union()

    # serializer = EventMemberSerializer(eventMember, many=True)

    # return response('Members of event retrieved', serializer.data)