from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Wishlist,WishlistProduct
from .serializers import UserWishlistProductSerializer,AddProductToWishlistSerializer
class UserWishlistListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        queryset = Wishlist.objects.filter(user=request.user)
        products = WishlistProduct.objects.filter(wishlist__in=queryset)
        product_serializer = UserWishlistProductSerializer(products, many=True)
        count = 0
        for item in product_serializer.data:
            count+=1
        data = {
            'products': product_serializer.data,
            'wishlist_total_quantity': count,
        }
        return Response(data,status=status.HTTP_200_OK)

class AddProductToWishlistView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request,pk, format=None):
        product_id = pk
        serializer = AddProductToWishlistSerializer(data={'product': product_id}, context={'request': request})
        if serializer.is_valid():
            wishlist_product = serializer.save()
            data = UserWishlistProductSerializer(wishlist_product).data
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteProductFromWishlistView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def delete(self, request,pk, format=None):
        product_id = pk
        wishlist_product = get_object_or_404(WishlistProduct, product=product_id, wishlist__user=request.user)
        wishlist_product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
