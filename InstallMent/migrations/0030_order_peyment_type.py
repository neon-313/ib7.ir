# Generated by Django 4.2.6 on 2023-11-30 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0029_order_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='peyment_type',
            field=models.CharField(choices=[('نقد', 'نقد'), ('اعتباری', 'اعتباری'), ('چک', 'چک')], max_length=20, null=True),
        ),
    ]