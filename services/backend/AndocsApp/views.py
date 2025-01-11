from django.shortcuts import render,get_object_or_404
from .serializers import *
from .models import *

# from django.contrib.auth import get_user_model
# User = get_user_model()

from account.models import User

from django.contrib.auth import authenticate, login

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import serializers


class CarouselListView(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, format=None):
        queryset = Carousel.objects.all()
        serializer = CarouselSerializer(queryset,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
