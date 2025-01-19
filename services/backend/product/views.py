from rest_framework.views import APIView
from product.models import Product, CATEGORY_CHOICES
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

class ProductView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, id=None):
        if id:
            try:
                product = Product.objects.get(id=id)
                related_product = Product.objects.filter(category=product.category).exclude(id=id)
                serializer = ProductSerializer(product)
                related_product_serializer = ProductSerializer(related_product, many=True)
                data = {
                    'productDetail': serializer.data,
                    'relatedProduct': related_product_serializer.data,
                }
                return Response(data, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            category = request.query_params.get('category', None)
            
            if not category or category == 'all':
                queryset = Product.objects.all()
            else:
                queryset = Product.objects.filter(category=category)
                
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)