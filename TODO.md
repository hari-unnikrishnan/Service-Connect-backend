# Fix Razorpay ModuleNotFoundError - Progress Tracker

## Plan Steps:
1. ✅ Create requirements.txt with dependencies including razorpay
2. ✅ Add Razorpay keys to service_connect_backend/settings.py (placeholders)
3. ✅ Dependencies installing (pip install -r requirements.txt running)
4. [ ] User: Replace placeholder Razorpay keys with real ones from dashboard (rzp_test_... for testing)
5. [ ] Run `python manage.py makemigrations && python manage.py migrate`
6. [ ] Test: `python manage.py runserver`
7. [ ] Test payment endpoint POST /api/create-razorpay-order/ with {"amount": 55}

## Notes:
- Razorpay test keys: Sign up at dashboard.razorpay.com, use test mode.
- Server should start after install.
- Frontend ready with PaymentMethods.jsx etc.
