from django.contrib import admin
from .models import Product, Image, Order, UserInformation, OrderDetail
from sorl.thumbnail.admin import AdminImageMixin

# Register your models here.
admin.site.register(Product)
admin.site.register(Image)
admin.site.register(OrderDetail)
admin.site.register(UserInformation)
admin.site.register(Order)

class ImageAdmin(AdminImageMixin, admin.ModelAdmin):
    pass