from django.core.mail import send_mail
import random
from django.conf import settings
from .models import User

def send_otp_via_email(email):
    subject = "Your account verification email"
    otp = random.randint(100000,999999)
    link = "localhost:3000/verify_account"
    message = f'Welcome to Andocs - Verify your email.\nYour otp is {otp}\n Go to this Link to verify your account with Email and Otp\n Link :- {link}'
    email_from = settings.EMAIL_HOST
    send_mail(subject,message,email_from,[email])
    user_obj = User.objects.get(email = email)
    user_obj.otp = otp
    user_obj.save()