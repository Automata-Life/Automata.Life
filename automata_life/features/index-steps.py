from lettuce import *
from django.test.client import Client

@before.all
def set_browser():
  world.browser = Client()

@step(r'I access the url "(.*)"')
def access_url(step, url):
  world.response = world.browser.get(url)

@step("I look at the page")
def get_content(step):
  world.content = world.response.content

@step(r'I see the text "(.*)"')
def see_text(step, text):
  assert text in world.response.content
