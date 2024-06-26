# Generated by Django 4.2.6 on 2024-02-09 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ShopManageMent', '0006_specification_product_specification'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShowFilter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='show_filters',
            field=models.ManyToManyField(related_name='product_show_filters', to='ShopManageMent.showfilter'),
        ),
    ]
