from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class QuoteRequest(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = PhoneNumberField(blank=True)
    address = models.CharField(max_length=500)
    monthly_energy_bill = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_monthly_savings = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.email}"
