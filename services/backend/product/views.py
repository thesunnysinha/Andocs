from django.shortcuts import render
from rest_framework.views import APIView
from account.renderers import UserRenderer
from product.models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status


class AllProductListView(APIView):
    renderer_classes = [UserRenderer]
    
    def get(self, request, format=None):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductListView(APIView):
    renderer_classes = [UserRenderer]
    
    def get(self, request,pk, format=None):
        if pk == "cosmetics":
            queryset = Product.objects.filter(category='C')
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif pk == "petproducts":
            queryset = Product.objects.filter(category='P')
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, id,format=None):
        product = Product.objects.get(id=id)
        related_product = Product.objects.filter(category = product.category).exclude(id = id)
        serializer = ProductSerializer(product)
        related_product_serializer = ProductSerializer(related_product,many=True)
        data = {
            'productDetail':serializer.data,
            'relatedProduct': related_product_serializer.data,
        }
        return Response(data,status=status.HTTP_200_OK)
