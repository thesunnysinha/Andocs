from django.shortcuts import render
from .models import CartProduct
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from .serializers import UserCartProductSerializer,AddProductToCartSerializer,UpdateProductToCartSerializer,DeleteProductToCartSerializer

class UserCartListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    def get(self,request,format=None):
        cart_products = CartProduct.objects.filter(user=request.user)
        product_serializer = UserCartProductSerializer(cart_products, many=True)
        
        total_quantity = sum(item['quantity'] for item in product_serializer.data)
        total_price = sum(item['product_total_price'] for item in product_serializer.data)
    
        data = {
            'products': product_serializer.data,
            'total_quantity': total_quantity,
            'total_price': round(float(total_price), 2)
        }
        return Response(data,status=status.HTTP_200_OK)

class AddProductToCartView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, id, format=None):
        product_id = id
        try:
            quantity = request.data["quantity"]
        except KeyError:
            quantity = 1

        data = {'product_id': product_id, 'user_id': request.user.id, 'quantity': quantity}

        serializer = AddProductToCartSerializer(data=data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']

            user_id = serializer.validated_data['user_id']

            quantity = serializer.validated_data['quantity']

            cart_product, created = CartProduct.objects.get_or_create(user_id=user_id, product_id=product_id)

            if not created:
                cart_product.quantity += quantity
            else:
                cart_product.quantity = quantity

            cart_product.save()
            
            return Response({"message": "Product added to cart successfully"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateProductQuantityView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, id, qk, format=None):
        product_id = id
        user_id = request.user.id
        update_type = qk

        data = {"product_id": product_id, "user_id": user_id, "update_type": update_type}
        serializer = UpdateProductToCartSerializer(data=data)

        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            user_id = serializer.validated_data['user_id']
            update_type = serializer.validated_data['update_type']

            try:
                cart_product = CartProduct.objects.get(product_id=product_id, user_id=user_id)
            except CartProduct.DoesNotExist:
                return Response({"error": "CartProduct not found"}, status=status.HTTP_404_NOT_FOUND)

            if update_type == 1:
                cart_product.quantity += 1
            elif update_type == 0:
                if cart_product.quantity > 1:
                    cart_product.quantity -= 1
                else:
                    cart_product.delete()
                    return Response({"message": "Product removed from cart"}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"error": "Invalid value for update_type. Accepted values are 0 and 1."},
                                status=status.HTTP_400_BAD_REQUEST)

            cart_product.save()
            return Response({"message": "Product quantity updated successfully"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid input data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DeleteProductFromCartView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        product_id = pk
        user_id = request.user.id

        data = {"product_id": product_id, "user_id": user_id}

        serializer = DeleteProductToCartSerializer(data=data)

        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            user_id = serializer.validated_data['user_id']

            try:
                cart_product = CartProduct.objects.get(product_id=product_id, user_id=user_id)
            except CartProduct.DoesNotExist:
                return Response({"error": "CartProduct not found"}, status=status.HTTP_404_NOT_FOUND)

            cart_product.delete()
            return Response({"message": "Product removed from cart successfully"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"error": "Invalid input data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)