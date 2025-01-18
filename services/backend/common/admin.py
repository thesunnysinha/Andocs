from django.contrib import admin
from .models import *    



@admin.register(UserOtp)
class UserOtpModelView(admin.ModelAdmin):
        list_display = [
                'user','time_st','otp',
        ]


@admin.register(Carousel)
class CarouselAdmin(admin.ModelAdmin):
    list_display = [
        'id','slider','caption'
    ]


    

