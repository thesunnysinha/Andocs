from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.renderers import UserRenderer
from .models import Comment
from rest_framework.permissions import IsAuthenticated
from .serializers import CommentSerializer,UserAddCommentSerializer,UserEditCommentSerializer
from product.models import Product
from django.shortcuts import get_object_or_404

class CommentViewSet(APIView):
    renderer_classes = [UserRenderer]
    def get(self,request,pk,format=None):
        queryset = Comment.objects.filter(product=pk)
        serializer = CommentSerializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class AddCommentModelViewSet(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        pk = self.kwargs['pk']
        product = Product.objects.get(pk=pk)
        self.product = product

    def post(self, request, pk, format=None):
        serializer = UserAddCommentSerializer(data=request.data, context={'product': self.product,'request': request})
        if serializer.is_valid():
            comment = serializer.save(product=self.product, user=request.user)
            return Response(UserAddCommentSerializer(comment).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditUserCommentView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        comment = get_object_or_404(Comment, id=pk, user=request.user)
        serializer = UserEditCommentSerializer(comment, data=request.data, context={'request': request,'comment_id': pk})
        if serializer.is_valid():
            serializer.save()
            return Response(CommentSerializer(comment).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            