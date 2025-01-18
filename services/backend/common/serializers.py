from rest_framework import serializers
from .models import Carousel
from account.models import User
from account.renderers import UserRenderer
import math
from datetime import datetime


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = ('id', 'image1', 'image2', 'image3')