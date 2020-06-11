from django.shortcuts import render
from django.http import HttpResponse


# Add students
def editClass(request):
    return render(request, 'editclass.html')

# Assign students
def viewClass(request):
    return render(request, 'viewclass.html')

