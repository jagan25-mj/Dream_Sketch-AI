import os
import torch
from diffusers import (
    StableDiffusionPipeline,
    StableDiffusionXLPipeline,
    DPMSolverMultistepScheduler,
    EulerAncestralDiscreteScheduler
)
from transformers import CLIPTokenizer, CLIPTextModel
from typing import Optional, Dict
import logging

logger = logging.getLogger(__name__)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DTYPE = torch.float16 if torch.cuda.is_available() else torch.float32

MODEL_CONFIGS = {
    "stable-diffusion-v1-5": {
        "repo_id": "runwayml/stable-diffusion-v1-5",
        "pipeline_class": StableDiffusionPipeline,
        "default_size": 512,
    },
    "stable-diffusion-v2-1": {
        "repo_id": "stabilityai/stable-diffusion-2-1",
        "pipeline_class": StableDiffusionPipeline,
        "default_size": 768,
    },
    "dreamshaper-v8": {
        "repo_id": "Lykon/DreamShaper",
        "pipeline_class": StableDiffusionPipeline,
        "default_size": 512,
    },
    "sdxl-base": {
        "repo_id": "stabilityai/stable-diffusion-xl-base-1.0",
        "pipeline_class": StableDiffusionXLPipeline,
        "default_size": 1024,
    },
    "openjourney": {
        "repo_id": "prompthero/openjourney-v4",
        "pipeline_class": StableDiffusionPipeline,
        "default_size": 512,
    },
}


class ModelManager:
    _instance = None
    _loaded_models: Dict[str, any] = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        self.hf_token = os.getenv("HF_TOKEN")
        logger.info(f"ModelManager initialized. Device: {DEVICE}, Dtype: {DTYPE}")

    def load_model(self, model_id: str):
        if model_id in self._loaded_models:
            logger.info(f"Model {model_id} already loaded")
            return self._loaded_models[model_id]

        if model_id not in MODEL_CONFIGS:
            raise ValueError(f"Unknown model_id: {model_id}. Available: {list(MODEL_CONFIGS.keys())}")

        config = MODEL_CONFIGS[model_id]
        logger.info(f"Loading model {model_id} from {config['repo_id']}")

        try:
            pipeline_class = config["pipeline_class"]

            pipeline = pipeline_class.from_pretrained(
                config["repo_id"],
                torch_dtype=DTYPE,
                use_safetensors=True,
                token=self.hf_token,
            )

            pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
                pipeline.scheduler.config
            )

            pipeline = pipeline.to(DEVICE)

            if DEVICE == "cuda":
                try:
                    pipeline.enable_attention_slicing(1)
                    pipeline.enable_vae_slicing()
                except Exception as e:
                    logger.warning(f"Could not enable memory optimizations: {e}")

            self._loaded_models[model_id] = pipeline
            logger.info(f"Model {model_id} loaded successfully")
            return pipeline

        except Exception as e:
            logger.error(f"Failed to load model {model_id}: {str(e)}")
            raise

    def unload_model(self, model_id: str):
        if model_id in self._loaded_models:
            del self._loaded_models[model_id]
            if DEVICE == "cuda":
                torch.cuda.empty_cache()
            logger.info(f"Model {model_id} unloaded")

    def get_loaded_models(self):
        return list(self._loaded_models.keys())

    def get_available_models(self):
        return [
            {
                "id": model_id,
                "name": model_id.replace("-", " ").title(),
                "default_size": config["default_size"],
            }
            for model_id, config in MODEL_CONFIGS.items()
        ]


model_manager = ModelManager()
