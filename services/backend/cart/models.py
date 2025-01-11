from django.db import models
from account.models import User
from product.models import Product

class CartProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.RESTRICT, null=False,blank=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return str(self.id)
