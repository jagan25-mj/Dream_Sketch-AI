from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health_check, name="health"),
    path("generate/", views.GenerateImageView.as_view(), name="generate-image"),
    path("history/", views.GeneratedListView.as_view(), name="generated-history"),
]
