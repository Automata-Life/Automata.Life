from django.test import TestCase
from django.test import Client

class RootTestCase(TestCase):
    def test_root_page(self):
        c = Client()
        response = c.get('/')
        self.assertTrue("Hello, World!" in response.content)
