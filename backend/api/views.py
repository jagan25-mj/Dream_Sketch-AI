import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import JsonResponse
from .serializers import GenerateImageSerializer, GeneratedImageSerializer
from .models import GeneratedImage

def health_check(request):
    return JsonResponse({"status": "ok"})

class GenerateImageView(APIView):
    def post(self, request):
        serializer = GenerateImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        prompt = data["prompt"]
        width = data.get("width", 512)
        height = data.get("height", 512)

        try:
            image_bytes = run_inference_stub(prompt, width, height)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        media_root = os.path.join(os.getcwd(), "media")
        os.makedirs(media_root, exist_ok=True)
        filename = f"generated_{abs(hash(prompt)) % (10**8)}.png"
        filepath = os.path.join(media_root, filename)
        with open(filepath, "wb") as f:
            f.write(image_bytes)

        record = GeneratedImage.objects.create(prompt=prompt, image=f"generated/{filename}")

        return Response({"url": f"/media/{filename}", "id": record.id}, status=status.HTTP_201_CREATED)

class GeneratedListView(generics.ListAPIView):
    queryset = GeneratedImage.objects.all().order_by("-created_at")
    serializer_class = GeneratedImageSerializer

def run_inference_stub(prompt: str, width: int, height: int) -> bytes:
    from PIL import Image
    import io
    img = Image.new("RGB", (width, height), color=(120, 180, 200))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()
