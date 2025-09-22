# DreamSketch AI - Ghibli Image Generator

A complete, production-ready web application for generating stunning AI artwork with Ghibli-style aesthetics using state-of-the-art diffusion models.

## 🎨 Features

- **Multiple AI Models**: DreamShaper v8, Anything v5, and Stable Diffusion XL
- **Dual Generation Modes**: Text-to-image and image-to-image transformation
- **Advanced Controls**: CFG scale, steps, aspect ratios, seed management
- **Real-time Progress**: WebSocket-based generation tracking
- **Upscaling & Enhancement**: Real-ESRGAN integration with face restoration
- **Responsive Design**: Beautiful Ghibli-themed UI with dark mode support
- **Production Ready**: Docker deployment, comprehensive testing, CI/CD

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or 3.11 (Python 3.12+ not recommended due to transformers compatibility)
- Node.js 18+
- NVIDIA GPU with 6GB+ VRAM (optional but recommended)
- CUDA 11.8+ for GPU acceleration
- Docker & Docker Compose (for containerized deployment)

### Setup Scripts

**Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```batch
setup.bat
```

### Docker Deployment

**CPU Version (for development/testing):**
```bash
docker-compose -f docker-compose.cpu.yml up
```

**GPU Version (for production):**
```bash
docker-compose up
```

## 📁 Project Structure

```
dreamsketch-ai/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (theme, generation)
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Django REST API
│   ├── api/               # API endpoints
│   ├── ml/                # ML inference logic
│   │   ├── models/        # Model management
│   │   ├── pipelines/     # Generation pipelines
│   │   └── utils/         # Utility functions
│   ├── core/              # Django core settings
│   └── requirements.txt
├── docker/                # Docker configurations
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── Dockerfile.gpu
├── docs/                  # Documentation
│   ├── API.md             # API documentation
│   ├── ARCHITECTURE.md    # System architecture
│   └── MODEL_README.md    # Model information
├── tests/                 # Test suites
│   ├── frontend/          # Frontend tests
│   ├── backend/           # Backend tests
│   └── integration/       # Integration tests
├── scripts/               # Utility scripts
│   ├── setup.sh
│   ├── setup.bat
│   ├── download_models.py
│   └── run_tests.sh
├── docker-compose.yml     # GPU production setup
├── docker-compose.cpu.yml # CPU development setup
├── .env.example          # Environment variables template
└── README.md
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost/dreamsketch
REDIS_URL=redis://localhost:6379

# AI Models
HF_TOKEN=your_huggingface_token
MODELS_PATH=/app/models

# GPU Settings
CUDA_VISIBLE_DEVICES=0
TORCH_CUDA_ARCH_LIST="7.5;8.0;8.6"

# Security
SECRET_KEY=your_secret_key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1

# Media Storage
MEDIA_ROOT=/app/media
MEDIA_URL=/media/
```

### Model Configuration

The application supports these models by default:

1. **DreamShaper v8** (`Lykon/dreamshaper-8`)
   - Best for: Ghibli-style landscapes and magical scenes
   - VRAM Required: 6GB
   - Specialty: Painterly, dreamy aesthetics

2. **Anything v5** (`Lykon/anything-v5-pruned`)
   - Best for: Anime portraits and character art
   - VRAM Required: 4GB
   - Specialty: Clean anime aesthetics

3. **Stable Diffusion XL** (`stabilityai/stable-diffusion-xl-base-1.0`)
   - Best for: High-resolution detailed artwork
   - VRAM Required: 12GB
   - Specialty: Photo-realistic detail

## 🖥️ Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The React development server will start on `http://localhost:5173`

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The Django development server will start on `http://localhost:8000`

### Model Downloads

```bash
cd scripts
python download_models.py
```

This will download and cache the required models locally.

## 🧪 Testing

### Run All Tests

```bash
./scripts/run_tests.sh
```

### Individual Test Suites

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && python -m pytest

# Integration tests
cd tests/integration && python -m pytest
```

## 🚀 API Reference

### Generation Endpoints

**POST `/api/v1/generate/txt2img`**
```json
{
  "model": "dreamshaper-v8",
  "prompt": "A magical forest clearing with floating lanterns",
  "negative_prompt": "blurry, low quality",
  "steps": 20,
  "guidance": 7.5,
  "width": 512,
  "height": 512,
  "seed": 42,
  "upscale": false
}
```

**POST `/api/v1/generate/img2img`**
```json
{
  "model": "dreamshaper-v8",
  "prompt": "Transform into Ghibli style",
  "image": "base64_encoded_image",
  "strength": 0.75,
  "steps": 20,
  "guidance": 7.5
}
```

### Status Endpoints

**GET `/api/v1/status`**
Returns system health and GPU availability.

**GET `/api/v1/models`**
Lists available models and their VRAM requirements.

## 🎯 Performance Optimization

### GPU Settings

For optimal performance:

```python
# Enable memory-efficient attention
pipeline.enable_attention_slicing()
pipeline.enable_xformers_memory_efficient_attention()

# Use mixed precision
torch.autocast('cuda', dtype=torch.float16)

# Enable channels last memory format
pipeline.unet.to(memory_format=torch.channels_last)
```

### CPU Fallback

The application gracefully falls back to CPU inference with optimized settings:

- Reduced default resolution (512x512)
- Lower step count (12-15 steps)
- Disabled upscaling
- Memory-efficient operations

## 🐳 Production Deployment

### Docker Compose (Recommended)

1. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

2. **Start services:**
   ```bash
   docker-compose up -d
   ```

3. **Check logs:**
   ```bash
   docker-compose logs -f
   ```

### Manual Deployment

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy backend:**
   ```bash
   cd backend
   gunicorn core.wsgi:application --bind 0.0.0.0:8000
   ```

3. **Serve static files with nginx**

## 🔧 Troubleshooting

### Common Issues

**1. Python 3.12+ Compatibility**
- Use Python 3.10 or 3.11
- Install transformers from source if needed

**2. CUDA Version Mismatch**
```bash
# Check CUDA version
nvidia-smi

# Install compatible PyTorch
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

**3. Out of Memory Errors**
- Reduce batch size
- Enable attention slicing
- Use lower resolution
- Switch to CPU inference

**4. Model Download Issues**
- Set HuggingFace token in environment
- Check internet connectivity
- Verify disk space (models are 2-6GB each)

**5. AddedToken Hash Error (Python 3.12+)**
```python
# Add to your environment
export PYTHONHASHSEED=0
```

### Performance Tips

1. **GPU Optimization:**
   - Use fp16 precision
   - Enable xformers
   - Set optimal batch size

2. **Memory Management:**
   - Clear CUDA cache regularly
   - Use gradient checkpointing
   - Enable attention slicing

3. **Model Loading:**
   - Pre-warm models on startup
   - Use model switching efficiently
   - Cache compiled models

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Stability AI](https://stability.ai/) for Stable Diffusion
- [Hugging Face](https://huggingface.co/) for the Diffusers library
- [Studio Ghibli](https://www.ghibli.jp/) for artistic inspiration
- The open-source AI art community

## 📞 Support

- **Documentation:** [Full docs](docs/)
- **Issues:** [GitHub Issues](https://github.com/your-repo/issues)
- **Discord:** [Community Discord](https://discord.gg/your-invite)
- **Email:** support@dreamsketch-ai.com

---

Made with ❤️ for the AI art community