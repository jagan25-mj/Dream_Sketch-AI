# DreamSketch AI - Setup Guide

This guide will help you set up DreamSketch AI for development and production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Manual Setup](#manual-setup)
- [Docker Setup](#docker-setup)
- [Environment Configuration](#environment-configuration)
- [Model Setup](#model-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Python 3.10 or 3.11** (Python 3.12+ not recommended due to transformers compatibility)
- **Node.js 18+** and npm
- **Git** for version control

### Optional but Recommended

- **NVIDIA GPU** with 6GB+ VRAM for optimal performance
- **CUDA 11.8+** for GPU acceleration
- **Docker & Docker Compose** for containerized deployment

### System Requirements

**Minimum (CPU only):**
- 8GB RAM
- 20GB free disk space
- CPU with AVX support

**Recommended (GPU):**
- 16GB+ RAM
- NVIDIA RTX 3060/4060 or better (6GB+ VRAM)
- 50GB+ free disk space (for models)
- CUDA 11.8 or 12.x

## Quick Start

### Using Setup Scripts

The fastest way to get started is using our setup scripts:

**Linux/macOS:**
```bash
git clone <repository-url>
cd dreamsketch-ai
chmod +x setup.sh
./setup.sh
```

**Windows:**
```batch
git clone <repository-url>
cd dreamsketch-ai
setup.bat
```

The setup script will:
1. Check Python version compatibility
2. Create virtual environments
3. Install dependencies
4. Download initial models
5. Set up environment files
6. Run initial tests

### Using Docker (Recommended for Production)

```bash
git clone <repository-url>
cd dreamsketch-ai
cp .env.example .env
# Edit .env with your settings
docker-compose up
```

## Manual Setup

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd dreamsketch-ai
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate     # Windows

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Install PyTorch (GPU version)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Download Models

```bash
cd ../scripts
python download_models.py
```

## Docker Setup

### Development Environment (CPU)

```bash
# Use CPU-only configuration
docker-compose -f docker-compose.cpu.yml up
```

### Production Environment (GPU)

```bash
# Ensure NVIDIA Docker runtime is installed
docker-compose up
```

### Custom Docker Build

```bash
# Build custom images
docker-compose build

# Start with custom configuration
docker-compose -f docker-compose.custom.yml up
```

## Environment Configuration

### Backend Environment (.env)

Copy `.env.example` to `.env` and configure:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@localhost/dreamsketch

# Redis (for job queue)
REDIS_URL=redis://localhost:6379/0

# AI Models
HF_TOKEN=your_huggingface_token
MODELS_PATH=/app/models
DEFAULT_MODEL=dreamshaper-v8

# GPU Settings
CUDA_VISIBLE_DEVICES=0
TORCH_CUDA_ARCH_LIST="7.5;8.0;8.6"
ENABLE_XFORMERS=true
ENABLE_ATTENTION_SLICING=true

# Media Storage
MEDIA_ROOT=/app/media
MEDIA_URL=/media/
MAX_UPLOAD_SIZE=10485760  # 10MB

# Security
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
SECURE_SSL_REDIRECT=False  # Set to True in production

# Monitoring
SENTRY_DSN=your_sentry_dsn_here
```

### Frontend Environment

Create `.env.local` in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_ENABLE_DEBUG=true
```

## Model Setup

### Hugging Face Token

1. Create account at [huggingface.co](https://huggingface.co)
2. Go to Settings → Access Tokens
3. Create new token with "Read" permissions
4. Add token to your `.env` file

### Download Models

```bash
# Using the download script
cd scripts
python download_models.py

# Or manually via huggingface-hub
pip install huggingface_hub
huggingface-cli login
huggingface-cli download Lykon/dreamshaper-8
```

### Model Storage

Models are stored in the following structure:

```
models/
├── dreamshaper-v8/
│   ├── model_index.json
│   ├── text_encoder/
│   ├── unet/
│   ├── vae/
│   └── scheduler/
├── anything-v5/
└── sdxl/
```

## Testing the Setup

### Backend Tests

```bash
cd backend
python -m pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Integration Tests

```bash
# Full integration test
./scripts/run_tests.sh

# Quick smoke test
python scripts/smoke_test.py
```

### Test Generation

```bash
# Test with CPU (fast)
curl -X POST http://localhost:8000/api/v1/generate/txt2img \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dreamshaper-v8",
    "prompt": "a simple test image",
    "steps": 5,
    "width": 256,
    "height": 256
  }'
```

## Troubleshooting

### Common Issues

**1. Python Version Issues**

```bash
# Check Python version
python --version

# Use Python 3.11 specifically
python3.11 -m venv venv
```

**2. CUDA Issues**

```bash
# Check CUDA installation
nvidia-smi

# Verify PyTorch CUDA
python -c "import torch; print(torch.cuda.is_available())"

# Reinstall PyTorch with correct CUDA version
pip uninstall torch torchvision torchaudio
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

**3. Memory Issues**

```bash
# Monitor GPU memory
watch -n 1 nvidia-smi

# Clear CUDA cache
python -c "import torch; torch.cuda.empty_cache()"
```

**4. Model Download Issues**

```bash
# Set Hugging Face cache directory
export HF_HOME=/path/to/cache

# Download specific model
huggingface-cli download Lykon/dreamshaper-8 --cache-dir /path/to/cache
```

**5. Permission Issues (Linux)**

```bash
# Fix model directory permissions
sudo chown -R $USER:$USER models/

# Fix Docker permissions
sudo usermod -aG docker $USER
```

### Performance Optimization

**1. GPU Optimization**

```python
# In settings.py
TORCH_COMPILE = True
ENABLE_XFORMERS = True
ENABLE_ATTENTION_SLICING = True
ENABLE_SEQUENTIAL_CPU_OFFLOAD = False  # Only if low VRAM
```

**2. Memory Management**

```python
# Low VRAM settings
ENABLE_ATTENTION_SLICING = True
ENABLE_CPU_OFFLOAD = True
MAX_BATCH_SIZE = 1
```

**3. CPU Optimization**

```python
# CPU-only settings
TORCH_NUM_THREADS = 4
MKL_NUM_THREADS = 4
OMP_NUM_THREADS = 4
```

### Development Tips

**1. Hot Reloading**

```bash
# Backend (auto-reload on file changes)
python manage.py runserver --settings=core.settings.dev

# Frontend (Vite dev server)
npm run dev
```

**2. Debugging**

```bash
# Enable Django debug mode
DEBUG=True in .env

# Frontend debugging
VITE_ENABLE_DEBUG=true in .env.local
```

**3. Database Reset**

```bash
# Reset database
python manage.py flush --noinput
python manage.py migrate
```

## Next Steps

After successful setup:

1. **Read the [API Documentation](API.md)**
2. **Check the [Architecture Guide](ARCHITECTURE.md)**
3. **Explore [Model Information](MODEL_README.md)**
4. **Review the [Deployment Guide](DEPLOYMENT.md)**

## Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community for support
- **Documentation**: Check our comprehensive docs
- **Email**: support@dreamsketch-ai.com

---

Need help? Check our [FAQ](FAQ.md) or join our [Discord community](https://discord.gg/dreamsketch).