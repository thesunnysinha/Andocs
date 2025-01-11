from __future__ import absolute_import, unicode_literals
from celery import Celery, shared_task
from celery.schedules import crontab
from django.conf import settings
from django.apps import apps
import os
import django

# Set the DJANGO_SETTINGS_MODULE before calling django.setup()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Andocs.settings')
django.setup()

# Initialize Celery
app = Celery('Andocs')
app.conf.enable_utc = False
app.conf.broker_connection_retry_on_startup = True
app.conf.task_serializer = 'json'
app.conf.accept_content = ['application/json']
app.conf.result_serializer = 'json'
app.conf.timezone = 'Asia/Kolkata'
app.conf.result_backend = 'django-db'
app.conf.task_time_limit = 3600
app.conf.task_default_queue ='default'
app.conf.worker_concurrency=4

app.config_from_object(settings, namespace='CELERY')

# Autodiscover tasks from installed apps
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'

