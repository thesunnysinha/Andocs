from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from account.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer,SendUserResetPasswordSerializer,UserPasswordResetSerializer,VerifyAccountSerializer,ResendOTPSerializer
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from .emails import send_otp_via_email

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user is not None:
            if user.is_verified:
                tokens = get_tokens_for_user(user)
                serializer = UserProfileSerializer(user)
                return Response({'token': tokens,"user_data":serializer.data, 'msg': 'Login Successful'}, status=status.HTTP_200_OK)
            else:
                # Send OTP mail to the user
                send_otp_via_email(user.email)
                return Response({'errors': {'non_field_errors': [
                    f'Hello {user.email},\n\n Account is not verified yet. Check you email to Verify.'
                    ]}},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors': {'non_field_errors': ['Email or password is incorrect']}}, status=status.HTTP_404_NOT_FOUND)

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        send_otp_via_email(serializer.data['email'])
        return Response({'msg':'Otp Sent Successfully. Please check your mail.'},status=status.HTTP_201_CREATED)

class VerifyOTP(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = VerifyAccountSerializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        email = serializer.validated_data.get("email")
        user = User.objects.filter(email = email)
        token = get_tokens_for_user(user)
        return Response({'token': token, 'msg':'Otp Verified.Registration Successful'},status=status.HTTP_201_CREATED)     


class ResendOTPView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = ResendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data.get('email')
        user = User.objects.filter(email=email).first()
        
        if not user:
            return Response({'errors': {'email': ['User not found']}}, status=status.HTTP_404_NOT_FOUND)
        
        if user.is_verified:
            return Response({'errors': {'email': ['Account is already verified']}}, status=status.HTTP_400_BAD_REQUEST)
        
        send_otp_via_email(email)
        return Response({'msg': 'OTP Sent Successfully. Please check your mail.'}, status=status.HTTP_200_OK)


        
class UserProfileView(APIView):
    renderer_classes =[UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)

class UserEditProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'msg': 'Profile updated successfully'}, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    renderer_classes =[UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer = UserChangePasswordSerializer(data = request.data,context={'user':request.user})
        serializer.is_valid(raise_exception= True)
        return Response({'msg':"Change Password Successfully"},status = status.HTTP_200_OK)

class SendUserResetPasswordView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = SendUserResetPasswordSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'msg':"Password Reset Link Sent.Please check your email."},status = status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data,context={'uid':uid,'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':"Password Reset Successfully"},status = status.HTTP_200_OK)