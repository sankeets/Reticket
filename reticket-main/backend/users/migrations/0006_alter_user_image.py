# Generated by Django 4.0.2 on 2022-02-24 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to='', verbose_name='Image'),
        ),
    ]
