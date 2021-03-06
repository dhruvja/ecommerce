# Generated by Django 3.2.2 on 2021-10-13 13:50

from django.db import migrations, models
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_image_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='images',
            field=models.ImageField(default='hi.png', upload_to='uploads/'),
        ),
        migrations.AlterField(
            model_name='image',
            name='image',
            field=sorl.thumbnail.fields.ImageField(upload_to='uploads/'),
        ),
    ]
