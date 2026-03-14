from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import (
    User, Category, Service, ProviderProfile, 
    Booking, Review, Offer, UserLocation
)


class UserLocationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = UserLocation
        fields = [
            'id', 'user', 'user_name', 'label', 'address', 
            'city', 'state', 'pincode', 'latitude', 'longitude',
            'is_default', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user_name', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        user = self.context['request'].user
        # If this is the first location or is_default, handle accordingly
        if validated_data.get('is_default', False):
            UserLocation.objects.filter(
                user=user, is_default=True
            ).update(is_default=False)
        return UserLocation.objects.create(user=user, **validated_data)


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email', 'phone', 
            'address', 'profile_image'
        ]
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class PasswordResetRequestSerializer(serializers.Serializer):
    """Serializer for password reset request"""
    email = serializers.EmailField(required=False)
    phone = serializers.CharField(required=False)
    
    def validate(self, data):
        if not data.get('email') and not data.get('phone'):
            raise serializers.ValidationError(
                "Email or phone is required"
            )
        return data


class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for password reset confirmation"""
    user_id = serializers.IntegerField()
    new_password = serializers.CharField(min_length=8)
    confirm_password = serializers.CharField()
    
    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'password_confirm', 'first_name', 'last_name', 'phone', 'role']
        read_only_fields = ['id']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            role=validated_data.get('role', 'customer'),
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Invalid username or password")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled")
            data['user'] = user
        else:
            raise serializers.ValidationError("Must include username and password")
        
        return data


class OTPSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    otp = serializers.CharField(max_length=6, min_length=6)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone', 'address', 'profile_image']
        read_only_fields = ['id']


class CategorySerializer(serializers.ModelSerializer):
    services_count = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'image', 'image_url', 'description', 'is_active', 'order', 'services_count']
        read_only_fields = ['id', 'services_count']
    
    def get_services_count(self, obj):
        return obj.services.count()
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ['id', 'category', 'category_name', 'name', 'description', 'price_min', 'price_max', 'image', 'image_url', 'is_active']
        read_only_fields = ['id']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class CategoryDetailSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    services_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'image', 'description', 'is_active', 'order', 'services', 'services_count']
        read_only_fields = ['id', 'services_count']
    
    def get_services_count(self, obj):
        return obj.services.count()


class ProviderProfileSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ProviderProfile
        fields = ['id', 'user', 'user_name', 'bio', 'service_type', 'rating', 'review_count', 'is_verified', 'created_at']
        read_only_fields = ['id', 'rating', 'review_count']


class BookingSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_name = serializers.CharField(source='provider.username', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'customer', 'customer_name', 'provider', 'provider_name', 'service', 'service_name', 'status', 'booking_date', 'address', 'notes', 'total_price', 'created_at']
        read_only_fields = ['id', 'customer_name', 'provider_name', 'service_name', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_name = serializers.CharField(source='provider.username', read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'booking', 'customer', 'customer_name', 'provider', 'provider_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'customer_name', 'provider_name', 'created_at']


class OfferSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Offer
        fields = ['id', 'title', 'description', 'discount_percentage', 'image', 'image_url', 'is_active', 'valid_until', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ServiceRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for service provider registration"""
    
    class Meta:
        model = ProviderProfile
        fields = ['id', 'bio', 'service_type']
        read_only_fields = ['id']
    
    def create(self, validated_data):
        user = self.context['request'].user
        # Update user role to provider
        user.role = 'provider'
        user.save()
        
        # Create or update provider profile
        provider_profile, created = ProviderProfile.objects.update_or_create(
            user=user,
            defaults=validated_data
        )
        return provider_profile
