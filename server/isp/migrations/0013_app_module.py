# Generated by Django 3.0.6 on 2020-06-12 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('isp', '0012_auto_20200612_1831'),
    ]

    operations = [
        migrations.AddField(
            model_name='app',
            name='module',
            field=models.CharField(choices=[('00PRE', 'Pre-Training'), ('05RQ', 'Research Question'), ('10BRM', 'Basic Research'), ('15HYPO', 'Hypothesis'), ('20DI', 'Data-Interpretation'), ('25POST', 'Post-Training')], default='00PRE', max_length=8),
        ),
    ]
