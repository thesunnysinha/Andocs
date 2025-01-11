import subprocess
import logging
from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    """Django command to execute custom management commands"""

    def handle(self, *args, **options):
        logger = logging.getLogger(__name__)

        #Setup the application
        self.stdout.write('Setting up the application...')
        try:
            call_command('setupapplication')
            self.stdout.write(self.style.SUCCESS('Application setup complete!'))
        except Exception as e:
            logger.error('Error setting up the application: %s', e)
            self.stdout.write(self.style.ERROR('Error setting up the application!'))
            return
        
        # Wait for the database to be ready
        self.stdout.write('Waiting for the database to be ready...')
        try:
            subprocess.run(['/app/wait-for-it.sh', 'db:5432', '--timeout=0'], check=True)
            self.stdout.write(self.style.SUCCESS('Database is ready!'))
        except subprocess.CalledProcessError as e:
            logger.error('Database is not ready: %s', e)
            self.stdout.write(self.style.ERROR('Database is not ready!'))
            return

        # Apply Migrations
        self.stdout.write('Applying migrations...')
        try:
            call_command('migrate', '--no-input')
            self.stdout.write(self.style.SUCCESS('Migrations complete!'))
        except Exception as e:
            logger.error('Error applying migrations: %s', e)
            self.stdout.write(self.style.ERROR('Error applying migrations!'))
            return
        
        # Insert Dummy Data
        self.stdout.write('Inserting dummy data...')
        try:
            call_command('insertdummydata')
        except Exception as e:
            logger.error('Error inserting dummy data: %s', e)
            self.stdout.write(self.style.ERROR('Error inserting dummy data!'))
            return
        
        # Start Gunicorn server
        self.stdout.write('Starting Gunicorn server...')
        try:
            call_command('rungunicorn')
            self.stdout.write(self.style.SUCCESS('Gunicorn server started!'))
        except Exception as e:
            logger.error('Error starting Gunicorn server: %s', e)
            self.stdout.write(self.style.ERROR('Error starting Gunicorn server!'))
            return