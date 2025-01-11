from django.contrib import admin
from .models import OrderProduct,Order

class OrderProductInline(admin.TabularInline):
    model = OrderProduct

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductInline]
    list_display = ('id','user', 'status', 'payment_method', 'payment_status', 'date_added', 'total_amount','transaction_id')
    search_fields = ('user__username', 'transaction_id')
    list_filter = ('status', 'payment_method', 'payment_status', 'date_added')

@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    # exclude = ('order',)
    list_display = ('order_id','order', 'product_id', 'quantity')
    search_fields = ('order__transaction_id', 'product__name')
    list_filter = ('order__status', 'product_id__category')

