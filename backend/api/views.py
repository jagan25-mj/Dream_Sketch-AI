# backend/api/views.py
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.conf import settings
from .serializers import GenerateImageSerializer
from .models import GeneratedImage
from django.utils import timezone

# try to import a real inference backend; fall back to stub if not present
try:
    from .inference import generate_image, MODEL_MAP  # inference.generate_image should return PNG bytes
    _HAS_INFERENCE = True
except Exception:
    _HAS_INFERENCE = False
    MODEL_MAP = {}
    generate_image = None  # will use stub below


# Health
def health_check(request):
    return JsonResponse({"status": "ok"})


# Helper - save image bytes and return filename + full url
def _save_bytes_and_record(prompt: str, image_bytes: bytes):
    gen_dir = os.path.join(settings.MEDIA_ROOT, "generated")
    os.makedirs(gen_dir, exist_ok=True)
    filename = f"generated_{abs(hash(prompt)) % (10**8)}.png"
    filepath = os.path.join(gen_dir, filename)
    with open(filepath, "wb") as f:
        f.write(image_bytes)
    rel_path = f"generated/{filename}"
    record = GeneratedImage.objects.create(prompt=prompt, image=rel_path, created_at=timezone.now())
    return record, filename


# Build absolute URL for a generated filename
def _build_media_url(request, filename: str):
    media_base = request.build_absolute_uri(settings.MEDIA_URL)
    return f"{media_base.rstrip('/')}/generated/{filename}"


# Stub inference (you can replace with real model later)
def run_inference_stub(prompt: str, width: int, height: int) -> bytes:
    from PIL import Image
    import io
    img = Image.new("RGB", (int(width), int(height)), color=(120, 180, 200))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


# Utility to call either real inference or stub
def _generate_bytes_or_stub(prompt, negative_prompt, width, height, steps, guidance, model_id):
    if _HAS_INFERENCE and generate_image:
        # validate model_id
        if model_id not in MODEL_MAP:
            raise ValueError(f"unknown model_id: {model_id}")
        return generate_image(
            model_id=model_id,
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            steps=steps,
            guidance_scale=guidance,
        )
    # fallback
    return run_inference_stub(prompt, width, height)


# Txt2Img view
class Txt2ImgView(APIView):
    def post(self, request):
        serializer = GenerateImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        prompt = data.get("prompt", "")
        model_id = data.get("model_id", "dreamshaper-v8")
        steps = int(data.get("steps", 40))
        guidance = float(data.get("guidance_scale", 8.0))
        neg_prompt = data.get("negative_prompt", "")
        width = int(data.get("width", 512))
        height = int(data.get("height", 512))

        # If inference backend is present, ensure model_id is known
        if _HAS_INFERENCE and model_id not in MODEL_MAP:
            return Response({"status": "error", "error": "unknown model_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            image_bytes = _generate_bytes_or_stub(prompt, neg_prompt, width, height, steps, guidance, model_id)
            record, filename = _save_bytes_and_record(prompt, image_bytes)
            full_url = _build_media_url(request, filename)
        except Exception as e:
            return Response({"status": "error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "status": "success",
            "result": {
                "id": record.id,
                "url": full_url,
                "prompt": record.prompt,
                "created_at": record.created_at.isoformat()
            }
        }, status=status.HTTP_201_CREATED)


# Img2Img view (for now same as Txt2Img but accepts same params)
class Img2ImgView(APIView):
    def post(self, request):
        serializer = GenerateImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        prompt = data.get("prompt", "")
        model_id = data.get("model_id", "dreamshaper-v8")
        steps = int(data.get("steps", 40))
        guidance = float(data.get("guidance_scale", 8.0))
        neg_prompt = data.get("negative_prompt", "")
        width = int(data.get("width", 512))
        height = int(data.get("height", 512))

        if _HAS_INFERENCE and model_id not in MODEL_MAP:
            return Response({"status": "error", "error": "unknown model_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            image_bytes = _generate_bytes_or_stub(prompt, neg_prompt, width, height, steps, guidance, model_id)
            record, filename = _save_bytes_and_record(prompt, image_bytes)
            full_url = _build_media_url(request, filename)
        except Exception as e:
            return Response({"status": "error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "status": "success",
            "result": {
                "id": record.id,
                "url": full_url,
                "prompt": record.prompt,
                "created_at": record.created_at.isoformat()
            }
        }, status=status.HTTP_201_CREATED)


# Status endpoint
class StatusView(APIView):
    def get(self, request):
        return Response({"status": "ready"}, status=status.HTTP_200_OK)


# Models endpoint
class ModelsView(APIView):
    def get(self, request):
        # If inference backend is available, prefer MODEL_MAP keys
        if _HAS_INFERENCE and MODEL_MAP:
            models = [{"id": k, "name": k} for k in MODEL_MAP.keys()]
        else:
            models = [
                {"id": "stable-diffusion-v1", "name": "Stable Diffusion v1"},
                {"id": "stable-diffusion-v2", "name": "Stable Diffusion v2"},
                {"id": "dreamshaper-v8", "name": "DreamShaper v8"}
            ]
        return Response(models, status=status.HTTP_200_OK)


# Result endpoint - returns recent results array
class ResultView(APIView):
    def get(self, request):
        qs = GeneratedImage.objects.all().order_by("-created_at")[:20]
        results = []
        for r in qs:
            try:
                img_url = request.build_absolute_uri(r.image.url)
            except Exception:
                img_url = request.build_absolute_uri(settings.MEDIA_URL + (r.image.name if hasattr(r.image, 'name') else str(r.image)))
            results.append({
                "id": r.id,
                "url": img_url,
                "prompt": r.prompt,
                "created_at": r.created_at.isoformat()
            })
        return Response({"results": results}, status=status.HTTP_200_OK)
