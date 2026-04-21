from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from .models import (
    User, Category, Service, ProviderProfile, 
    Booking, Review, Offer, UserLocation, Request, Complaint, Transaction
)
from .serializers import (
    UserSerializer, CategorySerializer, CategoryDetailSerializer, ServiceSerializer,
    ProviderProfileSerializer, BookingSerializer, ReviewSerializer, OfferSerializer,
    RegisterSerializer, LoginSerializer, OTPSerializer, UserLocationSerializer,
    ProfileUpdateSerializer, ServiceRegistrationSerializer, RequestSerializer,
    EReceiptSerializer, ComplaintSerializer, JobSerializer, ServiceDetailSerializer, TransactionSerializer
)
from django.utils import timezone
import random
import string
import hashlib


def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))


# Store OTPs temporarily (in production, use Redis or database)
_otp_store = {}


class AuthView(APIView):
    """Authentication endpoints for login, register, and OTP verification"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Handle login"""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({
                'success': True,
                'message': 'Login successful',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    """User registration endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = generate_otp()
            _otp_store[user.id] = {
                'otp': otp,
                'expires_at': None
            }
            return Response({
                'success': True,
                'message': 'Registration successful. OTP sent for verification.',
                'user_id': user.id,
                'otp': otp
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationView(APIView):
    """OTP verification endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        user_id = request.data.get('user_id')
        otp = request.data.get('otp')
        
        if not user_id or not otp:
            return Response(
                {'error': 'user_id and otp are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        stored_otp = _otp_store.get(user_id)
        
        if not stored_otp:
            return Response(
                {'error': 'No OTP found for this user. Please register first.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if stored_otp['otp'] == otp:
            try:
                user = User.objects.get(id=user_id)
                user.is_active = True
                user.save()
                del _otp_store[user_id]
                return Response({
                    'success': True,
                    'message': 'OTP verified successfully'
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response(
                    {'error': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {'error': 'Invalid OTP'},
                status=status.HTTP_400_BAD_REQUEST
            )


class ResendOTPView(APIView):
    """Resend OTP endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        user_id = request.data.get('user_id')
        
        if not user_id:
            return Response(
                {'error': 'user_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(id=user_id)
            otp = generate_otp()
            _otp_store[user.id] = {
                'otp': otp,
                'expires_at': None
            }
            return Response({
                'success': True,
                'message': 'OTP resent successfully',
                'otp': otp
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class LogoutView(APIView):
    """Logout endpoint"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response({
            'success': True,
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CategoryDetailSerializer
        return CategorySerializer
    
    @action(detail=False, methods=['get'])
    def all(self, request):
        """Get all categories"""
        categories = Category.objects.all()
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Get popular services"""
        services = Service.objects.filter(is_active=True)[:10]
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)


class ProviderProfileViewSet(viewsets.ModelViewSet):
    queryset = ProviderProfile.objects.all()
    serializer_class = ProviderProfileSerializer
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['get'])
    def top(self, request):
        """Get top rated providers"""
        providers = ProviderProfile.objects.order_by('-rating', 
                                                   '-review_count')[:10]
        serializer = self.get_serializer(providers, many=True)
        return Response(serializer.data)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            if user.role == 'customer':
                queryset = queryset.filter(customer=user)
            elif user.role == 'provider':
                queryset = queryset.filter(provider=user)
        return queryset


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        service_id = self.request.query_params.get('service')
        provider_id = self.request.query_params.get('provider')
        if service_id:
            queryset = queryset.filter(booking__service_id=service_id)
        if provider_id:
            queryset = queryset.filter(provider_id=provider_id)
        return queryset.order_by('-created_at')


class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer
    permission_classes = [permissions.AllowAny]


class ComplaintViewSet(viewsets.ModelViewSet):
    """Complaint CRUD operations"""
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Complaint.objects.filter(customer=self.request.user)
    
    def perform_create(self, serializer):
        # Auto-set customer to authenticated user
        serializer.save(customer=self.request.user)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def resolve(self, request, pk=None):
        """Resolve/update complaint status"""
        complaint = self.get_object()
        if complaint.customer != request.user:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        status = request.data.get('status')
        if status not in ['resolved', 'rejected', 'in_progress']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        
        complaint.status = status
        if status == 'resolved':
            complaint.resolved_at = timezone.now()
        complaint.save()
        
        serializer = self.get_serializer(complaint)
        return Response({
            'success': True,
            'message': f'Complaint {status}',
            'data': serializer.data
        })


class JobsListView(APIView):
    """User jobs/bookings filtered by status"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        status = request.query_params.get('status', 'ongoing')  # ongoing, completed
        user = request.user
        
        if status == 'ongoing':
            bookings = Booking.objects.filter(
                customer=user,
                status__in=['pending', 'confirmed', 'in_progress']
            )
        else:
            bookings = Booking.objects.filter(
                customer=user,
                status='completed'
            )
        
        serializer = JobSerializer(bookings, many=True)
        return Response(serializer.data)


class ServiceDetailsView(APIView):
    """Detailed booking view for ServiceDetails page"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, booking_id):
        booking = get_object_or_404(
            Booking, 
            id=booking_id, 
            customer=request.user
        )
        serializer = ServiceDetailSerializer(booking, context={'request': request})
        return Response(serializer.data)


class UserLocationViewSet(viewsets.ModelViewSet):
    """ViewSet for managing user locations"""
    queryset = UserLocation.objects.all()
    serializer_class = UserLocationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return locations for the authenticated user"""
        return UserLocation.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        if serializer.validated_data.get('is_default', False):
            UserLocation.objects.filter(
                user=self.request.user, 
                is_default=True
            ).update(is_default=False)
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def default(self, request):
        """Get the default location"""
        location = UserLocation.objects.filter(
            user=request.user, 
            is_default=True
        ).first()
        if location:
            serializer = self.get_serializer(location)
            return Response(serializer.data)
        return Response(
            {'message': 'No default location set'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        """Set a location as default"""
        location = self.get_object()
        UserLocation.objects.filter(
            user=request.user, 
            is_default=True
        ).update(is_default=False)
        location.is_default = True
        location.save()
        serializer = self.get_serializer(location)
        return Response(serializer.data)


class ProfileUpdateView(APIView):
    """Profile update endpoint for FillProfile"""
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request):
        """Update user profile"""
        serializer = ProfileUpdateSerializer(
            request.user, 
            data=request.data, 
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Profile updated successfully',
                'user': UserSerializer(request.user).data
            }, status=status.HTTP_200_OK)
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )


class ProfileRetrieveView(APIView):
    """Retrieve current user profile"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user_serializer = UserSerializer(request.user)
        profile_data = user_serializer.data
        profile_data['full_name'] = f"{request.user.first_name} {request.user.last_name}".strip() or request.user.username
        profile_data['has_provider_profile'] = hasattr(request.user, 'provider_profile')
        
        try:
            provider_profile = ProviderProfile.objects.get(user=request.user)
            profile_data['provider_profile'] = ProviderProfileSerializer(provider_profile).data
        except ProviderProfile.DoesNotExist:
            profile_data['provider_profile'] = None
        
        if request.user.profile_image:
            profile_data['profile_image_url'] = request.build_absolute_uri(request.user.profile_image.url)
        
        return Response({'profile': profile_data})


class PasswordResetRequestView(APIView):
    """Request password reset - sends OTP"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Request password reset OTP"""
        email = request.data.get('email')
        phone = request.data.get('phone')
        
        if not email and not phone:
            return Response(
                {'error': 'Email or phone is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = None
        else:
            try:
                user = User.objects.get(phone=phone)
            except User.DoesNotExist:
                user = None
        
        if not user:
            return Response(
                {'success': True, 'message': 'If the account exists, OTP has been sent'},
                status=status.HTTP_200_OK
            )
        
        otp = generate_otp()
        _password_reset_otp_store[user.id] = {
            'otp': otp,
            'expires_at': None
        }
        
        return Response({
            'success': True,
            'message': 'OTP sent for password reset',
            'user_id': user.id,
            'otp': otp
        }, status=status.HTTP_200_OK)


class PasswordResetVerifyView(APIView):
    """Verify OTP for password reset"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Verify password reset OTP"""
        user_id = request.data.get('user_id')
        otp = request.data.get('otp')
        
        if not user_id or not otp:
            return Response(
                {'error': 'user_id and otp are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        stored_otp = _password_reset_otp_store.get(int(user_id))
        
        if not stored_otp:
            return Response(
                {'error': 'No OTP found. Please request a new OTP.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if stored_otp['otp'] == otp:
            return Response({
                'success': True,
                'message': 'OTP verified successfully',
                'user_id': user_id
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid OTP'},
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordResetConfirmView(APIView):
    """Reset password with new password"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """Reset password with new password"""
        user_id = request.data.get('user_id')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')
        
        if not user_id or not new_password or not confirm_password:
            return Response(
                {'error': 'user_id, new_password, and confirm_password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if new_password != confirm_password:
            return Response(
                {'error': 'Passwords do not match'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        stored_otp = _password_reset_otp_store.get(user_id)
        if not stored_otp:
            return Response(
                {'error': 'Please verify OTP first'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(new_password)
        user.save()
        del _password_reset_otp_store[user_id]
        
        return Response({
            'success': True,
            'message': 'Password reset successfully'
        }, status=status.HTTP_200_OK)


class ServiceRegistrationView(APIView):
    """Service provider registration"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Register as a service provider"""
        serializer = ServiceRegistrationSerializer(
            data=request.data, 
            context={'request': request}
        )
        if serializer.is_valid():
            provider_profile = serializer.save()
            return Response({
                'success': True,
                'message': 'Service registered successfully',
                'provider': ProviderProfileSerializer(provider_profile).data
            }, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )


# Password reset OTP store
_password_reset_otp_store = {}


class HomeDataView(APIView):
    """Home page data endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        categories = Category.objects.filter(is_active=True)[:8]
        categories_data = CategorySerializer(categories, many=True).data
        
        popular_services = Service.objects.filter(is_active=True)[:10]
        services_data = ServiceSerializer(popular_services, many=True).data
        
        top_providers = ProviderProfile.objects.order_by('-rating', 
                                                       '-review_count')[:10]
        providers_data = ProviderProfileSerializer(top_providers, many=True).data
        
        offers = Offer.objects.filter(is_active=True)[:5]
        offers_data = OfferSerializer(offers, many=True).data
        
        return Response({
            'categories': categories_data,
            'services': services_data,
            'providers': providers_data,
            'offers': offers_data
        }, status=status.HTTP_200_OK)


class ProfileAPIView(APIView):
    """Profile API endpoint for fetching provider profile data"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, provider_id):
        """Get provider profile data"""
        try:
            provider = User.objects.get(id=provider_id)
            provider_profile = ProviderProfile.objects.get(user=provider)
            services = Service.objects.filter(
                category__name=provider_profile.service_type
            )
            reviews = Review.objects.filter(provider=provider)[:5]
            
            return Response({
                'profile': {
                    'id': provider.id,
                    'username': provider.username,
                    'phone': provider.phone,
                    'address': provider.address,
                    'profile_image': (provider.profile_image.url 
                                    if provider.profile_image else None),
                    'bio': provider_profile.bio,
                    'service_type': provider_profile.service_type,
                    'rating': provider_profile.rating,
                    'review_count': provider_profile.review_count,
                    'is_verified': provider_profile.is_verified,
                    'created_at': provider_profile.created_at
                },
                'services': ServiceSerializer(services, many=True).data,
                'reviews': ReviewSerializer(reviews, many=True).data
            }, status=status.HTTP_200_OK)
        except (User.DoesNotExist, ProviderProfile.DoesNotExist):
            return Response({'error': 'Provider not found'}, 
                          status=status.HTTP_404_NOT_FOUND)


class DeliveryServicesView(APIView):
    """Delivery services endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Get delivery services category"""
        category_name = request.query_params.get('category', 'delivery services')
        
        try:
            category = Category.objects.get(
                name__iexact=category_name, 
                is_active=True
            )
        except Category.DoesNotExist:
            return Response({
                'category': None,
                'services': []
            }, status=status.HTTP_200_OK)
        
        services = Service.objects.filter(
            category=category, 
            is_active=True
        )
        
        return Response({
            'category': CategorySerializer(category).data,
            'services': ServiceSerializer(services, many=True).data
        }, status=status.HTTP_200_OK)


class SearchView(APIView):
    """Search endpoint for services, providers, and categories"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Search for services, providers, and categories"""
        query = request.query_params.get('q', '')
        search_type = request.query_params.get('type', 'all')
        
        if not query:
            return Response(
                {'error': 'Search query is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        results = {
            'services': [],
            'providers': [],
            'categories': []
        }
        
        if search_type in ['all', 'services']:
            services = Service.objects.filter(
                is_active=True,
                name__icontains=query
            )[:20]
            results['services'] = ServiceSerializer(services, many=True).data
        
        if search_type in ['all', 'providers']:
            providers = ProviderProfile.objects.filter(
                user__username__icontains=query,
                service_type__icontains=query
            )[:20]
            results['providers'] = ProviderProfileSerializer(providers, many=True).data
        
        if search_type in ['all', 'categories']:
            categories = Category.objects.filter(
                is_active=True,
                name__icontains=query
            )[:20]
            results['categories'] = CategorySerializer(categories, many=True).data
        
        return Response(results, status=status.HTTP_200_OK)


class FilterServicesView(APIView):
    """Filter services by various criteria"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Filter services by category, price range, location"""
        category_id = request.query_params.get('category')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        city = request.query_params.get('city')
        sort_by = request.query_params.get('sort_by', 'name')
        
        queryset = Service.objects.filter(is_active=True)
        
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        if min_price:
            queryset = queryset.filter(price_min__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_max__lte=max_price)
        
        if sort_by == 'price_low':
            queryset = queryset.order_by('price_min')
        elif sort_by == 'price_high':
            queryset = queryset.order_by('-price_max')
        elif sort_by == 'rating':
            queryset = queryset.select_related('category').order_by('name')
        else:
            queryset = queryset.order_by('name')
        
        serializer = ServiceSerializer(queryset, many=True)
        return Response({
            'count': queryset.count(),
            'services': serializer.data
        }, status=status.HTTP_200_OK)


class CakeDeliveryView(APIView):
    """Cake delivery services endpoint"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Get cake delivery services"""
        category_name = request.query_params.get('category', 'cake delivery')
        
        try:
            category = Category.objects.get(
                name__iexact=category_name, 
                is_active=True
            )
        except Category.DoesNotExist:
            return Response({
                'category': None,
                'services': []
            }, status=status.HTTP_200_OK)
        
        services = Service.objects.filter(
            category=category, 
            is_active=True
        )
        
        return Response({
            'category': CategorySerializer(category).data,
            'services': ServiceSerializer(services, many=True).data
        }, status=status.HTTP_200_OK)


class CategoryServicesView(APIView):
    """Get all services for a specific category (Service Connect)"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Get services for a specific category"""
        category_id = request.query_params.get('category_id')
        category_name = request.query_params.get('category_name')
        
        if category_id:
            try:
                category = Category.objects.get(id=category_id, is_active=True)
            except Category.DoesNotExist:
                return Response(
                    {'error': 'Category not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif category_name:
            try:
                category = Category.objects.get(name__iexact=category_name, is_active=True)
            except Category.DoesNotExist:
                return Response(
                    {'error': 'Category not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {'error': 'category_id or category_name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        services = Service.objects.filter(category=category, is_active=True)
        
        return Response({
            'category': CategoryDetailSerializer(category).data,
            'services': ServiceSerializer(services, many=True).data
        }, status=status.HTTP_200_OK)


class CongratulationsView(APIView):
    """Handle congratulations/popup after successful actions"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Get congratulations message and status"""
        action = request.query_params.get('action', 'default')
        
        messages = {
            'registration': {
                'title': 'Registration Successful!',
                'message': 'Your account has been created successfully.',
                'icon': 'check-circle'
            },
            'profile_update': {
                'title': 'Profile Updated!',
                'message': 'Your profile has been updated successfully.',
                'icon': 'user-check'
            },
            'service_register': {
                'title': 'Service Registered!',
                'message': 'Your service has been registered successfully.',
                'icon': 'briefcase'
            },
            'booking': {
                'title': 'Booking Confirmed!',
                'message': 'Your booking has been confirmed.',
                'icon': 'calendar-check'
            },
            'default': {
                'title': 'Success!',
                'message': 'Operation completed successfully.',
                'icon': 'check'
            }
        }
        
        return Response(messages.get(action, messages['default']), 
                       status=status.HTTP_200_OK)


class ServiceCongratsView(APIView):
    """Service registration congratulations"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        """Get service registration success message"""
        return Response({
            'title': 'Congratulations!',
            'message': ('Your service has been registered successfully. '
                       'You can now start receiving bookings.'),
            'subtitle': 'Welcome to Service Connect',
            'icon': 'celebration'
        }, status=status.HTTP_200_OK)


class RequestView(APIView):
    def post(self, request):
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Request created", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingListView(APIView):
    def get(self, request):
        bookings = Booking.objects.all().order_by("-id")
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)  


class BookingDetailView(APIView):
    def get(self, request, pk):
        try:
            booking = Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = BookingSerializer(booking)
        return Response(serializer.data)    
    
    def patch(self, request, pk):
        try:
            booking = Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        status_value = request.data.get("status")
        booking.status = status_value
        booking.save()
        return Response({"message": "Status updated"})


from django.conf import settings
import razorpay


class CreateRazorpayOrder(APIView):
    def post(self, request):
        client = razorpay.Client(auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET
        ))

        amount = int(request.data.get("amount", 55)) * 100

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        return Response({
            "order_id": order["id"],
            "amount": order["amount"],
            "key": settings.RAZORPAY_KEY_ID
        })


class ServiceCompletedList(APIView):
    """List customer's completed services/bookings"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        completed_bookings = Booking.objects.filter(
            customer=user,
            status='completed'
        ).select_related('service', 'provider').order_by('-created_at')
        
        serializer = JobSerializer(completed_bookings, many=True, context={'request': request})
        return Response({
            'count': completed_bookings.count(),
            'services': serializer.data
        })


class TransactionsListView(APIView):
    """List user's transactions (paid bookings)"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        # Get transactions for customer's completed paid bookings
        transactions = Transaction.objects.filter(
            booking__customer=user,
            status='paid'
        ).select_related(
            'booking__service__category', 
            'booking__provider'
        ).order_by('-timestamp')
        
        serializer = TransactionSerializer(transactions, many=True, context={'request': request})
        return Response({
            'count': transactions.count(),
            'transactions': serializer.data
        })


class ServicesListView(APIView):
    """List all active services"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        services = Service.objects.filter(is_active=True).select_related('category').order_by('name')
        serializer = ServiceSerializer(services, many=True, context={'request': request})
        return Response({
            'count': services.count(),
            'services': serializer.data
        })


class EReceiptView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, status='completed')
        except Booking.DoesNotExist:
            return Response({'error': 'Receipt not found or payment not completed'}, 
                          status=status.HTTP_404_NOT_FOUND)
        
        serializer = EReceiptSerializer(booking)
        return Response(serializer.data)
