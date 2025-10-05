#!/bin/bash

set -e

echo "================================"
echo "DreamSketch AI Backend Setup"
echo "================================"
echo ""

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please edit .env file and add your HF_TOKEN"
    echo ""
fi

echo "Running database migrations..."
python manage.py migrate

echo ""
echo "Creating media directories..."
mkdir -p media/generated

echo ""
echo "================================"
echo "Setup complete!"
echo "================================"
echo ""
echo "To preload models (optional):"
echo "  python manage.py preload_models --models stable-diffusion-v1-5"
echo ""
echo "To test the setup:"
echo "  python test_backend.py"
echo ""
echo "To start the server:"
echo "  python manage.py runserver 0.0.0.0:8000"
echo ""
