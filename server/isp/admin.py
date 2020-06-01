from django.contrib import admin

from .models import (
    Activity, Pathway, School, Class, Teacher, Student,
    EnabledFeature, Feature, Module, OrderedActivity,
)

class FeatureInline(admin.TabularInline):
    model = Feature

class EnabledFeatureInline(admin.TabularInline):
    model = EnabledFeature

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        field = super().formfield_for_foreignkey(db_field, request, **kwargs)
        if db_field.name == "feature":
            app = request._obj
            field.queryset = field.queryset.filter(module__exact=app.module.id)
        return field

class OrderedActivityInline(admin.TabularInline):
    model = OrderedActivity

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [ FeatureInline ]

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'module')
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
    list_display = ('name', 'description')
    inlines = [ OrderedActivityInline ]