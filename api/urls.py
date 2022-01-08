from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.apiOverview,name='apiOverview'),
    path('products/<str:pk>',views.products,name='products'),
    path('getsingle/<int:pk>',views.getSingle,name='getSingle'),
    path('allproducts',views.allProducts,name='allProducts'),
]