from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import RegexValidator

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, username, date_of_birth, phone, gender, tc, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name,
            date_of_birth=date_of_birth,
            phone=phone,
            gender=gender,
            tc=tc,
            **kwargs,
        )
        user.is_verified = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, username, date_of_birth, phone, gender, tc, password=None, **kwargs):
        user = self.create_user(
            email=email,
            password=password,
            name=name,
            username=username,
            date_of_birth=date_of_birth,
            phone=phone,
            gender=gender,
            tc=tc,
            **kwargs,
        )
        user.is_admin = True
        user.is_verified = True
        user.save(using=self._db)
        return user

# Custom User Model
GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('NB', 'Non-Binary'),
    ('O', 'Other'),
    ('P', 'Prefer not to say'),
)

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    username = models.CharField(max_length=150, unique=True)
    date_of_birth = models.DateField()
    phone_regex = RegexValidator(
        regex=r'^\+?91?[6789]\d{9}$',
        message="Phone number must be entered in the format: '+919876543210'."
    )
    phone = models.CharField(validators=[phone_regex], max_length=13, unique=True)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES)
    pic = models.ImageField(upload_to='profilepic', blank=True, null=True)
    tc = models.BooleanField()
    otp = models.CharField(max_length=6, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username', 'date_of_birth', 'phone', 'gender', 'tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
