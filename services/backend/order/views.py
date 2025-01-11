from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from .models import Order,OrderProduct
from .serializers import OrderSerializer,OrderProductSerializer,CreateOrderSerializer
from cart.models import CartProduct

class UserOrdersListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserOrderDetailListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request,pk, format=None):
        products = OrderProduct.objects.filter(order_id=pk)
        serializer = OrderProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateOrderAPIView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        cart_product = CartProduct.objects.filter(cart=request.user.cart)
        products =[]
        for product in cart_product:
            products.append(product.product.id)
        request.data['products'] = products
        serializer = CreateOrderSerializer(data=request.data, context={'request': request, 'user': request.user})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

