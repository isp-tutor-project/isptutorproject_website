from django.shortcuts import render
from django.http import HttpResponse


# Add students
def addstudents(request, classcode):
    return render(request, 'addstudents.html')

# Assign students
def assignstudents(request):
    return render(request, 'assignstudents.html')

