import subprocess
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Run Gunicorn with Uvicorn for Django application'

    def handle(self, *args, **options):

        # Start Gunicorn with Uvicorn
        self.stdout.write(self.style.SUCCESS(f"Starting Gunicorn with Uvicorn"))

        gunicorn_command = ['gunicorn', 'Andocs.wsgi:application', '--config', '/app/gunicorn.prod.conf.py', '--reload']

        try:
            subprocess.run(gunicorn_command, check=True)
        except subprocess.CalledProcessError as e:
            self.stderr.write(self.style.ERROR(f"Error starting Gunicorn with Uvicorn: {e}"))

        self.stdout.write(self.style.SUCCESS(f"Started Gunicorn with Uvicorn"))
