import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from typing import Optional

env_path = Path(__file__).resolve().parents[1] / ".env"
if env_path.exists():
    load_dotenv(env_path)

logger = logging.getLogger(__name__)

USE_LOCAL_MODELS = os.getenv("USE_LOCAL_MODELS", "true").lower() == "true"

try:
    if USE_LOCAL_MODELS:
        from .inference_local import generate_image_local as generate_image
        from .model_loader import model_manager

        MODEL_MAP = {model["id"]: model for model in model_manager.get_available_models()}
        logger.info(f"Using local PyTorch models. Available: {list(MODEL_MAP.keys())}")
    else:
        from .inference_remote import generate_image_remote as generate_image
        from .inference_remote import MODEL_MAP
        logger.info(f"Using remote HuggingFace API. Available: {list(MODEL_MAP.keys())}")
except ImportError as e:
    logger.error(f"Failed to import inference module: {e}")
    MODEL_MAP = {}
    generate_image = None
