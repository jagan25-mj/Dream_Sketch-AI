# backend/api/inference.py
import os
import requests
from pathlib import Path
from dotenv import load_dotenv

# load backend/.env if present
env_path = Path(__file__).resolve().parents[1] / ".env"
if env_path.exists():
    load_dotenv(env_path)

HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    # if not set, raise on usage (caller should handle)
    HF_TOKEN = None

# Map friendly model ids -> HF model repo names (you can edit)
MODEL_MAP = {
    # well-known hosted models that typically work with the HF Inference API
    "sdxl": "stabilityai/stable-diffusion-xl-base-1.0",
    "sd-v1-5": "runwayml/stable-diffusion-v1-5",
    "sd-v2-1": "stabilityai/stable-diffusion-2-1",
    "openjourney": "prompthero/openjourney-v4",           # stylized anime/illustration
    "anything-v5": "gsdf/Counterfeit-V2.5",              # community anime-style
    # remove dreamshaper-v8 if it isn't hosted for inference in your account
}

HF_INFERENCE_BASE = "https://api-inference.huggingface.co/models"

HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}

def _call_hf_inference(repo_id: str, payload: dict, timeout: int = 300):
    """
    Call the Hugging Face inference API for repo_id with payload.
    Returns `requests.Response`.
    """
    url = f"{HF_INFERENCE_BASE}/{repo_id}"
    resp = requests.post(url, headers=HEADERS, json=payload, timeout=timeout)
    return resp

def generate_image(
    model_id: str,
    prompt: str,
    negative_prompt: str = "",
    width: int = 512,
    height: int = 512,
    steps: int = 30,
    guidance_scale: float = 7.5,
) -> bytes:
    """
    Use HF Inference API to generate an image, return PNG bytes.
    Raises RuntimeError with server text if failure.
    """
    if model_id not in MODEL_MAP:
        raise ValueError(f"unknown model_id: {model_id}")

    repo = MODEL_MAP[model_id]

    # Some HF hosted models expect "inputs" as prompt and "parameters" for settings.
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

    resp = _call_hf_inference(repo, payload)

    # HF will return image bytes (content-type like image/png) on success, or JSON error on failure.
    content_type = resp.headers.get("Content-Type", "")
    if resp.status_code != 200:
        # try decode JSON message if present
        try:
            j = resp.json()
            raise RuntimeError(f"HuggingFace error {resp.status_code}: {j}")
        except Exception:
            raise RuntimeError(f"HuggingFace error {resp.status_code}: {resp.text}")

    # If HF returns JSON (sometimes tokens/warnings), try to parse an image from base64 or returned array
    if content_type.startswith("application/json"):
        # attempt parse returned base64 or error
        j = resp.json()
        # Some HF endpoints return {'images': ['base64...']} or similar - handle common cases
        if isinstance(j, dict) and "images" in j and isinstance(j["images"], list) and j["images"]:
            import base64
            img_b64 = j["images"][0]
            return base64.b64decode(img_b64)
        raise RuntimeError(f"HuggingFace returned JSON, cannot extract image: {j}")

    # Otherwise return raw bytes (image/png etc.)
    return resp.content
