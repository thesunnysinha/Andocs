from django.db import models
from account.models import User

STATE_CHOICES = (
    ('Andaman & Nicobar Islands','Andaman & Nicobar Islands'),
    ('Andhra Pradesh','Andhra Pradesh',),
    ('Arunachal Pradesh','Arunachal Pradesh',), 
    ('Assam','Assam'), 
    ('Bihar','Bihar'),
    ('Chandigarh','Chandigarh',),
    ('Chhattisgarh','Chhattisgarh'),
    ('Dadra & Nagar Haveli','Dadra & Nagar Haveli'),
    ('Daman & Diu','Daman & Diu'),
    ('Delhi','Delhi'),  
    ('Goa','Goa'), 
    ('Gujarat','Gujarat'), 
    ('Haryana','Haryana'),
    ('Himachal Pradesh','Himachal Pradesh'), 
    ('Jammu & Kashmir','Jammu & Kashmir'),
    ('Jharkhand','Jharkhand'), 
    ('Karnataka','Karnataka'), 
    ('Kerala','Kerala'),
    ('Ladakh','Ladakh'),
    ('Lakshadweep','Lakshadweep'), 
    ('Madhya Pradesh','Madhya Pradesh'), 
    ('Maharashtra','Maharashtra'),
    ('Manipur','Manipur'),
    ('Meghalaya','Meghalaya'),
    ('Mizoram','Mizoram'),
    ('Nagaland','Nagaland'),
    ('Orissa','Orissa'),
    ('Puducherry','Puducherry'),
    ('Punjab','Punjab'),
    ('Rajasthan','Rajasthan'),
    ('Sikkim','Sikkim'),
    ('Tamil Nadu','Tamil Nadu'),
    ('Tripura','Tripura'),
    ('Uttar Pradesh','Uttar Pradesh'),
    ('Uttarakhand','Uttarakhand'),
    ('West Bengal','West Bengal'),
    ('Telangana','Telangana'),
)

class Address(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=50)
    pincode = models.IntegerField()
    state = models.CharField(choices=STATE_CHOICES,max_length=50)
    mobile_number = models.CharField(max_length=10)

    def __str__(self):
        return str(self.id)