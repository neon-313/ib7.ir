# Generated by Django 4.2.3 on 2023-08-30 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0009_order_dis'),
    ]

    operations = [
        migrations.AddField(
            model_name='peymenddate',
            name='peyed_date',
            field=models.CharField(max_length=200, null=True),
        ),
    ]