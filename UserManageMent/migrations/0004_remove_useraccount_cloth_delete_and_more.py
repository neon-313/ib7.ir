# Generated by Django 4.2.6 on 2023-11-02 09:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserManageMent', '0003_grouppermissionn_useraccount_cloth_delete_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='cloth_delete',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='cloth_edit',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='cloth_read',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='tailor_create',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='tailor_delete',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='tailor_edit',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='tailor_read',
        ),
    ]
