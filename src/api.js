// API Service for Service Connect
const API_BASE_URL = "http://127.0.0.1:8000/api";

// ==================== API ROOT DATA ====================
// The API root endpoint returns available endpoints:
// {
//   users: "/api/users/",
//   categories: "/api/categories/",
//   services: "/api/services/",
//   providers: "/api/providers/",
//   bookings: "/api/bookings/",
//   reviews: "/api/reviews/",
//   offers: "/api/offers/",
//   locations: "/api/locations/"
// }

// Get API root with all available endpoints
export const getAPIRoot = async () => {
  const response = await fetch(`${API_BASE_URL}/`);
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
};

// ==================== AUTH API ====================

// Login
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// Register
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Verify OTP (for registration)
export const verifyOTP = async (userId, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/otp/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, otp }),
  });
  return response.json();
};

// Resend OTP
export const resendOTP = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/auth/otp/resend/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
};

// Logout
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return response.json();
};

// ==================== PASSWORD RESET API ====================

// Request password reset (send OTP)
export const requestPasswordReset = async (email, phone) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/reset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, phone }),
  });
  return response.json();
};

// Verify password reset OTP
export const verifyPasswordResetOTP = async (userId, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/verify-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, otp }),
  });
  return response.json();
};

// Reset password with new password
export const resetPassword = async (userId, newPassword, confirmPassword) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/reset/confirm/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }),
  });
  return response.json();
};

// ==================== PROFILE API ====================

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await fetch(`${API_BASE_URL}/profile/update/`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });
  return response.json();
};

// ==================== LOCATION API ====================

// Get user locations
export const getLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/locations/`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Add new location
export const addLocation = async (locationData) => {
  const response = await fetch(`${API_BASE_URL}/locations/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(locationData),
  });
  return response.json();
};

// Set default location
export const setDefaultLocation = async (locationId) => {
  const response = await fetch(`${API_BASE_URL}/locations/${locationId}/set_default/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return response.json();
};

// ==================== CATEGORIES API ====================

// Get all categories
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  return response.json();
};

// Get single category with services
export const getCategoryById = async (categoryId) => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`);
  return response.json();
};

// ==================== SERVICES API ====================

// Get popular services
export const getPopularServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services/popular/`);
  return response.json();
};

// Get services by category
export const getServicesByCategory = async (categoryId) => {
  const response = await fetch(`${API_BASE_URL}/services/?category=${categoryId}`);
  return response.json();
};

// Get delivery services
export const getDeliveryServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services/delivery/`);
  return response.json();
};

// Get cake delivery services
export const getCakeDeliveryServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services/cake-delivery/`);
  return response.json();
};

// Search services, providers, and categories
export const searchServices = async (query, type = 'all') => {
  const response = await fetch(`${API_BASE_URL}/search/?q=${encodeURIComponent(query)}&type=${type}`);
  return response.json();
};

// Filter services by category, price range, etc.
export const filterServices = async (filters) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.min_price) params.append('min_price', filters.min_price);
  if (filters.max_price) params.append('max_price', filters.max_price);
  if (filters.sort_by) params.append('sort_by', filters.sort_by);
  const response = await fetch(`${API_BASE_URL}/services/filter/?${params.toString()}`);
  return response.json();
};

// Get services by category (Service Connect)
export const getServicesByCategoryName = async (categoryIdOrName) => {
  const response = await fetch(`${API_BASE_URL}/services/category/?category_id=${categoryIdOrName}`);
  return response.json();
};

// Get congratulations message
export const getCongratulations = async (action) => {
  const response = await fetch(`${API_BASE_URL}/congratulations/?action=${action || 'default'}`);
  return response.json();
};

// Get service registration congratulations
export const getServiceCongrats = async () => {
  const response = await fetch(`${API_BASE_URL}/service-congrats/`);
  return response.json();
};

// ==================== PROVIDER API ====================

// Register as service provider
export const registerAsProvider = async (providerData) => {
  const response = await fetch(`${API_BASE_URL}/provider-register/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(providerData),
  });
  return response.json();
};

// Get top providers
export const getTopProviders = async () => {
  const response = await fetch(`${API_BASE_URL}/providers/top/`);
  return response.json();
};

// ==================== HOME API ====================

// Get home page data
export const getHomeData = async () => {
  const response = await fetch(`${API_BASE_URL}/home/`);
  return response.json();
};

// ==================== OFFERS API ====================

// Get active offers
export const getOffers = async () => {
  const response = await fetch(`${API_BASE_URL}/offers/`);
  return response.json();
};

// ==================== BOOKINGS API ====================

// Get user bookings
export const getBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Create new booking
export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return response.json();
};

// ==================== REVIEWS API ====================

// Get reviews for a service
export const getServiceReviews = async (serviceId) => {
  const response = await fetch(`${API_BASE_URL}/reviews/?service=${serviceId}`);
  return response.json();
};

// Get reviews for a provider
export const getProviderReviews = async (providerId) => {
  const response = await fetch(`${API_BASE_URL}/reviews/?provider=${providerId}`);
  return response.json();
};

// Create a review
export const createReview = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/reviews/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reviewData),
  });
  return response.json();
};

// ==================== USERS API ====================

// Get current user profile
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/me/`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

// Get user by ID
export const getUserById = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

export default {
  API_BASE_URL,
  login,
  register,
  verifyOTP,
  resendOTP,
  logout,
  requestPasswordReset,
  verifyPasswordResetOTP,
  resetPassword,
  updateProfile,
  getLocations,
  addLocation,
  setDefaultLocation,
  getCategories,
  getCategoryById,
  getPopularServices,
  getServicesByCategory,
  getDeliveryServices,
  getCakeDeliveryServices,
  searchServices,
  filterServices,
  getServicesByCategoryName,
  getCongratulations,
  getServiceCongrats,
  registerAsProvider,
  getTopProviders,
  getHomeData,
  getOffers,
  getAPIRoot,
  getBookings,
  createBooking,
  cancelBooking,
  getServiceReviews,
  getProviderReviews,
  createReview,
  getCurrentUser,
  getUserById,
};
