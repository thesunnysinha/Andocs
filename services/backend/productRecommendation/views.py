from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer

from rest_framework.permissions import IsAuthenticated

from product.models import Product
from product.serializers import ProductSerializer
from .tasks import executeProductRecommendation
from celery.result import AsyncResult

class ProductRecommendationView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user_id = request.user.id
        username = request.user.username

        task = executeProductRecommendation.delay(user_id, username)

        task_result = AsyncResult(task.id)

        try:
            task_result.wait()
            if task_result.successful():
                other_users_reviews_product_ids = task_result.get()
                product_list = sorted(
                    list(Product.objects.filter(id__in=other_users_reviews_product_ids)),
                    key=lambda x: x.average_rating(),
                    reverse=True
                )

                serializer = ProductSerializer(product_list, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Task execution failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)