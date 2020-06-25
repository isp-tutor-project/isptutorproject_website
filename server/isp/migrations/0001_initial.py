# Generated by Django 3.0.6 on 2020-06-25 21:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='descriptive name for creating pathways', max_length=64, unique=True)),
                ('description', models.CharField(blank=True, default='', max_length=256)),
                ('label', models.CharField(help_text='text students will see on home page', max_length=64)),
            ],
            options={
                'verbose_name_plural': 'Activities',
                'ordering': ['app__module__order', 'activity_type__order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='ActivityType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(blank=True, default='', max_length=256)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='App',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True)),
                ('description', models.CharField(blank=True, default='', max_length=256)),
                ('url', models.CharField(help_text='can be path only', max_length=256)),
            ],
            options={
                'ordering': ['module__order', 'name'],
            },
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='teacher friendly name', max_length=64)),
            ],
            options={
                'verbose_name_plural': 'Classes',
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(blank=True, default='', max_length=256)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Pathway',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(blank=True, default='', max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('school', models.CharField(default='', max_length=128)),
                ('description', models.CharField(blank=True, default='', max_length=128)),
            ],
            options={
                'unique_together': {('school', 'name')},
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('classname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='isp.Class')),
                ('pathway', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='isp.Pathway')),
            ],
        ),
        migrations.AddField(
            model_name='pathway',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='isp.Teacher'),
        ),
        migrations.CreateModel(
            name='OrderedActivity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='isp.Activity')),
                ('pathway', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='isp.Pathway')),
            ],
            options={
                'ordering': ('order',),
            },
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('description', models.CharField(max_length=128)),
                ('app', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='available_features', to='isp.App')),
            ],
            options={
                'unique_together': {('name', 'app')},
            },
        ),
        migrations.AddField(
            model_name='class',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='isp.Teacher'),
        ),
        migrations.AddField(
            model_name='app',
            name='module',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='isp.Module'),
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='isp.ActivityType'),
        ),
        migrations.AddField(
            model_name='activity',
            name='app',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='isp.App'),
        ),
        migrations.CreateModel(
            name='EnabledFeature',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='isp.Activity')),
                ('feature', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enabled_features', to='isp.Feature')),
            ],
            options={
                'unique_together': {('activity', 'feature')},
            },
        ),
        migrations.AlterUniqueTogether(
            name='class',
            unique_together={('name', 'teacher')},
        ),
    ]
