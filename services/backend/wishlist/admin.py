from django.contrib import admin
from .models import WishlistProduct,Wishlist

class WishlistProductInline(admin.TabularInline):
    model = WishlistProduct
    extra = 1

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    inlines = [WishlistProductInline]
    list_display = ('user', 'date_added')

@admin.register(WishlistProduct)
class WishlistProductAdmin(admin.ModelAdmin):
    list_display = ('wishlist','product')