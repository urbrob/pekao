# Generated by Django 2.0.7 on 2019-06-08 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0002_employer_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employer',
            name='created_at',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='payment',
            name='created_at',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='terminal',
            name='created_at',
            field=models.DateTimeField(),
        ),
    ]
