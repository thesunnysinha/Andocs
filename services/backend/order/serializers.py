from rest_framework import serializers
from .models import OrderProduct,Order
from product.models import Product
from cart.models import CartProduct
from rest_framework.serializers import ValidationError

class OrderProductSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()
    product_title = serializers.SerializerMethodField()
    product_selling_price = serializers.SerializerMethodField()
    product_discounted_price = serializers.SerializerMethodField()
    product_total_price = serializers.SerializerMethodField()
    class Meta:
        model = OrderProduct
        fields = ('id','quantity','order','product_id','product_title','product_selling_price','product_discounted_price', 'product_image','product_total_price')
    
    def get_product_image(self, obj):
        return obj.product_id.product_image.url
    
    def get_product_title(self, obj):
        return obj.product_id.title

    def get_product_selling_price(self,obj):
        return obj.product_id.selling_price
    
    def get_product_discounted_price(self,obj):
        return obj.product_id.discounted_price

    def get_product_total_price(self,obj):
        return obj.product_id.discounted_price * obj.quantity

class OrderSerializer(serializers.ModelSerializer):
    address_name = serializers.SerializerMethodField()
    address_pincode = serializers.SerializerMethodField()
    address_city = serializers.SerializerMethodField()
    address_state = serializers.SerializerMethodField()
    address_address = serializers.SerializerMethodField()
    address_mobile_number = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ('id','user','address', 'status','products', 'payment_method', 'payment_status', 'date_added', 'total_amount','transaction_id',
                'address_name','address_pincode','address_city','address_state','address_address','address_mobile_number',
        )

    def get_address_name(self, obj):
        return obj.address.name

    def get_address_pincode(self, obj):
        return obj.address.pincode
    
    def get_address_city(self, obj):
        return obj.address.city
    
    def get_address_state(self, obj):
        return obj.address.state
    
    def get_address_address(self, obj):
        return obj.address.address

    def get_address_mobile_number(self, obj):
        return obj.address.mobile_number


class CreateOrderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Product.objects.all())

    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'status', 'payment_method', 'payment_status', 'date_added', 'total_amount', 'transaction_id', 'products']

    def validate(self, data):
        user = data.get('user')
        address = data.get('address')
        if address.user != user:
            raise serializers.ValidationError("Address does not belong to the user.")
        return data

    def create(self, validated_data):
        user = validated_data['user']
        cart = user.cart
        address = validated_data['address']
        payment_method = validated_data['payment_method']
        payment_status = validated_data['payment_status']
        status = validated_data['status']
        products = validated_data.pop('products')

        total_amount = 0

        for product in products:
            cart_product = CartProduct.objects.get(cart=cart, product=product)
            total_amount += cart_product.quantity * product.discounted_price

        if total_amount != validated_data['total_amount']:
            # If the calculated total amount does not match the incoming value,
            # raise a validation error with the correct total amount
            raise ValidationError({'total_amount': f'Total amount should be {total_amount}.'})

        order = Order.objects.create(user=user, address=address, total_amount=total_amount, status=status, payment_method=payment_method, payment_status=payment_status)

        for product in products:
            cart_product = CartProduct.objects.get(cart=cart, product=product)
            OrderProduct.objects.create(order=order, product_id=product, quantity=cart_product.quantity)

        cart.products.set([])

        return order
