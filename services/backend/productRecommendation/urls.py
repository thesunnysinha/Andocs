from django.urls import path
from .views import ProductRecommendationView

urlpatterns = [
    path('product_recommendation/', ProductRecommendationView.as_view(), name='product-recommendation'),
]
