from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','subject', 'user', 'product', 'rating', 'status', 'create_at')
    list_filter = ('status', 'create_at', 'product')
    search_fields = ('subject', 'user__email', 'comment', 'product__name')
