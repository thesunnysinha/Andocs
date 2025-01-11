from django.db import models
import numpy as np

CATEGORY_CHOICES = (
    ('C','Cosmetics'),
    ('P','Pet Products')
)

SUBCATEGORY_CHOICES = (
    ("FW",'Face Wash'),
    ("PU","Pet Utensils"),
    ("N","None"),
)

class Product(models.Model):
    title = models.CharField(max_length=100)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=500)
    brand = models.CharField(max_length=100)
    category = models.CharField(choices=CATEGORY_CHOICES,max_length=1)
    sub_category = models.CharField(choices=SUBCATEGORY_CHOICES,max_length=2)
    product_image = models.ImageField(upload_to='productimg')

    def average_rating(self):
        all_ratings = list(map(lambda x: x.rating, self.review_set.all()))
        if all_ratings:
            return np.mean(all_ratings)
        else:
            return 0

    def __str__(self):
        return str(self.id)