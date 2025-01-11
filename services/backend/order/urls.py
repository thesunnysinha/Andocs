from django.urls import path 
from .views import UserOrdersListView,UserOrderDetailListView,CreateOrderAPIView

urlpatterns = [
    path('user/orders/', UserOrdersListView.as_view(), name='order-list'),
    path('user/order_detail/<int:pk>/', UserOrderDetailListView.as_view(), name='order-list'),
    path('user/create_order/',CreateOrderAPIView.as_view(),name='create-order'),
]
