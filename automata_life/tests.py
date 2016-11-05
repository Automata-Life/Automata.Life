from django.test import TestCase
from django.test import Client

class RootAppCase(TestCase):
    def test_root_page(self):
        c = Client()
        response = c.get('/automata_life/')
        self.assertTrue("Follow your heart." in response.content)
