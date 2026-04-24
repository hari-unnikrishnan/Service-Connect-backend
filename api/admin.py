from django.contrib import admin
from .models import (
    User, Category, Service, ProviderProfile, 
    Booking, Review, Offer, UserLocation, HelpArticle, UserNotificationPreferences
)

@admin.register(HelpArticle)
class HelpArticleAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'is_active', 'order']
    list_filter = ['category', 'is_active']
    search_fields = ['question', 'answer']
    ordering = ['order', 'question']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'is_staff']
    list_filter = ['role']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price_min', 'price_max', 'is_active']
    list_filter = ['category', 'is_active']

@admin.register(ProviderProfile)
class ProviderProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'service_type', 'rating', 'is_verified']
    list_filter = ['is_verified', 'service_type']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'provider', 'service', 'status', 'booking_date']
    list_filter = ['status', 'booking_date']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['customer', 'provider', 'rating', 'created_at']
    list_filter = ['rating']

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ['title', 'discount_percentage', 'is_active', 'valid_until']
    list_filter = ['is_active']

@admin.register(UserNotificationPreferences)
class UserNotificationPreferencesAdmin(admin.ModelAdmin):
    list_display = ['user', 'offers', 'sound', 'general', 'updated_at']
    list_filter = ['offers', 'sound', 'general']
    raw_id_fields = ['user']


@admin.register(UserLocation)
class UserLocationAdmin(admin.ModelAdmin):
    list_display = ['user', 'label', 'city', 'state', 'is_default']
    list_filter = ['is_default', 'city', 'state']

