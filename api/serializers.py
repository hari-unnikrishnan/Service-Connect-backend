from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils import timezone
from .models import (
    User, Category, Service, ProviderProfile, 
    Booking, Review, Offer, UserLocation, Request, Complaint, Transaction, Notification, HelpArticle, UserNotificationPreferences, UserSecuritySettings,
    Conversation, Message, FriendInvite
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
            'first_name', 'last_name', 'nickname', 'date_of_birth', 'gender',
            'email', 'phone', 'address', 'profile_image'
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
        fields = ['id', 'email', 'username', 'password', 
                 'password_confirm', 'first_name', 'last_name', 
                 'phone', 'role']
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
        fields = ['id', 'username', 'email', 'first_name', 
                 'last_name', 'role', 'phone', 'address', 
                 'profile_image']
        read_only_fields = ['id']


class CategorySerializer(serializers.ModelSerializer):
    services_count = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'image', 'image_url', 
                 'description', 'is_active', 'order', 'services_count']
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
        fields = ['id', 'category', 'category_name', 'name', 
                 'description', 'price_min', 'price_max', 
                 'image', 'image_url', 'is_active']
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
        fields = ['id', 'name', 'icon', 'image', 'description', 
                 'is_active', 'order', 'services', 'services_count']
        read_only_fields = ['id', 'services_count']
    
    def get_services_count(self, obj):
        return obj.services.count()


class ProviderProfileSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ProviderProfile
        fields = ['id', 'user', 'user_name', 'bio', 'service_type', 
                 'rating', 'review_count', 'is_verified', 'created_at']
        read_only_fields = ['id', 'rating', 'review_count']


class BookingSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_name = serializers.CharField(source='provider.username', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'customer', 'customer_name', 'provider', 
                 'provider_name', 'service', 'service_name', 'status', 
                 'booking_date', 'address', 'notes', 'total_price', 
                 'payment_id', 'payment_method', 'created_at']
        read_only_fields = ['id', 'customer_name', 'provider_name', 
                           'service_name', 'created_at']


class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_name = serializers.CharField(source='provider.username', read_only=True)
    images_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ['id', 'booking', 'customer', 'customer_name', 
                 'provider', 'provider_name', 'rating', 'comment', 
                 'images', 'images_url', 'created_at']
        read_only_fields = ['id', 'customer_name', 'provider_name', 'created_at']
    
    def get_images_url(self, obj):
        if obj.images:
            request = self.context.get('request')
            return [request.build_absolute_uri(img) if request else img for img in obj.images]
        return []


class ComplaintSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_name = serializers.CharField(source='provider.username', read_only=True)
    booking_id = serializers.IntegerField(source='booking.id', read_only=True)
    
    class Meta:
        model = Complaint
        fields = ['id', 'booking', 'booking_id', 'customer', 'customer_name', 
                 'provider', 'provider_name', 'title', 'description', 
                 'images', 'status', 'notes', 'resolved_at', 'created_at']
        read_only_fields = ['id', 'customer_name', 'provider_name', 
                           'booking_id', 'created_at']
    
    def create(self, validated_data):
        booking = validated_data.pop('booking')
        customer = self.context['request'].user
        provider = booking.provider
        validated_data['customer'] = customer
        validated_data['provider'] = provider
        return Complaint.objects.create(booking=booking, **validated_data)


class JobSerializer(BookingSerializer):
    """Serializer for Jobs (filtered Bookings)"""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta(BookingSerializer.Meta):
        fields = BookingSerializer.Meta.fields + ['status_display']


class ServiceDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for ServiceDetails page"""
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_profile = ProviderProfileSerializer(source='provider.provider_profile', read_only=True)
    service_details = ServiceSerializer(source='service', read_only=True)
    review = ReviewSerializer(source='review', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'customer_name', 'provider_profile', 'service_details', 
                 'status', 'booking_date', 'address', 'notes', 'total_price', 
                 'payment_id', 'payment_method', 'review']
        read_only_fields = ['id']


class OfferSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Offer
        fields = ['id', 'title', 'description', 'discount_percentage', 
                 'image', 'image_url', 'is_active', 'valid_until', 'created_at']
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
        user.role = 'provider'
        user.save()
        
        provider_profile, created = ProviderProfile.objects.update_or_create(
            user=user,
            defaults=validated_data
        )
        return provider_profile


class RequestSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    provider_name = serializers.CharField(source='provider.username', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    location_label = serializers.CharField(source='location.label', read_only=True)
    
    class Meta:
        model = Request
        fields = [
            'id', 'customer', 'customer_name', 'provider', 'provider_name', 
            'service', 'service_name', 'status', 'priority', 'title', 
            'description', 'requested_date', 'address', 'location', 
            'location_label', 'estimated_cost', 'actual_cost', 'notes', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'customer_name', 'provider_name', 'service_name', 
                           'location_label', 'created_at', 'updated_at']
    
    def validate(self, data):
        if data.get('requested_date') and data['requested_date'] <= timezone.now():
            raise serializers.ValidationError("Requested date must be in the future")
        return data


class EReceiptSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    customer_email = serializers.CharField(source='customer.email', read_only=True)
    service_category = serializers.CharField(source='service.category.name', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    transaction_id = serializers.CharField(source='payment_id', read_only=True)
    price = serializers.DecimalField(source='total_price', max_digits=10, decimal_places=2, read_only=True)
    date_str = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = ['customer_name', 'customer_email', 'service_category', 
                 'service_name', 'transaction_id', 'price', 'date_str', 
                 'status_display']
    
    def get_date_str(self, obj):
        return obj.created_at.strftime('%b %d, %Y / %H:%M')
    
    def get_status_display(self, obj):
        return obj.get_status_display()

        



class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for Notification model"""
    user_name = serializers.CharField(source='user.username', read_only=True)
    date_formatted = serializers.SerializerMethodField()
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'title', 'message', 'type', 'type_display', 
            'is_read', 'date_formatted', 'user_name'
        ]
        read_only_fields = ['id']
    
    def get_date_formatted(self, obj):
        return obj.created_at.strftime('%b %d, %Y %H:%M')


class UserNotificationPreferencesSerializer(serializers.ModelSerializer):
    """Serializer for UserNotificationPreferences (Settings/NotificationSettings)"""
    
    class Meta:
        model = UserNotificationPreferences
        fields = [
            'offers', 'sound', 'vibrate', 'general', 'promo', 
            'payment', 'update', 'service', 'tips', 'extra_settings',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def to_representation(self, instance):
        """Return frontend-friendly dict"""
        data = super().to_representation(instance)
        data.update(instance.get_settings_dict())
        return data


class HelpArticleSerializer(serializers.ModelSerializer):
    """Serializer for HelpArticle model"""
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = HelpArticle
        fields = [
            'id', 'question', 'answer', 'category', 'category_display', 
            'is_active', 'order', 'created_at'
        ]
        read_only_fields = ['id', 'category_display', 'created_at']


class UserSecuritySettingsSerializer(serializers.ModelSerializer):
    """Serializer for UserSecuritySettings (Security.jsx)"""
    
    class Meta:
        model = UserSecuritySettings
        fields = [
            'remember_me', 'biometric_id', 'face_id', 'google_auth_enabled',
            'pin_hash', 'last_password_change', 'extra_settings',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['pin_hash', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        """Return frontend-friendly dict matching Security.jsx state"""
        data = super().to_representation(instance)
        data.update(instance.get_settings_dict())
        return data


class TransactionSerializer(serializers.ModelSerializer):

    """Serializer for Transaction model"""
    service_name = serializers.CharField(source='booking.service.name', read_only=True)
    provider_name = serializers.CharField(source='booking.provider.username', read_only=True)
    category_name = serializers.CharField(source='booking.service.category.name', read_only=True)
    amount_formatted = serializers.SerializerMethodField()
    date_formatted = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Transaction
        fields = [
            'id', 'service_name', 'provider_name', 'category_name', 
            'amount', 'amount_formatted', 'payment_method', 'status', 
            'status_display', 'date_formatted', 'razorpay_payment_id'
        ]
        read_only_fields = ['id']
    
    def get_amount_formatted(self, obj):
        return f"${obj.amount:.2f}"
    
    def get_date_formatted(self, obj):
        return obj.timestamp.strftime('%b %d, %Y')
    
    def get_status_display(self, obj):
        return obj.get_status_display()


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for chat messages"""
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    sender_id = serializers.IntegerField(source='sender.id', read_only=True)
    file_url = serializers.SerializerMethodField()
    time_formatted = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            'id', 'conversation', 'sender', 'sender_id', 'sender_name',
            'text', 'file', 'file_url', 'is_read', 'timestamp', 'time_formatted'
        ]
        read_only_fields = ['id', 'sender', 'timestamp']

    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None

    def get_time_formatted(self, obj):
        return obj.timestamp.strftime('%H:%M')


class ConversationSerializer(serializers.ModelSerializer):
    """Serializer for conversation list"""
    participants = UserSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    other_participant = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'other_participant', 'last_message', 'unread_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_last_message(self, obj):
        last = obj.get_last_message()
        if last:
            return MessageSerializer(last, context=self.context).data
        return None

    def get_unread_count(self, obj):
        user = self.context['request'].user if self.context.get('request') else None
        if user and user.is_authenticated:
            return obj.get_unread_count(user)
        return 0

    def get_other_participant(self, obj):
        user = self.context['request'].user if self.context.get('request') else None
        if user and user.is_authenticated:
            other = obj.participants.exclude(id=user.id).first()
            if other:
                return UserSerializer(other, context=self.context).data
        return None


class ConversationDetailSerializer(serializers.ModelSerializer):
    """Serializer for full conversation with messages"""
    participants = UserSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    other_participant = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'other_participant', 'messages', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_other_participant(self, obj):
        user = self.context['request'].user if self.context.get('request') else None
        if user and user.is_authenticated:
            other = obj.participants.exclude(id=user.id).first()
            if other:
                return UserSerializer(other, context=self.context).data
        return None


class InviteUserSerializer(serializers.ModelSerializer):
    """Lightweight user serializer for invite list"""
    name = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'phone', 'profile_image', 'profile_image_url']
        read_only_fields = ['id']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

    def get_profile_image_url(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None


class FriendInviteSerializer(serializers.ModelSerializer):
    """Serializer for friend invites"""
    inviter_name = serializers.CharField(source='inviter.username', read_only=True)
    invitee_name = serializers.CharField(source='invitee.username', read_only=True)

    class Meta:
        model = FriendInvite
        fields = [
            'id', 'inviter', 'inviter_name', 'invitee', 'invitee_name',
            'invitee_phone', 'invitee_email', 'status', 'created_at', 'accepted_at'
        ]
        read_only_fields = ['id', 'inviter_name', 'invitee_name', 'created_at', 'accepted_at']


