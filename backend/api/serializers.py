from rest_framework import serializers
from .models import GeneratedImage

class GenerateImageSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=1024)
    width = serializers.IntegerField(required=False, default=512)
    height = serializers.IntegerField(required=False, default=512)
    steps = serializers.IntegerField(required=False, default=20)

class GeneratedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedImage
        fields = "__all__"
