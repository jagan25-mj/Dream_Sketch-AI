from django.core.management.base import BaseCommand
from api.model_loader import model_manager, MODEL_CONFIGS
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Preload AI models into memory'

    def add_arguments(self, parser):
        parser.add_argument(
            '--models',
            nargs='+',
            type=str,
            help='Specific models to load (space-separated)',
        )
        parser.add_argument(
            '--all',
            action='store_true',
            help='Load all available models',
        )

    def handle(self, *args, **options):
        models_to_load = options.get('models', [])
        load_all = options.get('all', False)

        if load_all:
            models_to_load = list(MODEL_CONFIGS.keys())
        elif not models_to_load:
            models_to_load = ['stable-diffusion-v1-5']

        self.stdout.write(f"Loading models: {', '.join(models_to_load)}")

        for model_id in models_to_load:
            try:
                self.stdout.write(f"Loading {model_id}...")
                model_manager.load_model(model_id)
                self.stdout.write(self.style.SUCCESS(f"Successfully loaded {model_id}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed to load {model_id}: {str(e)}"))

        loaded_models = model_manager.get_loaded_models()
        self.stdout.write(self.style.SUCCESS(f"\nCurrently loaded models: {', '.join(loaded_models)}"))
