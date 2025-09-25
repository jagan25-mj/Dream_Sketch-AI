from django.urls import path
from . import views

urlpatterns = [
    # health check (optional)
    path("health/", views.health_check, name="health"),

    # v1 API
    path("v1/generate/txt2img", views.Txt2ImgView.as_view(), name="txt2img"),
    path("v1/generate/img2img", views.Img2ImgView.as_view(), name="img2img"),
    path("v1/status", views.StatusView.as_view(), name="status"),
    path("v1/models", views.ModelsView.as_view(), name="models"),
    path("v1/result", views.ResultView.as_view(), name="result"),
]
