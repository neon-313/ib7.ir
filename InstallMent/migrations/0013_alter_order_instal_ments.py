# Generated by Django 4.2.3 on 2023-10-16 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0012_order_fake_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='instal_ments',
            field=models.ManyToManyField(related_name='order_peyment', to='InstallMent.peymenddate'),
        ),
    ]