from rest_framework import serializers
from .models import WishlistProduct,Wishlist
from product.models import Product

class UserWishlistProductSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()
    product_title = serializers.SerializerMethodField()
    product_selling_price = serializers.SerializerMethodField()
    product_discounted_price = serializers.SerializerMethodField()
    product_id = serializers.SerializerMethodField()
    
    class Meta:
        model = WishlistProduct
        fields = ['product', 'product_image', 'product_title','product_selling_price','product_discounted_price','product_id']

    def get_product_image(self, obj):
        return obj.product.product_image.url
    
    def get_product_title(self, obj):
        return obj.product.title
    def get_product_selling_price(self,obj):
        return obj.product.selling_price
    
    def get_product_discounted_price(self,obj):
        return obj.product.discounted_price

    def get_product_id(self,obj):
        return obj.product.id
    


class AddProductToWishlistSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)

    def create(self, validated_data):
        product = Product.objects.get(id=validated_data['product'])
        wishlist, created = Wishlist.objects.get_or_create(user=self.context['request'].user)
        wishlist_product, created = WishlistProduct.objects.get_or_create(wishlist=wishlist, product=product)
        if not created:
            wishlist_product.quantity += validated_data['quantity']
        else:
            wishlist_product.quantity = validated_data['quantity']
        wishlist_product.save()
        return wishlist_product

class UserWishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id','product','quantity','date_added']
