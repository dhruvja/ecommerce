from django.db import models
from ckeditor.fields import RichTextField
from sorl.thumbnail import ImageField, get_thumbnail
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill,resize
from pilkit.processors import Thumbnail

# Create your models here.

class Product(models.Model):
    product_name = models.CharField(max_length=255)
    price = models.IntegerField()
    details = RichTextField()
    product_code = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    status = models.BooleanField(default=True, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name

class Image(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE,related_name='product_id')
    # image = ImageField(upload_to="static/media/uploads/")
    # image = models.ImageField(upload_to = "uploads/", default="hi.png")
    image = ProcessedImageField(upload_to = "uploads/",processors=[ResizeToFill(300,300)],format='JPEG',options={'quality': 100})

    image_thumbnail = ImageSpecField(source='image',processors=[ResizeToFill(100,50)],format='JPEG',options={'quality': 60})

class UserInformation(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255)
    pincode = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email_verification = models.BooleanField(default = False)

    def __str__(self):
        return self.username

class Order(models.Model):
    user_id = models.ForeignKey(UserInformation,on_delete = models.CASCADE, related_name = 'user_id')
    amount = models.IntegerField()
    confirmation = models.BooleanField(default = False)
    Status = models.CharField(max_length=255)

    def __str__(self):
        return self.user_id

class OrderDetail(models.Model):
    order_id = models.ForeignKey(Order, on_delete = models.CASCADE, related_name = 'order_id')
    product_id = models.ForeignKey(Product, on_delete = models.CASCADE, related_name = 'order_product_id')
    quantity = models.IntegerField()
    amount = models.IntegerField()

    def __str__(self):
        return self.order_id
