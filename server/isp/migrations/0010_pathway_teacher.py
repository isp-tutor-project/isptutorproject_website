# Generated by Django 3.0.6 on 2020-06-12 17:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('isp', '0009_remove_pathway_constrain_school'),
    ]

    operations = [
        migrations.AddField(
            model_name='pathway',
            name='teacher',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='isp.Teacher'),
            preserve_default=False,
        ),
    ]
