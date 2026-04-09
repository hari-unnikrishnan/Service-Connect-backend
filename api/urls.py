from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.views import APIView
from rest_framework.response import Response
from .views import (
    UserViewSet, CategoryViewSet, ServiceViewSet,
    ProviderProfileViewSet, BookingViewSet, ReviewViewSet, OfferViewSet,
    UserLocationViewSet, AuthView, RegisterView, OTPVerificationView, 
    ResendOTPView, LogoutView, ProfileUpdateView,
    PasswordResetRequestView, PasswordResetVerifyView, PasswordResetConfirmView,
    ServiceRegistrationView, HomeDataView, DeliveryServicesView,
    SearchView, FilterServicesView, CakeDeliveryView, CategoryServicesView,
    CongratulationsView, ServiceCongratsView, ProfileAPIView,
    RequestView, BookingListView, BookingDetailView, BookingStatusUpdateView,
    CreateRazorpayOrder
)


class APIRootView(APIView):
    """Custom API root that always returns clean JSON with endpoint URLs"""
    
    def get(self, request):
        return Response({
            "users": request.build_absolute_uri("/api/users/"),
            "categories": request.build_absolute_uri("/api/categories/"),
            "services": request.build_absolute_uri("/api/services/"),
            "providers": request.build_absolute_uri("/api/providers/"),
            "bookings": request.build_absolute_uri("/api/bookings/"),
            "reviews": request.build_absolute_uri("/api/reviews/"),
            "offers": request.build_absolute_uri("/api/offers/"),
            "locations": request.build_absolute_uri("/api/locations/"),
        })


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'providers', ProviderProfileViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'offers', OfferViewSet)
router.register(r'locations', UserLocationViewSet)


urlpatterns = [
    path('', APIRootView.as_view(), name='api-root'),
    
    # Authentication endpoints
    path('auth/login/', AuthView.as_view(), name='auth-login'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/otp/verify/', OTPVerificationView.as_view(), name='auth-otp-verify'),
    path('auth/otp/resend/', ResendOTPView.as_view(), name='auth-otp-resend'),
    path('auth/logout/', LogoutView.as_view(), name='auth-logout'),
    
    # Password reset endpoints
    path('auth/password/reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('auth/password/verify-otp/', PasswordResetVerifyView.as_view(), name='password-reset-verify'),
    path('auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    
    # Profile endpoints
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
    
    # Service provider registration (use 'provider-register' to avoid conflict with router)
    path('provider-register/', ServiceRegistrationView.as_view(), name='provider-register'),
    
    # Profile API endpoint
    path('profile/<int:provider_id>/', ProfileAPIView.as_view(), name='profile-detail'),
    
    # Service endpoints
    path('categories/all/', CategoryViewSet.as_view({'get': 'all'}), name='category-all'),
    path('services/popular/', ServiceViewSet.as_view({'get': 'popular'}), name='service-popular'),
    path('providers/top/', ProviderProfileViewSet.as_view({'get': 'top'}), name='provider-top'),
    
    # Home page data
    path('home/', HomeDataView.as_view(), name='home-data'),
    
    # Delivery services
    path('services/delivery/', DeliveryServicesView.as_view(), name='delivery-services'),
    
    # Search and filter
    path('search/', SearchView.as_view(), name='search'),
    path('services/filter/', FilterServicesView.as_view(), name='filter-services'),
    
    # Cake delivery
    path('services/cake-delivery/', CakeDeliveryView.as_view(), name='cake-delivery'),
    
    # Service Connect (category services)
    path('services/category/', CategoryServicesView.as_view(), name='category-services'),
    
    # Congratulations endpoints
    path('congratulations/', CongratulationsView.as_view(), name='congratulations'),
    path('service-congrats/', ServiceCongratsView.as_view(), name='service-congrats'),

    # REQUEST
    path('requests/', RequestView.as_view(), name='requests'),

    # BOOKINGS
    path('bookings/', BookingListView.as_view(), name='booking-list'),
    path('bookings/<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),
    path('bookings/<int:pk>/status/', BookingStatusUpdateView.as_view(), name='booking-status'),
    path('payments/create-order/', CreateRazorpayOrder.as_view(), name='create-razorpay-order'),
]

