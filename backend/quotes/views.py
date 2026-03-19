from rest_framework import generics

from .models import QuoteRequest
from .serializers import QuoteRequestSerializer


class QuoteRequestListCreateView(generics.ListCreateAPIView):
    queryset = QuoteRequest.objects.all().order_by("-created_at")
    serializer_class = QuoteRequestSerializer
