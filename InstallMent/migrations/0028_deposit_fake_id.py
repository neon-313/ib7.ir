# Generated by Django 4.2.6 on 2023-11-16 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0027_alter_costumer_deposits'),
    ]

    operations = [
        migrations.AddField(
            model_name='deposit',
            name='fake_id',
            field=models.CharField(max_length=200, null=True),
        ),
    ]