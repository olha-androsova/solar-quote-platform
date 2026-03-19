from rest_framework import serializers

from .models import QuoteRequest

from .constants import SAVINGS_RATE


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "address",
            "monthly_energy_bill",
            "estimated_monthly_savings",
            "created_at",
        ]
        read_only_fields = ["id", "estimated_monthly_savings", "created_at"]

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return value

    def validate_address(self, value):
        if not value.strip():
            raise serializers.ValidationError("Address cannot be empty.")
        return value

    def validate_monthly_energy_bill(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Monthly energy bill must be greater than 0."
            )
        return value

    def create(self, validated_data):
        monthly_energy_bill = validated_data["monthly_energy_bill"]
        validated_data["estimated_monthly_savings"] = (
            monthly_energy_bill * SAVINGS_RATE
        )
        return super().create(validated_data)
