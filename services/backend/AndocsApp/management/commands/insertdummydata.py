from datetime import date
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.db import IntegrityError
from product.models import Product
from django.core.files import File
from io import BytesIO
from PIL import Image
import numpy as np
import os
from django.contrib.auth import get_user_model

User = get_user_model()

# Define RGB values for image colors
IMAGE_COLORS = {
    'red': (255, 0, 0),
    'green': (0, 255, 0),
    'blue': (0, 0, 255),
    'yellow': (255, 255, 0),
}

env = settings.ENVIRONMENT


class Command(BaseCommand):
    help = 'Create a superuser'

    def handle(self, *args, **options):
        self.execute_all()

    def execute_all(self):
        self.create_super_user()
        self.insert_dummy_data()

    def create_super_user(self):
        self.stdout.write('Creating superuser')

        username = "admin"
        email = "admin@example.com"
        password = "admin@123"
        name = 'admin'
        date_of_birth = date(2023, 8, 14)
        tc = True
        pic_name = "profile_pic.jpg"
        pic_path = os.path.join(settings.STATIC_DIR, "images", pic_name)
        gender = "M"
        phone = "+911234567890"
        
        try:
            if User.objects.filter(email=email).exists():
                self.stdout.write(self.style.WARNING(f'Superuser already exists: {email}'))
                return

            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
                name=name,
                tc=tc,
                phone=phone,
                date_of_birth=date_of_birth,
                gender=gender
            )
            with open(pic_path, 'rb') as f:
                user.pic.save(pic_name, File(f))

            self.stdout.write(self.style.SUCCESS(f'Superuser created successfully: {user}'))

        except IntegrityError as e:
            self.stdout.write(self.style.ERROR(f'Error creating superuser: {e}'))
            raise CommandError('Error creating superuser.')

    def insert_dummy_data(self):
        for i in range(1, 51):
            self.create_dummy_product(
                title=f'Dummy Product {i}',
                selling_price=np.random.uniform(10.0, 100.0),
                discounted_price=np.random.uniform(5.0, 50.0),
                description=f'This is the description for Dummy Product {i}.',
                brand=f'Brand {i}',
                category=np.random.choice(['C', 'P']),
                sub_category=np.random.choice(['FW', 'PU', 'N']),
                image_color=np.random.choice(['red', 'green', 'blue', 'yellow'])
            )

    def create_dummy_product(self, title, selling_price, discounted_price, description, brand, category, sub_category,
                             image_color):
        product = Product(
            title=title,
            selling_price=selling_price,
            discounted_price=discounted_price,
            description=description,
            brand=brand,
            category=category,
            sub_category=sub_category
        )

        # Create a dummy image for the product
        color_tuple = IMAGE_COLORS.get(image_color, (0, 0, 0))
        image = Image.new('RGB', (100, 100), color_tuple)
        image_bytes = BytesIO()
        image.save(image_bytes, format='JPEG')
        product.product_image.save(f'dummy_image_{title}.jpg', File(image_bytes))
        product.save()

        # Add suitable stdout
        self.stdout.write(self.style.SUCCESS(f'Dummy product created successfully: {title}'))
