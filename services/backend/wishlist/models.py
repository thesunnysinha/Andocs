from django.db import models
from account.models import User
from product.models import Product

# Create your models here.
class Wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, null=True)
    products = models.ManyToManyField(Product, through='WishlistProduct')
    date_added = models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return str(self.id)

class WishlistProduct(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
