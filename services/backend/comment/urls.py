from django.urls import path
from .views import CommentViewSet,AddCommentModelViewSet,EditUserCommentView

urlpatterns = [
    path('comments/<int:pk>/',CommentViewSet.as_view(),name='comment'),
    path('user/add_comment/<int:pk>/', AddCommentModelViewSet.as_view(), name='add_comment'),
    path('user/edit_comment/<int:pk>/', EditUserCommentView.as_view(), name='edit-comment'),

]
