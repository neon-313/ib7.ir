# Generated by Django 4.2.3 on 2023-08-21 21:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0002_costumer_phonenumber'),
    ]

    operations = [
        migrations.CreateModel(
            name='PeymendDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('peyment', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], default='1', max_length=200)),
                ('year', models.CharField(max_length=200, null=True)),
                ('month', models.CharField(max_length=200, null=True)),
                ('day', models.CharField(max_length=200, null=True)),
                ('price', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
                ('price', models.CharField(max_length=200, null=True)),
                ('numbers', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product_Factor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='InstallMent.product')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_code', models.CharField(max_length=200, null=True)),
                ('created', models.DateField(auto_now_add=True, null=True)),
                ('total_price', models.CharField(max_length=200, null=True)),
                ('offer', models.CharField(max_length=200, null=True)),
                ('pish_pardakht', models.CharField(max_length=200, null=True)),
                ('takhfif', models.CharField(max_length=200, null=True)),
                ('costumer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_costumer', to='InstallMent.costumer')),
                ('instal_ments', models.ManyToManyField(to='InstallMent.peymenddate')),
                ('products', models.ManyToManyField(to='InstallMent.product_factor')),
            ],
        ),
    ]
