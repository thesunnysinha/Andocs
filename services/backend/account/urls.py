from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from account.views import UserRegistrationView,UserLoginView,UserProfileView,UserChangePasswordView,SendUserResetPasswordView,UserPasswordResetView,UserEditProfileView,VerifyOTP,ResendOTPView

urlpatterns  = [
    path('register/',UserRegistrationView.as_view(),name='register'),
    path('verify/',VerifyOTP.as_view(),name="verify"),
    path('resendOtp/',ResendOTPView.as_view(),name="resendOtp"),
    path('login/',UserLoginView.as_view(),name='login'),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('edit-profile/', UserEditProfileView.as_view(), name='edit_profile'),
    path('changepassword/',UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/',SendUserResetPasswordView.as_view(),name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='reset-password'),
]