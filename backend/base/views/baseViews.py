from rest_framework.response import Response
from rest_framework import status
from base.models import *
import datetime
from django.utils.timezone import utc
from rest_framework.pagination import PageNumberPagination


def response(message, data=None):
    retVal = {'success' : 'true', 'message': message, 'data' : data}
    return Response(retVal)

def error(message, info=None):
    retVal = {'success' : 'false', 'message' : message, 'info': info}
    return Response(retVal, status = status.HTTP_400_BAD_REQUEST)

def validationError(message='Required fields not met', info=None):
    retVal = {'success' : 'false', 'message' : message, 'info' : info}
    return Response(retVal, status = status.HTTP_422_UNPROCESSABLE_ENTITY)

def paginate(request, objects, objectSerializer, paginationSize, context=None):
    paginator = PageNumberPagination()
    paginator.page_size = paginationSize
    resultpage = paginator.paginate_queryset(objects, request)
    serializer = objectSerializer(resultpage, context=context, many=True)
    return paginator.get_paginated_response(serializer.data)