from django.contrib import admin
from .models import Cluster

@admin.register(Cluster)
class ClusterAdmin(admin.ModelAdmin):
    model = Cluster
    list_display = ['name', 'get_members']