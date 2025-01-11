from django.urls import path 
from .views import UserWishlistListView,AddProductToWishlistView,DeleteProductFromWishlistView

urlpatterns = [
    path('user/wishlist/',UserWishlistListView.as_view(),name='user-wishlist'),
    path('user/add_to_wishlist/<int:pk>/', AddProductToWishlistView.as_view(), name='add-to-wishlist'),
    path('user/delete_product_from_wishlist/<int:pk>/', DeleteProductFromWishlistView.as_view(), name='delete-product-from-wishlist'),
        
]