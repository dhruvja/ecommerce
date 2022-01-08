from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Image, Order, UserInformation, OrderDetail

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'
    
class ProductSerializer(serializers.ModelSerializer):

    product_id = ImageSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'
