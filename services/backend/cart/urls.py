from django.urls import path
from .views import UserCartListView,UpdateProductQuantityView,AddProductToCartView,DeleteProductFromCartView

urlpatterns = [
    path('user/cart/',UserCartListView.as_view(),name='user-cart'),
    path('user/update_product_quantity/<int:id>/<int:qk>/', UpdateProductQuantityView.as_view(), name='update-product-quantity'),  
    path('user/add_to_cart/<int:id>/', AddProductToCartView.as_view(), name='add-to-cart'),
    path('user/delete_product_from_cart/<int:id>/', DeleteProductFromCartView.as_view(), name='delete-product-from-cart'),
]