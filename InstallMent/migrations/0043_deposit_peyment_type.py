# Generated by Django 4.2.6 on 2023-12-10 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InstallMent', '0042_deposit_check_peyment'),
    ]

    operations = [
        migrations.AddField(
            model_name='deposit',
            name='peyment_type',
            field=models.CharField(choices=[('نقد', 'نقد'), ('چک', 'چک')], max_length=20, null=True),
        ),
    ]