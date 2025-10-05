#!/usr/bin/env python
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

import torch
from api.model_loader import model_manager, MODEL_CONFIGS
from api.utils import get_system_info

def test_pytorch():
    print("=" * 60)
    print("PyTorch Installation Check")
    print("=" * 60)
    print(f"PyTorch Version: {torch.__version__}")
    print(f"CUDA Available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"CUDA Version: {torch.version.cuda}")
        print(f"GPU Count: {torch.cuda.device_count()}")
        for i in range(torch.cuda.device_count()):
            print(f"  GPU {i}: {torch.cuda.get_device_name(i)}")
    else:
        print("Running on CPU (GPU not available)")
    print()

def test_transformers():
    print("=" * 60)
    print("Transformers & Diffusers Check")
    print("=" * 60)
    try:
        import transformers
        import diffusers
        print(f"Transformers Version: {transformers.__version__}")
        print(f"Diffusers Version: {diffusers.__version__}")
        print("Libraries imported successfully")
    except ImportError as e:
        print(f"Error importing libraries: {e}")
    print()

def test_model_configs():
    print("=" * 60)
    print("Available Model Configurations")
    print("=" * 60)
    for model_id, config in MODEL_CONFIGS.items():
        print(f"  {model_id}:")
        print(f"    Repo: {config['repo_id']}")
        print(f"    Default Size: {config['default_size']}x{config['default_size']}")
    print()

def test_system_info():
    print("=" * 60)
    print("System Information")
    print("=" * 60)
    info = get_system_info()
    for key, value in info.items():
        if key != 'devices':
            print(f"  {key}: {value}")

    if 'devices' in info and info['devices']:
        print("\n  GPU Devices:")
        for device in info['devices']:
            print(f"    Device {device['index']}: {device['name']}")
            print(f"      Total Memory: {device['memory_total'] / (1024**3):.2f} GB")
            print(f"      Allocated: {device['memory_allocated'] / (1024**3):.2f} GB")
    print()

def test_model_loading():
    print("=" * 60)
    print("Model Loading Test")
    print("=" * 60)
    print("This will attempt to load a small model...")
    print("Note: First load will download the model (may take several minutes)")
    print()

    try:
        model_id = "stable-diffusion-v1-5"
        print(f"Loading {model_id}...")
        pipeline = model_manager.load_model(model_id)
        print(f"Successfully loaded {model_id}")
        print(f"Device: {pipeline.device}")
        print(f"Dtype: {pipeline.dtype}")

        loaded = model_manager.get_loaded_models()
        print(f"\nCurrently loaded models: {loaded}")
    except Exception as e:
        print(f"Error loading model: {e}")
        print("\nThis is expected if:")
        print("  1. You haven't set HF_TOKEN in .env")
        print("  2. You don't have enough disk space")
        print("  3. Network connection issues")
    print()

def main():
    print("\n")
    print("#" * 60)
    print("# DreamSketch AI Backend - System Test")
    print("#" * 60)
    print()

    test_pytorch()
    test_transformers()
    test_model_configs()
    test_system_info()

    response = input("Do you want to test model loading? (y/N): ")
    if response.lower() == 'y':
        test_model_loading()

    print("=" * 60)
    print("Test completed!")
    print("=" * 60)

if __name__ == "__main__":
    main()
