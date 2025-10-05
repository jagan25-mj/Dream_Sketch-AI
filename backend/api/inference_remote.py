import os
import requests
from pathlib import Path
from dotenv import load_dotenv
import logging

env_path = Path(__file__).resolve().parents[1] / ".env"
if env_path.exists():
    load_dotenv(env_path)

logger = logging.getLogger(__name__)

HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    HF_TOKEN = None

MODEL_MAP = {
    "sdxl-base": "stabilityai/stable-diffusion-xl-base-1.0",
    "stable-diffusion-v1-5": "runwayml/stable-diffusion-v1-5",
    "stable-diffusion-v2-1": "stabilityai/stable-diffusion-2-1",
    "openjourney": "prompthero/openjourney-v4",
    "dreamshaper-v8": "Lykon/DreamShaper",
}

HF_INFERENCE_BASE = "https://api-inference.huggingface.co/models"

HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}


def _call_hf_inference(repo_id: str, payload: dict, timeout: int = 300):
    url = f"{HF_INFERENCE_BASE}/{repo_id}"
    resp = requests.post(url, headers=HEADERS, json=payload, timeout=timeout)
    return resp


def generate_image_remote(
    model_id: str,
    prompt: str,
    negative_prompt: str = "",
    width: int = 512,
    height: int = 512,
    steps: int = 30,
    guidance_scale: float = 7.5,
    seed: int = None,
) -> bytes:
    if model_id not in MODEL_MAP:
        raise ValueError(f"unknown model_id: {model_id}")

    repo = MODEL_MAP[model_id]

    payload = {
        "inputs": prompt,
        "parameters": {
            "negative_prompt": negative_prompt or None,
            "height": int(height),
            "width": int(width),
            "num_inference_steps": int(steps),
            "guidance_scale": float(guidance_scale),
        },
        "options": {"wait_for_model": True}
    }

    if seed is not None:
        payload["parameters"]["seed"] = int(seed)

    logger.info(f"Calling HuggingFace API for {model_id}")

    resp = _call_hf_inference(repo, payload)

    content_type = resp.headers.get("Content-Type", "")
    if resp.status_code != 200:
        try:
            j = resp.json()
            raise RuntimeError(f"HuggingFace error {resp.status_code}: {j}")
        except Exception:
            raise RuntimeError(f"HuggingFace error {resp.status_code}: {resp.text}")

    if content_type.startswith("application/json"):
        j = resp.json()
        if isinstance(j, dict) and "images" in j and isinstance(j["images"], list) and j["images"]:
            import base64
            img_b64 = j["images"][0]
            return base64.b64decode(img_b64)
        raise RuntimeError(f"HuggingFace returned JSON, cannot extract image: {j}")

    return resp.content
