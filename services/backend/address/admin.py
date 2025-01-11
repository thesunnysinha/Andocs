from django.contrib import admin
from .models import Address

@admin.register(Address)
class AddressModelAdmin(admin.ModelAdmin):
        list_display = [
                'user','name','address','city','pincode','state','mobile_number'
        ]
        search_fields = ['user__email', 'pincode']
