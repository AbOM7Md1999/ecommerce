# Generated by Django 4.0.5 on 2022-06-28 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_postalcode_shippingaddress_postalcode_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/alexa.png', null=True, upload_to=''),
        ),
    ]