# Generated by Django 4.2.6 on 2024-05-11 09:27

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ShopManageMent', '0009_image_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abutus',
            name='text',
            field=ckeditor.fields.RichTextField(null=True),
        ),
        migrations.AlterField(
            model_name='howtobuy',
            name='text',
            field=ckeditor.fields.RichTextField(null=True),
        ),
        migrations.AlterField(
            model_name='returnterms',
            name='text',
            field=ckeditor.fields.RichTextField(null=True),
        ),
        migrations.AlterField(
            model_name='termsandconditions',
            name='text',
            field=ckeditor.fields.RichTextField(null=True),
        ),
        migrations.AlterField(
            model_name='whyus',
            name='text',
            field=ckeditor.fields.RichTextField(null=True),
        ),
    ]