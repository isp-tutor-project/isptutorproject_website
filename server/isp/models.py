from django.db import models


# a App is simply a named URL with 0-more config options (feature flags)
class App(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(blank=True)
    url = models.CharField(max_length=128, help_text="can be path only")

    def __str__(self):
        return self.name


# a Feature (flag) is simply a string associated with a App which modifies it's 
# behavior
class Feature(models.Model):
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=128)
    app = models.ForeignKey(App, on_delete=models.CASCADE, related_name="available_features")


    def __str__(self):
        return "%s (%s) " % (self.name, self.description)

    class Meta:
        unique_together = [['name', 'app']]


# an Activity is named configuration for an App with 0-more of it's Features enabled
class Activity(models.Model):
    name = models.CharField(max_length=64, unique=True, help_text="descriptive name for creating pathways")
    label = models.CharField(max_length=64, help_text="text students will see on home page")
    app = models.ForeignKey(App, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Activities"
    
# i'd like the list of features one can enable to be limited to app.module's features
class EnabledFeature(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE, related_name="enabled_features")

    def __str__(self):
        return self.feature.name

    class Meta:
        unique_together = [['activity', 'feature',]]


class School(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class Teacher(models.Model):
    name = models.CharField(max_length=64, unique=True, null=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        unique_together = [['name', 'school']]


class Class(models.Model):
    name = models.CharField(max_length=64, null=False, help_text="teacher friendly name")
    classcode = models.CharField(max_length=64, unique=True, null=False, help_text="unique name for class")
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['teacher', 'name']
    

class Pathway(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(blank=True, null=True)

    # constrain_school = models.ForeignKey(School, on_delete=models.CASCADE, null=True)
    # constrain_teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    # constrain_class = models.ForeignKey(Class, on_delete=models.CASCADE, null=True)
 
    def __str__(self):
         return self.name


class Student(models.Model):
    pathway = models.ForeignKey(Pathway, on_delete=models.CASCADE)
    classname = models.ForeignKey(Class, on_delete=models.CASCADE)


class OrderedActivity(models.Model):
    pathway = models.ForeignKey(Pathway, on_delete=models.CASCADE)
    order = models.IntegerField(null=False)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="activities")

    def __str__(self):
        return "%d" % self.order
        
    class Meta:
        ordering = ('order',)
