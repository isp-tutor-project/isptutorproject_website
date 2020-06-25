from django.db import models
from django.urls import reverse


class Module(models.Model):
    order = models.IntegerField(blank=False, unique=True)
    name = models.CharField(max_length=64, blank=False)
    description = models.CharField(max_length=256, blank=True, default="")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']


class App(models.Model):
    """
    An App is simply a named URL with 0-more config options(feature flags)
    """
    name = models.CharField(max_length=64,
                            unique=True)
    description = models.CharField(max_length=256,
                                  default="",
                                  blank=True)
    url = models.CharField(max_length=256,
                           help_text="can be path only")
    module = models.ForeignKey(Module,
                               null=False,
                               on_delete=models.PROTECT)

    def __str__(self):
        return self.name


    class Meta:
        ordering = ['module__order', 'name']


class Feature(models.Model):
    """
    A Feature is simply a string constant which modifies an App's behavior
    """
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=128)
    app = models.ForeignKey(App,
                            on_delete=models.CASCADE,
                            related_name="available_features")

    def __str__(self):
        return "%s (%s) " % (self.name, self.description)

    class Meta:
        unique_together = [['name', 'app']]



class ActivityType(models.Model):
    order = models.IntegerField(blank=False, unique=True)
    name = models.CharField(max_length=64, blank=False)
    description = models.CharField(max_length=256, blank=True, default="")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']


class Activity(models.Model):
    """
    An Activity is named config for an App with 0-more of it's Features enabled
    """
    name = models.CharField(max_length=64,
                            unique=True,
                            help_text="descriptive name for creating pathways")
    description = models.CharField(max_length=256,
                                   default="",
                                   blank=True)
    label = models.CharField(max_length=64,
                             help_text="text students will see on home page")
    app = models.ForeignKey(App,
                            on_delete=models.CASCADE)
    activity_type = models.ForeignKey(ActivityType,
                                      null=False,
                                      on_delete=models.PROTECT)

    def __str__(self):
        return "%s : %s" % (self.app.module.name, self.name)

    class Meta:
        verbose_name_plural = "Activities"
        ordering = ['app__module__order', 'activity_type__order', 'name']


class EnabledFeature(models.Model):
    """
    An App's feature (constrained to .app.features), enabled for an Activity
    """
    activity = models.ForeignKey(Activity,
                                 on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature,
                                on_delete=models.CASCADE,
                                related_name="enabled_features")

    def __str__(self):
        return self.feature.name

    class Meta:
        unique_together = [['activity', 'feature',]]


# class School(models.Model):
#     name = models.CharField(max_length=64, unique=True)

#     def __str__(self):
#         return self.name


class Teacher(models.Model):
    name = models.CharField(max_length=128,
                            blank=False)
    school = models.CharField(max_length=128,
                              default="")
    description = models.CharField(max_length=128, default="", blank=True)

    def __str__(self):
        return self.name


    class Meta:
        unique_together = [['school', 'name']]



class Pathway(models.Model):
    name = models.CharField(max_length=64,
                            unique=False)
    description = models.CharField(max_length=128,
                                   default="",
                                   blank=True)
    teacher = models.ForeignKey(Teacher,
                                on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class OrderedActivity(models.Model):
    pathway = models.ForeignKey(Pathway,
                                on_delete=models.CASCADE)
    order = models.IntegerField(null=False)
    activity = models.ForeignKey(Activity,
                                 on_delete=models.CASCADE,
                                 related_name="activities")

    def __str__(self):
        return "%d" % self.order

    class Meta:
        ordering = ('order',)


class Class(models.Model):
    name = models.CharField(max_length=64,
                            null=False,
                            help_text="teacher friendly name")
    teacher = models.ForeignKey(Teacher,
                                on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Classes"
        unique_together = [['name', 'teacher']]


class Student(models.Model):
    name = models.CharField(max_length=128,
                            null=False)
    pathway = models.ForeignKey(Pathway,
                                null=True,
                                blank=True,
                                on_delete=models.CASCADE)
    classname = models.ForeignKey(Class,
                                  on_delete=models.CASCADE)

    def __str__(self):
         return self.name

