from django.db import models
from product.models import Product
from account.models import User

class Comment(models.Model):
    STATUS = {
        ('N','New'),
        ('T','True'),
        ('F','False'),
    }
    RATINGS = {
        (1,'1'),
        (2,'2'),
        (3,'3'),
        (4,'4'),
        (5,'5'),
    }
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="review_set")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    subject = models.CharField(max_length=50)
    comment = models.CharField(max_length=250)
    rating = models.IntegerField(choices=RATINGS,default="1")
    ip = models.CharField(max_length=20,blank=True)
    status = models.CharField(max_length=10,choices=STATUS,default='New')
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subject
