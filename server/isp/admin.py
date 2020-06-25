from django.contrib import admin


from .models import (
    Module, App, Feature, ActivityType, Activity, EnabledFeature,
    Pathway, OrderedActivity
)
# Teacher, Class, Student


class FeatureInline(admin.TabularInline):
    model = Feature
    extra = 0


class EnabledFeatureInline(admin.TabularInline):
    model = EnabledFeature
    extra = 0

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        field = super().formfield_for_foreignkey(db_field, request, **kwargs)
        if db_field.name == "feature":
            activity = request._obj
            field.queryset = field.queryset.filter(app__exact=activity.app.id)
        return field


class OrderedActivityInline(admin.TabularInline):
    model = OrderedActivity
    extra = 0


# class PathwayInline(admin.TabularInline):
#     model = Pathway
#     show_change_link = True
#     extra = 0


# class TeacherInline(admin.TabularInline):
#     model = Teacher
#     show_change_link = True


# class ClassInline(admin.TabularInline):
#     model = Class
#     show_change_link = True
#     extra = 0


# class StudentInline(admin.TabularInline):
#     model = Student

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('order', 'name', 'description')


@admin.register(App)
class AppAdmin(admin.ModelAdmin):
    list_display = ('name', 'module', 'description')
    inlines = [ FeatureInline ]


@admin.register(ActivityType)
class ActivityTypeAdmin(admin.ModelAdmin):
    list_display = ('order', 'name', 'description')


def app_module(obj):
    return obj.app.module


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'app', app_module, 'activity_type', 'description')
    inlines = [ EnabledFeatureInline ]

    def get_inline_instances(self, request, obj=None):
        request._obj = obj
        return [
            inline(self.model, self.admin_site)
            for inline in self.inlines
            if obj is not None
        ]


@admin.register(Pathway)
class PathwayAdmin(admin.ModelAdmin):
    inlines = [ OrderedActivityInline ]


# @admin.register(Teacher)
# class TeacherAdmin(admin.ModelAdmin):
#     inlines = [ PathwayInline, ClassInline ]


# @admin.register(Class)
# class ClassAdmin(admin.ModelAdmin):
#     inlines = [ StudentInline ]
