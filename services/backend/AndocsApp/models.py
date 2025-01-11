from django.db import models
from account.models import User
from django.core.validators import MaxValueValidator,MinValueValidator
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db import models


class Carousel(models.Model):
    slider = models.ImageField(upload_to='carousel/')
    caption = models.CharField(max_length = 50,null=True)






# class Cart(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, null=True)
#     cart_products = models.ManyToManyField(Product, through='CartProduct')
#     date_added = models.DateTimeField(auto_now_add=True,blank=True)

#     def __str__(self):
#         return str(self.id)




class UserOtp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time_st = models.DateTimeField(auto_now=True)
    otp = models.IntegerField()





class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=50)
    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


