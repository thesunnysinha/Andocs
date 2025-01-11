from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.exceptions import ValidationError
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    pic = serializers.ImageField(use_url=True)
    class Meta:
        model = User
        fields = ['email', 'name','username','date_of_birth','phone','gender','pic','password','password2','tc','is_verified']
        extra_kwargs={
            'password':{'write_only': True}
        }

    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError('Password does not match')
        return attrs

    def create(self,validate_data):
        return User.objects.create_user(**validate_data)

class VerifyAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        otp = attrs.get('otp')
        user = User.objects.filter(email=email)
        if not user.exists():
            raise serializers.ValidationError("User does not exist")
        
        if user[0].otp != otp:
            raise serializers.ValidationError("Incorrect Otp")
        
        return attrs
    
    def create(self, validated_data):
        email = validated_data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()
        return validated_data

class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)
    class Meta:
        model =User
        fields = ['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','username','date_of_birth','phone','gender','pic']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        fields = ['password','password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError('Password does not match')
        user.set_password(password)
        user.save()
        return attrs

class SendUserResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    date_of_birth = serializers.DateField()
    class Meta:
        fields = ['email','date_of_birth']       

    def validate(self, attrs):
        email = attrs.get('email')
        date_of_birth = attrs.get('date_of_birth')
        if User.objects.filter(email = email).exists():   
            user = User.objects.get(email=email)
            if user.date_of_birth != date_of_birth:
                raise serializers.ValidationError("Invalid date of birth")
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded UID',uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token',token)
            link = 'http://localhost:3000/api/user/reset-password/'+uid+'/'+token
            print('Password Reset Link',link)
            # Send Email
            body = f"Hello {user.name},\n\nYour Password Reset Link is:- \n {link}\n\n\nRegards,\nAndocs"
            data = {
                'subject' : 'Welcome to Andocs - Reset Your Password',
                'body' : body,
                'to_email': user.email
            }
            # Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError("You are not a registered user.")

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')