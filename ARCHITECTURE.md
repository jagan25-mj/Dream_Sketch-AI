# DreamSketch AI - System Architecture

## Overview

DreamSketch AI is a full-stack AI image generation platform combining a React/TypeScript frontend with a Django backend powered by PyTorch and Hugging Face Transformers.

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API framework
- **PyTorch 2.1+** - Deep learning
- **Transformers 4.36+** - Hugging Face models
- **Diffusers 0.25+** - Stable Diffusion pipelines
- **Pillow** - Image processing

## System Components

### Frontend Architecture

```
src/
├── components/
│   ├── generation/        # Image generation components
│   │   ├── GenerationForm.tsx
│   │   ├── ModelSelector.tsx
│   │   ├── ParameterControls.tsx
│   │   ├── ProgressPanel.tsx
│   │   ├── ResultsGallery.tsx
│   │   └── SuggestedPrompts.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── contexts/             # React contexts
│   ├── GenerationContext.tsx
│   └── ThemeContext.tsx
├── pages/               # Page components
│   ├── Home.tsx
│   ├── Gallery.tsx
│   ├── Docs.tsx
│   └── Settings.tsx
├── types/               # TypeScript types
├── utils/               # Utilities
│   ├── api.ts          # API client
│   ├── constants.ts    # Constants
│   └── validation.ts   # Validators
└── App.tsx             # Root component
```

#### Key Frontend Features
- Real-time image generation
- Parameter controls (steps, guidance, size)
- Model selection interface
- Results gallery with history
- Dark mode support
- Responsive design

### Backend Architecture

```
backend/
├── api/
│   ├── inference.py              # Inference router
│   ├── inference_local.py        # Local PyTorch inference
│   ├── inference_remote.py       # Remote HF API inference
│   ├── model_loader.py           # Model management
│   ├── views.py                  # API endpoints
│   ├── models.py                 # Database models
│   ├── serializers.py            # Serializers
│   ├── utils.py                  # Utilities
│   └── management/
│       └── commands/
│           └── preload_models.py # Model preloader
├── config/
│   ├── settings.py               # Django settings
│   └── urls.py                   # URL routing
└── media/
    └── generated/                # Generated images
```

#### Key Backend Features
- PyTorch model inference
- Automatic model caching
- GPU acceleration (CUDA)
- Memory optimization
- RESTful API
- Image storage and serving

## Data Flow

### Image Generation Flow

```
1. User submits prompt in UI
   ↓
2. Frontend sends POST to /api/txt2img/
   {
     prompt: string,
     model_id: string,
     width: number,
     height: number,
     steps: number,
     guidance_scale: number,
     seed?: number
   }
   ↓
3. Django view validates request
   ↓
4. Inference module loads/uses model
   ↓
5. PyTorch generates image
   - Load model from HF Hub
   - Run diffusion pipeline
   - Apply guidance and steps
   ↓
6. Image saved to media/generated/
   ↓
7. Database record created
   ↓
8. Response sent with image URL
   {
     status: "success",
     result: {
       id: number,
       url: string,
       prompt: string,
       created_at: string
     }
   }
   ↓
9. Frontend displays image
```

## Model Management

### Local Model System

The `ModelManager` singleton handles:

1. **Model Loading**
   - Downloads from Hugging Face Hub
   - Caches in `~/.cache/huggingface/`
   - Loads into GPU/CPU memory
   - Applies memory optimizations

2. **Supported Models**
   - Stable Diffusion v1.5 (512x512)
   - Stable Diffusion v2.1 (768x768)
   - DreamShaper v8 (512x512)
   - SDXL Base (1024x1024)
   - OpenJourney v4 (512x512)

3. **Memory Optimization**
   - Attention slicing
   - VAE slicing
   - FP16 precision on GPU
   - Lazy loading (load on first use)

### Remote API Fallback

When `USE_LOCAL_MODELS=false`:
- Uses HuggingFace Inference API
- Requires HF_TOKEN
- No local GPU needed
- Higher latency

## API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health/` | Health check |
| GET | `/api/status/` | System status and GPU info |
| GET | `/api/models/` | Available models |
| POST | `/api/txt2img/` | Text-to-image generation |
| POST | `/api/img2img/` | Image-to-image generation |
| GET | `/api/results/?limit=N` | Recent generations |

### Request/Response Examples

**Generate Image:**
```bash
curl -X POST http://localhost:8000/api/txt2img/ \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful landscape",
    "model_id": "stable-diffusion-v1-5",
    "width": 512,
    "height": 512,
    "steps": 30,
    "guidance_scale": 7.5
  }'
```

**Response:**
```json
{
  "status": "success",
  "result": {
    "id": 1,
    "url": "http://localhost:8000/media/generated/image_123.png",
    "prompt": "A beautiful landscape",
    "created_at": "2025-10-04T23:00:00Z"
  }
}
```

## Database Schema

### GeneratedImage Model

```python
class GeneratedImage(models.Model):
    id = AutoField(primary_key=True)
    prompt = TextField()
    image = ImageField(upload_to='generated/')
    created_at = DateTimeField(auto_now_add=True)
```

## Configuration

### Environment Variables

**Backend (.env):**
```env
DEBUG=True
SECRET_KEY=your-secret-key
USE_LOCAL_MODELS=true
HF_TOKEN=your_huggingface_token
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8000/api
```

## Deployment

### Local Development

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
npm install
npm run dev
```

### Docker

```bash
cd backend
docker-compose up --build
```

### Production Considerations

1. **Security**
   - Set strong SECRET_KEY
   - Enable HTTPS
   - Configure CORS properly
   - Use environment variables

2. **Performance**
   - Preload models at startup
   - Use GPU for inference
   - Enable model caching
   - Configure CDN for images

3. **Scaling**
   - Load balance multiple workers
   - Queue long-running tasks
   - Use cloud storage for images
   - Cache model predictions

## Performance Metrics

### Inference Times (approximate)

| Model | Resolution | GPU (RTX 3090) | CPU (16 core) |
|-------|-----------|----------------|---------------|
| SD v1.5 | 512x512 | 2-3s | 45-60s |
| SD v2.1 | 768x768 | 4-5s | 90-120s |
| SDXL | 1024x1024 | 8-10s | 180-240s |

### Resource Requirements

**Minimum:**
- CPU: 4 cores
- RAM: 8GB
- Storage: 10GB (per model)

**Recommended:**
- GPU: NVIDIA RTX 3060+ (12GB VRAM)
- RAM: 16GB
- Storage: 50GB SSD

## Troubleshooting

### Common Issues

1. **Out of Memory**
   - Reduce image size
   - Lower steps count
   - Use smaller model
   - Enable attention slicing

2. **Slow Inference**
   - Use GPU
   - Preload models
   - Reduce steps
   - Optimize batch size

3. **Model Download Fails**
   - Check HF_TOKEN
   - Verify network
   - Check disk space
   - Try different mirror

## Development Tools

### Management Commands

```bash
# Preload a specific model
python manage.py preload_models --models stable-diffusion-v1-5

# Preload all models
python manage.py preload_models --all

# Test backend setup
python test_backend.py
```

### Testing

```bash
# Frontend
npm run lint
npm run type-check

# Backend
python manage.py test
```

## Future Enhancements

- [ ] ControlNet support
- [ ] LoRA model support
- [ ] Batch generation queue
- [ ] User authentication
- [ ] Image upscaling
- [ ] Advanced editing tools
- [ ] Model fine-tuning interface
- [ ] Cloud storage integration
- [ ] Real-time progress streaming
- [ ] Multi-language support
