from django.test import TestCase
from ynp_app.applications.calculator import main

class CalculatorTestCase(TestCase):
    def test_calculator_is_fine(self):
        """Calculator works correctly"""
        self.assertEqual(main('5+5'), 10)
        self.assertEqual(main('5--15'), 20)
    
    def test_calculator_raises_error(self):
        """Calculator raises an error if input is not correct"""
        with self.assertRaises(ValueError):
            main('5-fff')