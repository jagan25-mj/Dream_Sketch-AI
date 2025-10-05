from rest_framework import serializers

class GenerateImageSerializer(serializers.Serializer):
    prompt = serializers.CharField(allow_blank=False, max_length=2000)
    negative_prompt = serializers.CharField(required=False, allow_blank=True, default="", max_length=2000)
    model_id = serializers.CharField(required=False, allow_blank=True, default="sdxl-turbo")
    steps = serializers.IntegerField(required=False, default=30, min_value=1, max_value=150)
    guidance_scale = serializers.FloatField(required=False, default=7.5, min_value=1.0, max_value=20.0)
    width = serializers.IntegerField(required=False, default=512, min_value=64, max_value=2048)
    height = serializers.IntegerField(required=False, default=512, min_value=64, max_value=2048)
    seed = serializers.IntegerField(required=False, allow_null=True, default=None)

class GeneratedImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    url = serializers.CharField()
    prompt = serializers.CharField()
    created_at = serializers.DateTimeField()

class ModelInfoSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    default_size = serializers.IntegerField(required=False)
