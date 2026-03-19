from django.contrib import admin

from .models import QuoteRequest


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "monthly_energy_bill",
        "estimated_monthly_savings",
        "created_at",
    )
    search_fields = ("name", "email", "address")
    ordering = ("-created_at",)
