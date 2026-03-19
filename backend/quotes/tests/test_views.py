from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from quotes.models import QuoteRequest


class QuoteRequestListCreateViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("quote-list-create")

    def test_create_quote_request(self):
        payload = {
            "name": "Anna Svensson",
            "email": "anna@example.com",
            "phone": "+46701234567",
            "address": "Sveavagen 10, Stockholm",
            "monthly_energy_bill": "3000.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(QuoteRequest.objects.count(), 1)

        quote_request = QuoteRequest.objects.first()
        self.assertEqual(quote_request.name, payload["name"])
        self.assertEqual(quote_request.email, payload["email"])
        self.assertEqual(str(quote_request.monthly_energy_bill), "3000.00")
        self.assertEqual(
            quote_request.estimated_monthly_savings,
            Decimal("900.00"),
        )

    def test_list_quote_requests(self):
        QuoteRequest.objects.create(
            name="Anna Svensson",
            email="anna@example.com",
            phone="+46701234567",
            address="Sveavagen 10, Stockholm",
            monthly_energy_bill=Decimal("3000.00"),
            estimated_monthly_savings=Decimal("900.00"),
        )
        QuoteRequest.objects.create(
            name="Erik Larsson",
            email="erik@example.com",
            phone="+46707654321",
            address="Storgatan 5, Uppsala",
            monthly_energy_bill=Decimal("4500.00"),
            estimated_monthly_savings=Decimal("1350.00"),
        )

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_quote_request_requires_required_fields(self):
        payload = {
            "email": "anna@example.com",
            "monthly_energy_bill": "3000.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)
        self.assertIn("address", response.data)

    def test_create_quote_request_rejects_zero_monthly_energy_bill(self):
        payload = {
            "name": "Anna Svensson",
            "email": "anna@example.com",
            "phone": "+46701234567",
            "address": "Sveavagen 10, Stockholm",
            "monthly_energy_bill": "0.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("monthly_energy_bill", response.data)

    def test_create_quote_request_rejects_negative_monthly_energy_bill(self):
        payload = {
            "name": "Anna Svensson",
            "email": "anna@example.com",
            "phone": "+46701234567",
            "address": "Sveavagen 10, Stockholm",
            "monthly_energy_bill": "-100.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("monthly_energy_bill", response.data)

    def test_create_quote_request_rejects_blank_name(self):
        payload = {
            "name": "   ",
            "email": "anna@example.com",
            "phone": "+46701234567",
            "address": "Sveavagen 10, Stockholm",
            "monthly_energy_bill": "3000.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_create_quote_request_rejects_blank_address(self):
        payload = {
            "name": "Anna Svensson",
            "email": "anna@example.com",
            "phone": "+46701234567",
            "address": "   ",
            "monthly_energy_bill": "3000.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("address", response.data)

    def test_backend_calculates_savings_ignoring_client_value(self):
        payload = {
            "name": "Anna Svensson",
            "email": "anna@example.com",
            "phone": "+46701234567",
            "address": "Sveavagen 10, Stockholm",
            "monthly_energy_bill": "3000.00",
            "estimated_monthly_savings": "1.00",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        quote_request = QuoteRequest.objects.get()
        self.assertEqual(
            quote_request.estimated_monthly_savings,
            Decimal("900.00"),
        )
