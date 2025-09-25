# Backend quick start

1. Create and activate venv:
   python3 -m venv .venv
   source .venv/bin/activate

2. Install requirements:
   pip install -r requirements.txt

3. Copy .env.example -> .env and edit if needed:
   cp .env.example .env

4. Run migrations:
   python manage.py makemigrations
   python manage.py migrate

5. (Optional) create superuser:
   python manage.py createsuperuser

6. Run development server:
   python manage.py runserver 0.0.0.0:8000

APIs:
- GET /api/health/
- POST /api/generate/  JSON: { "prompt": "a ghibli lake at sunset" }
- GET /api/history/
