from django.urls import path

from .views import QuoteRequestListCreateView

urlpatterns = [
    path("quotes/", QuoteRequestListCreateView.as_view(), name="quote-list-create"),
]