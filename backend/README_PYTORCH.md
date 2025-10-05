# PyTorch & Hugging Face Integration

This backend uses PyTorch and Hugging Face Transformers/Diffusers for AI image generation.

## Features

- Local PyTorch model inference using Diffusers pipelines
- Support for multiple Stable Diffusion models
- Automatic model caching and management
- GPU acceleration (CUDA) when available
- Memory-optimized inference with attention slicing
- Fallback to HuggingFace Inference API

## Supported Models

### Local Models (PyTorch)
- `stable-diffusion-v1-5`: Runwayml SD v1.5 (512x512)
- `stable-diffusion-v2-1`: Stability AI SD v2.1 (768x768)
- `dreamshaper-v8`: Lykon DreamShaper (512x512)
- `sdxl-base`: Stability AI SDXL Base (1024x1024)
- `openjourney`: PromptHero OpenJourney v4 (512x512)

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env`:

```env
USE_LOCAL_MODELS=true
HF_TOKEN=your_huggingface_token_here
DEBUG=True
SECRET_KEY=your-secret-key
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Preload Models (Optional)

Preload a specific model:

```bash
python manage.py preload_models --models stable-diffusion-v1-5
```

Preload all models:

```bash
python manage.py preload_models --all
```

### 5. Start Server

```bash
python manage.py runserver 0.0.0.0:8000
```

## API Endpoints

### Generate Image (Text-to-Image)

**POST** `/api/txt2img/`

```json
{
  "prompt": "A beautiful landscape with mountains",
  "negative_prompt": "blurry, low quality",
  "model_id": "stable-diffusion-v1-5",
  "width": 512,
  "height": 512,
  "steps": 30,
  "guidance_scale": 7.5,
  "seed": 42
}
```

### Get Available Models

**GET** `/api/models/`

Returns list of available models with their configurations.

### Get System Status

**GET** `/api/status/`

Returns system information including GPU availability and loaded models.

### Get Generated Images

**GET** `/api/results/?limit=20`

Returns recently generated images.

## Architecture

### Model Loading (`model_loader.py`)

The `ModelManager` class handles:
- Loading models from HuggingFace Hub
- Caching loaded models in memory
- GPU/CPU device management
- Memory optimization (attention slicing, VAE slicing)

### Inference Modules

- `inference_local.py`: Local PyTorch inference using Diffusers pipelines
- `inference_remote.py`: Remote inference via HuggingFace API
- `inference.py`: Router that selects local or remote based on `USE_LOCAL_MODELS`

### Views (`views.py`)

Django REST Framework views handle:
- Request validation
- Image generation orchestration
- File saving and URL generation
- Error handling

## Configuration

### Use Local Models

```env
USE_LOCAL_MODELS=true
```

Models will be downloaded to `~/.cache/huggingface/` on first use.

### Use Remote API

```env
USE_LOCAL_MODELS=false
HF_TOKEN=your_token_here
```

Requires a valid HuggingFace token with API access.

## GPU Acceleration

The backend automatically detects CUDA availability:

- **With CUDA**: Uses `torch.float16` and GPU acceleration
- **CPU Only**: Uses `torch.float32` and CPU inference (slower)

### Check GPU Status

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"Device: {torch.cuda.get_device_name(0)}")
```

## Memory Management

For systems with limited GPU memory:

- Attention slicing is enabled by default
- VAE slicing reduces memory usage
- Models are loaded on-demand
- Use `model_manager.unload_model(model_id)` to free memory

## Troubleshooting

### Out of Memory (OOM)

Reduce image dimensions or use CPU:

```python
# Lower resolution
width = 512
height = 512

# Reduce steps
steps = 20
```

### Model Download Issues

Ensure HuggingFace token is set:

```env
HF_TOKEN=hf_xxxxxxxxxxxxx
```

### Slow Inference

- Use GPU if available
- Reduce number of steps
- Use smaller models (v1.5 instead of SDXL)

## Performance Tips

1. **Preload models** before serving requests
2. **Use GPU** with CUDA for 10-50x speedup
3. **Keep models in memory** to avoid reload time
4. **Batch requests** when generating multiple images
5. **Use appropriate resolutions** for each model
