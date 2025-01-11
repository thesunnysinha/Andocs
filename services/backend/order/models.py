from django.db import models
import uuid
from product.models import Product
from account.models import User
from address.models import Address
from django.core.exceptions import ValidationError

STATUS_CHOICES = [
    ('Accepted','Accepted'),
    ('Packed','Packed'),
    ('On The Way','On The Way'),
    ('Delivered','Delivered'),
    ('Cancel','Cancel')
]

PAYMENT_METHOD_CHOICES = [    
    ('Credit Card', 'Credit Card'),    
    ('Debit Card', 'Debit Card'),    
    ('UPI', 'UPI'),
    ]

PAYMENT_STATUS_CHOICES = [   
    ('Pending', 'Pending'),    
    ('Success', 'Success'),    
    ('Failed', 'Failed'),  
    ]

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderProduct')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Accepted')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='Pending')
    date_added = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False)

    def clean(self):
        if self.address.user != self.user:
            raise ValidationError("Address does not belong to the user.")

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
