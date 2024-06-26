# Generated by Django 4.2.6 on 2023-10-30 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GroupPermissionn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(max_length=200, null=True)),
                ('read', models.JSONField(null=True)),
                ('create', models.JSONField(null=True)),
                ('delete', models.JSONField(null=True)),
                ('edit', models.JSONField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_type', models.CharField(choices=[('برشکار', 'برشکار'), ('خیاط', 'خیاط'), ('مدیر تولید', 'مدیر تولید')], default='مدیر تولید', max_length=50)),
                ('first_name', models.CharField(blank=True, max_length=255, null=True)),
                ('last_name', models.CharField(blank=True, max_length=255, null=True)),
                ('phone', models.CharField(max_length=200, null=True)),
                ('state', models.CharField(max_length=200, null=True)),
                ('city', models.CharField(max_length=200, null=True)),
                ('password', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=200, unique=True)),
                ('created', models.DateField(auto_now_add=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
