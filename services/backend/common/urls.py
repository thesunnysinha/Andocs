from django.urls import path,include
from common.views import CarouselListView
from product import urls as product_urls
from cart import urls as cart_urls
from productRecommendation import urls as productRecommendation_urls
from address import urls as address_urls
from order import urls as order_urls
from comment import urls as comment_urls
from wishlist import urls as wishlist_urls
from account import urls as account_urls

urlpatterns = [
     path('carousel/',CarouselListView.as_view(),name='carousel'),
     path('user/', include(account_urls)),
]

# Address 
urlpatterns += [
     path('',include(address_urls)),   
]

# Product 
urlpatterns += [
     path('',include(product_urls)),   
]

#Cart
urlpatterns += [
     path('',include(cart_urls)),   
]

#Product Recommendation
urlpatterns += [
     path('',include(productRecommendation_urls)),   
]

#Order
urlpatterns += [
     path('',include(order_urls)),   
]

#Comment
urlpatterns += [
     path('',include(comment_urls)),   
]

#Wishlist
urlpatterns += [
     path('',include(wishlist_urls)),   
]