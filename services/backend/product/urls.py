from .views import ProductListView,ProductDetailView,AllProductListView
from django.urls import path

urlpatterns = [
    path('products/', AllProductListView.as_view(), name='all_products'),
    path('products/<str:pk>/', ProductListView.as_view(), name='products'),
    path('product_details/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
]