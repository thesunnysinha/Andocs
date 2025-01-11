from rest_framework import serializers
from .models import Comment
from order.models import OrderProduct

class CommentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    created_date = serializers.SerializerMethodField()
    created_time = serializers.SerializerMethodField()
    updated_date = serializers.SerializerMethodField()
    updated_time = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'user','product', 'subject', 'comment', 'rating', 'status', 'create_at','name','update_at',"created_date","created_time","updated_time","updated_date")

    def get_name(self,obj):
        return obj.user.name
    
    def get_created_date(self,obj):
        date_str = obj.create_at.date().strftime("%Y-%m-%d")
        return date_str

    def get_created_time(self,obj):
        time_str = obj.create_at.time().strftime("%H:%M:%S")
        return time_str
    
    def get_updated_date(self,obj):
        date_str = obj.update_at.date().strftime("%Y-%m-%d")
        return date_str

    def get_updated_time(self,obj):
        time_str = obj.update_at.time().strftime("%H:%M:%S")
        return time_str


class UserAddCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['subject', 'comment', 'rating']

    def validate(self, data):
        # Get the authenticated user and product from the serializer's context
        user = self.context['request'].user
        product = self.context['product']
        # Check if the user has already placed a comment for the product
        if Comment.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("You have already placed a comment for this product.")
        # Check if the product is in an order placed by the user
        if not OrderProduct.objects.filter(order__user=user, product_id=product).exists():
            raise serializers.ValidationError("Purchase Product to add Reviews.")
        return data

    def validate_subject(self, subject):
        if len(subject) > 50:
            raise serializers.ValidationError("Subject should be at most 50 characters long")
        return subject
        
    def validate_comment(self, comment):
        if len(comment) > 250:
            raise serializers.ValidationError("Comment should be at most 250 characters long")
        return comment


class UserEditCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['subject', 'comment', 'rating']

    def validate(self,data):
        user = self.context['request'].user
        comment_id = self.context['comment_id']
        if not Comment.objects.filter(id=comment_id, user=user).exists():
            raise serializers.ValidationError("This Review doesn't belong to you.")
        return data

    def validate_subject(self, subject):
        if len(subject) > 50:
            raise serializers.ValidationError("Subject should be at most 50 characters long")
        return subject
        
    def validate_comment(self, comment):
        if len(comment) > 250:
            raise serializers.ValidationError("Comment should be at most 250 characters long")
        return comment