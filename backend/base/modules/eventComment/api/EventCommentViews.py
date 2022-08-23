from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from base.modules.eventComment.api.validators import (
#     CreateEventCommentValidator
# )
from base.modules.eventComment.api.actions import (
    ViewCommentFromEventAction, 
)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createEvent(request):
#     if (CreateEventValidator.validate(request) != None):
#         return CreateEventValidator.validate(request)
    
#     return CreateEventAction.create(request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEventComments(request, eventId):
    return ViewCommentFromEventAction.view(request, eventId)

