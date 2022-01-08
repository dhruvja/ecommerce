from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Image, Order, UserInformation, OrderDetail
from .serializers import ProductSerializer, ImageSerializer

# Create your views here.

@api_view(['GET'])
def apiOverview(request):

    commands = {
        'showproducts': 'localhost:8000/api'
    }

    return Response(commands)

@api_view(['GET'])
def products(request,pk):

    product = Product.objects.filter(product_name__icontains = pk )
    product = ProductSerializer(product,many=True)

    return Response(product.data)

@api_view(['GET'])
def getSingle(request,pk):

    single_product = Product.objects.get(id=pk)

    product = ProductSerializer(single_product)

    return Response(product.data)

@api_view(['GET'])
def allProducts(request):

    product = Product.objects.all()
    product = ProductSerializer(product,many=True)

    return Response(product.data)