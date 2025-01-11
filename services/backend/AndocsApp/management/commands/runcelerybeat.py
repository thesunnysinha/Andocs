import subprocess
from django.core.management.base import BaseCommand


import structlog

logger = structlog.get_logger(__name__)

class Command(BaseCommand):
    help = 'Run Celery beat for Django application'

    def handle(self, *args, **options):

        # Wait for the backend to be ready
        self.stdout.write('Waiting for the backend to be ready...')
        try:
            subprocess.run(['/app/wait-for-it.sh', 'backend:8000', '--timeout=0'], check=True)
            self.stdout.write(self.style.SUCCESS('Backend is ready!'))
        except subprocess.CalledProcessError as e:
            logger.error('Backend is not ready: %s', e)
            self.stdout.write(self.style.ERROR('Backend is not ready!'))
            return

        # Start Celery beat
        self.stdout.write(self.style.SUCCESS(f"Starting Celery beat"))

        celery_command = ['celery', '-A', 'Andocs', 'beat','--loglevel=info']

        try:
            subprocess.run(celery_command, check=True)
        except subprocess.CalledProcessError as e:
            self.stderr.write(self.style.ERROR(f"Error starting Celery beat: {e}"))

        self.stdout.write(self.style.SUCCESS(f"Started Celery beat"))
