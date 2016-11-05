from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader

def index(request):
    return HttpResponse("Hello, broa. Follow your heart.")

def game(request):
    template = loader.get_template("game.html")
    return HttpResponse(template.render())
