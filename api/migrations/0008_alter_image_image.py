# Generated by Django 3.2.2 on 2021-10-13 16:14

from django.db import migrations
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20211013_1609'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=sorl.thumbnail.fields.ImageField(default='hi.png', upload_to='uploads/'),
        ),
    ]
