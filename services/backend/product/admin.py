from django.contrib import admin
from .models import Product
# Register your models here.


@admin.register(Product)
class ProductModelAdmin(admin.ModelAdmin):
    list_display = [
            'id','title','selling_price','discounted_price','brand','category','sub_category','average_rating'
    ]
    list_filter = ['category']