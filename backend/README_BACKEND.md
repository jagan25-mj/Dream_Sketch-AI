# DreamSketch AI Backend

Django REST API backend with PyTorch and Hugging Face Transformers for AI image generation.

## Quick Start

### 1. Create and activate virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

For GPU support, install PyTorch with CUDA:
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:
- `USE_LOCAL_MODELS=true` for local PyTorch inference
- `HF_TOKEN=your_token` for HuggingFace access
- `SECRET_KEY=your-secret-key`

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. (Optional) Preload models

```bash
python manage.py preload_models --models stable-diffusion-v1-5
```

### 6. Start development server

```bash
python manage.py runserver 0.0.0.0:8000
```

## API Endpoints

### Health Check
**GET** `/api/health/`

Returns server status.

### System Status
**GET** `/api/status/`

Returns system info, GPU status, and loaded models.

### Available Models
**GET** `/api/models/`

Returns list of available AI models.

### Text-to-Image Generation
**POST** `/api/txt2img/`

```json
{
  "prompt": "A beautiful Ghibli-style landscape",
  "negative_prompt": "blurry, low quality",
  "model_id": "stable-diffusion-v1-5",
  "width": 512,
  "height": 512,
  "steps": 30,
  "guidance_scale": 7.5,
  "seed": 42
}
```

### Image-to-Image Generation
**POST** `/api/img2img/`

Same parameters as txt2img.

### Get Generated Images
**GET** `/api/results/?limit=20`

Returns recently generated images.

## PyTorch Integration

See [README_PYTORCH.md](./README_PYTORCH.md) for detailed information about:
- Model architecture and configuration
- GPU acceleration
- Memory management
- Performance optimization

## Docker

```bash
docker-compose up --build
```

## Project Structure

```
backend/
├── api/
│   ├── inference.py           # Inference router
│   ├── inference_local.py     # Local PyTorch inference
│   ├── inference_remote.py    # Remote HF API inference
│   ├── model_loader.py        # Model management
│   ├── views.py               # API endpoints
│   ├── models.py              # Database models
│   ├── serializers.py         # Request/response serializers
│   ├── utils.py               # Utility functions
│   └── management/
│       └── commands/
│           └── preload_models.py  # Model preloading command
├── config/
│   ├── settings.py            # Django settings
│   └── urls.py                # URL configuration
├── media/                     # Generated images
├── requirements.txt           # Python dependencies
└── manage.py                  # Django management script
```

## Tech Stack

- **Django 4.2**: Web framework
- **Django REST Framework**: API framework
- **PyTorch 2.1+**: Deep learning framework
- **Transformers**: Hugging Face transformers library
- **Diffusers**: Stable Diffusion pipelines
- **Pillow**: Image processing
- **CUDA**: GPU acceleration (optional)
