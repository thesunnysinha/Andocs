from product.models import Product
from rest_framework import serializers
import math

class ProductSerializer(serializers.ModelSerializer):
    discount_percent = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id','title','description','selling_price','discounted_price','brand','category_name','product_image','discount_percent','average_rating']

    def get_discount_percent(self,obj):
        return math.ceil(((obj.selling_price-obj.discounted_price) / obj.selling_price) *100)

    def get_category_name(self,obj):
        
        if obj.category == "P":
            return "Pet Products"
        else:
            return "Cosmetics"