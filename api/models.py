from django.db import models
from django.contrib.auth.models import AbstractUser
import random
import string


def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))


class User(AbstractUser):
    """Custom User model with roles"""
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('provider', 'Service Provider'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    nickname = models.CharField(max_length=100, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10, 
        choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], 
        blank=True
    )
    
    def __str__(self):
        return self.username


class Category(models.Model):
    """Service categories"""
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True)  # Icon name from lucide-react
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name


class Service(models.Model):
    """Services offered"""
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=200)
    description = models.TextField()
    price_min = models.DecimalField(max_digits=10, decimal_places=2)
    price_max = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class ProviderProfile(models.Model):
    """Service provider details"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='provider_profile')
    bio = models.TextField(blank=True)
    service_type = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    review_count = models.IntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.service_type}"


class Booking(models.Model):
    """Service bookings"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provider_bookings')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    booking_date = models.DateTimeField()
    address = models.TextField()
    notes = models.TextField(blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Booking #{self.id} - {self.customer.username}"


class Review(models.Model):
    """Provider reviews/ratings"""
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='review')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provider_reviews')
    rating = models.IntegerField()  # 1-5 stars
    comment = models.TextField(blank=True)
    images = models.JSONField(default=list, blank=True)  # Store image URLs
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review by {self.customer.username} for {self.provider.username}"


class Complaint(models.Model):
    """Customer complaints"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected'),
    ]
    
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='complaints')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='complaints')
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provider_complaints')
    title = models.CharField(max_length=200)
    description = models.TextField()
    images = models.JSONField(default=list, blank=True)  # Store uploaded images
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Complaint #{self.id} - {self.customer.username} for Booking {self.booking.id}"


class Offer(models.Model):
    """Promotional offers"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    discount_percentage = models.IntegerField()
    image = models.ImageField(upload_to='offers/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    valid_until = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class UserLocation(models.Model):
    """User location for delivery and services"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, 
        related_name='locations'
    )
    label = models.CharField(max_length=100, default='Home')  # Home, Work, Other
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, 
        blank=True, null=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, 
        blank=True, null=True
    )
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.label} - {self.user.username}"


class Request(models.Model):
    """Service request model"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rejected', 'Rejected'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    provider = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='provider_requests'
    )
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    title = models.CharField(max_length=200)
    description = models.TextField()
    requested_date = models.DateTimeField()
    address = models.TextField()
    location = models.ForeignKey(
        UserLocation, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    actual_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Request #{self.id} - {self.customer.username} - {self.service.name}"

class Transaction(models.Model):
    """Transaction model for payments"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    booking = models.OneToOneField('Booking', on_delete=models.CASCADE, related_name='transaction')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Transaction #{self.id} - Booking {self.booking.id} ({self.status})"



class Notification(models.Model):
    """User notifications"""
    TYPE_CHOICES = [
        ('info', 'Info'),
        ('success', 'Success'),
        ('warning', 'Warning'),
        ('error', 'Error'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='info')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"


class UserNotificationPreferences(models.Model):
    """User notification settings/preferences"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='notification_preferences')
    
    # Toggles from NotificationSettings.jsx
    offers = models.BooleanField(default=True)
    sound = models.BooleanField(default=True)
    vibrate = models.BooleanField(default=False)
    general = models.BooleanField(default=True)
    promo = models.BooleanField(default=False)
    payment = models.BooleanField(default=True)
    update = models.BooleanField(default=True)
    service = models.BooleanField(default=False)
    tips = models.BooleanField(default=False)
    
    # Extensible JSON for future settings
    extra_settings = models.JSONField(default=dict)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Notification Preferences'
        verbose_name_plural = 'Notification Preferences'
    
    def __str__(self):
        return f"Preferences for {self.user.username}"
    
    def get_settings_dict(self):
        """Return dict for frontend"""
        fields = ['offers', 'sound', 'vibrate', 'general', 'promo', 'payment', 'update', 'service', 'tips']
        return {field: getattr(self, field) for field in fields}


class UserSecuritySettings(models.Model):
    """User security settings for Security.jsx"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='security_settings')
    
    # Toggles from Security.jsx
    remember_me = models.BooleanField(default=True)
    biometric_id = models.BooleanField(default=True)
    face_id = models.BooleanField(default=False)
    google_auth_enabled = models.BooleanField(default=False)
    
    # Security fields
    pin_hash = models.CharField(max_length=128, blank=True, null=True)  # Hashed PIN
    last_password_change = models.DateTimeField(null=True, blank=True)
    extra_settings = models.JSONField(default=dict)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Security Settings'
        verbose_name_plural = 'Security Settings'
    
    def __str__(self):
        return f"Security settings for {self.user.username}"
    
    def get_settings_dict(self):
        """Return dict for frontend"""
        return {
            'remember': self.remember_me,
            'biometric': self.biometric_id,
            'face': self.face_id,
            'googleAuth': self.google_auth_enabled,
        }


class HelpArticle(models.Model):
    """Help Center FAQ articles"""
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('account', 'Account'),
        ('payment', 'Payment'),
        ('service', 'Service'),
        ('booking', 'Booking'),
        ('complaint', 'Complaint'),
    ]
    
    question = models.CharField(max_length=300)
    answer = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'question']
        verbose_name = 'Help Article'
        verbose_name_plural = 'Help Articles'
    
    def __str__(self):
        return f"{self.question[:50]}... ({self.get_category_display()})"


class FriendInvite(models.Model):
    """Friend invitation tracking"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('expired', 'Expired'),
    ]

    inviter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invites')
    invitee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_invites', null=True, blank=True)
    invitee_name = models.CharField(max_length=200, blank=True)
    invitee_phone = models.CharField(max_length=20, blank=True)
    invitee_email = models.EmailField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Invite from {self.inviter.username} to {self.invitee_name or self.invitee}"


class Conversation(models.Model):
    """Chat conversation between two users"""
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        usernames = ", ".join([u.username for u in self.participants.all()])
        return f"Conversation ({usernames})"

    def get_last_message(self):
        return self.messages.order_by('-timestamp').first()

    def get_unread_count(self, user):
        return self.messages.filter(is_read=False).exclude(sender=user).count()


class Message(models.Model):
    """Individual chat message"""
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    text = models.TextField(blank=True)
    file = models.FileField(upload_to='chat_files/', blank=True, null=True)
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"Message from {self.sender.username} at {self.timestamp}"











