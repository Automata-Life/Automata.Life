from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context, loader
import settings
import json


def index(request):
    return HttpResponse("Hello, broa. Follow your heart.")

def game(request):
    with open(settings.GRID_CONFIG) as file:
        data = json.load(file)

    context = {'HEX_LIB':     settings.HEX_LIB,
               'HEX_GRID':    settings.HEX_GRID,
               'GRID_WIDTH':  data["grid"]["width"],
               'GRID_HEIGHT': data["grid"]["height"],
               'HEX_RADIUS':  data["grid"]["hex_radius"],
               'GRID_NAME':   data["grid"]["name"]}
    template = loader.get_template("game.html")
    return HttpResponse(template.render(context))
