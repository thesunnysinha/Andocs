from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from .models import Address
from .serializers import UserAddressAddSerializer,UserAddressSerializer

class UserAddressListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        queryset = Address.objects.filter(user=request.user)
        serializer = UserAddressSerializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class AddUserAddressView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        serializer = UserAddressAddSerializer(data=request.data)
        if serializer.is_valid():
            address = serializer.save(user=user)
            return Response(UserAddressSerializer(address).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteUserAddressView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        address_id =pk
        user = request.user
        try:
            address = Address.objects.get(id=address_id, user=user)
            address.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Address.DoesNotExist:
            return Response({"error": "Address not found for the user."}, status=status.HTTP_404_NOT_FOUND)

class EditUserAddressView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        address_id = pk
        user = request.user
        try:
            address = Address.objects.get(id=address_id, user=user)
        except Address.DoesNotExist:
            return Response({"error": "Address not found for the user."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserAddressAddSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(UserAddressSerializer(address).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
