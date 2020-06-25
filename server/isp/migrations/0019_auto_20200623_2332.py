# Generated by Django 3.0.6 on 2020-06-23 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('isp', '0018_teacher_edit_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='edit_link',
        ),
        migrations.AddField(
            model_name='pathway',
            name='edit_link',
            field=models.URLField(default='pathway/edit/', max_length=128, null=True),
        ),
    ]
