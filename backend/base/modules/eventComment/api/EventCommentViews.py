from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.modules.eventComment.api.validators import (
    CreateEventCommentValidator,
)
from base.modules.eventComment.api.actions import (
    ViewCommentFromEventAction, 
    CreateEventCommentAction,
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request, eventId):
    if (CreateEventCommentValidator.validate(request) != None):
        return CreateEventCommentValidator.validate(request)

    return CreateEventCommentAction.create(request, eventId)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEventComments(request, eventId):
    return ViewCommentFromEventAction.view(request, eventId)

