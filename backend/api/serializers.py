# backend/api/serializers.py
from rest_framework import serializers

class GenerateImageSerializer(serializers.Serializer):
    prompt = serializers.CharField(allow_blank=False)
    negative_prompt = serializers.CharField(required=False, allow_blank=True, default="")
    model_id = serializers.CharField(required=False, allow_blank=True, default="sdxl")
    steps = serializers.IntegerField(required=False, default=30, min_value=1)
    guidance_scale = serializers.FloatField(required=False, default=7.5)
    width = serializers.IntegerField(required=False, default=512, min_value=16)
    height = serializers.IntegerField(required=False, default=512, min_value=16)

class GeneratedImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    url = serializers.CharField()
    prompt = serializers.CharField()
    created_at = serializers.DateTimeField()
