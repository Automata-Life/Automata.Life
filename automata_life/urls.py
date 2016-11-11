from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^game/$', views.game, name='game'),
    url(r'^react_test/$', views.react_test, name='react_test'),
]
