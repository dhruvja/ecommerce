# Generated by Django 3.2.2 on 2021-10-13 16:45

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_image_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=imagekit.models.fields.ProcessedImageField(upload_to='uploads/'),
        ),
    ]
