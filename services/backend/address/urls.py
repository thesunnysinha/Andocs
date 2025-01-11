from django.urls import path
from .views import UserAddressListView,AddUserAddressView,DeleteUserAddressView,EditUserAddressView

urlpatterns = [
    path('user/address/',UserAddressListView.as_view(),name='user-address'),
    path('user/add_address/',AddUserAddressView.as_view(),name='add-address'),
    path('user/delete_address/<int:pk>/', DeleteUserAddressView.as_view(), name='delete-address'),
    path('user/edit_address/<int:pk>/', EditUserAddressView.as_view(), name='edit-address'),
]
