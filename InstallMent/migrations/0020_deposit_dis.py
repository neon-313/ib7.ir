# Generated by Django 4.2.6 on 2023-11-14 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0019_deposit_balance'),
    ]

    operations = [
        migrations.AddField(
            model_name='deposit',
            name='dis',
            field=models.TextField(null=True),
        ),
    ]