from rest_framework import serializers
from .models import CartProduct
from product.models import Product
from cart.models import CartProduct
from account.models import User

class UserCartProductSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()
    product_title = serializers.SerializerMethodField()
    product_selling_price = serializers.SerializerMethodField()
    product_discounted_price = serializers.SerializerMethodField()
    product_total_price = serializers.SerializerMethodField()
    product_id = serializers.SerializerMethodField()
    
    class Meta:
        model = CartProduct
        fields = ['product', 'quantity', 'product_image', 'product_title','product_selling_price','product_discounted_price','product_total_price','product_id']

    def get_product_id(self,obj):
        return obj.product.id

    def get_product_image(self, obj):
        return obj.product.product_image.url
    
    def get_product_title(self, obj):
        return obj.product.title

    def get_product_selling_price(self,obj):
        return float(obj.product.selling_price)
    
    def get_product_discounted_price(self,obj):
        return float(obj.product.discounted_price)

    def get_product_total_price(self,obj):
        return float(obj.product.discounted_price * obj.quantity)

class AddProductToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
    
class UpdateProductToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    update_type = serializers.ChoiceField(choices=[0, 1])
    
class DeleteProductToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()