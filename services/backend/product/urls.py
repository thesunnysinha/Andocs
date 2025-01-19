from .views import ProductView
from django.urls import path

urlpatterns = [
    path('products', ProductView.as_view(), name='all_products'),
    path('product/<int:id>/', ProductView.as_view(), name='product-detail'),
]