from .models import Address
from rest_framework import serializers

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields= ['id','name','address','city','pincode','state','mobile_number']

class UserAddressAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields= ['name','address','city','pincode','state','mobile_number']
