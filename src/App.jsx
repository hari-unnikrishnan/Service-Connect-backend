import { useState } from 'react'
import ServiceConnect from './Service Connect.jsx'
import Login from './login.jsx'
import Register from './Register.jsx'
import OTPVerification from './OTPVerification.jsx'
import LocationUI from './Location.jsx'
import FillProfile from './FillProfile.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import VerifyOtp from './VerifyOtp.jsx'
import CreateNewPassword from './CreateNewPassword.jsx'
import CongratulationsPopup from './CongratulationsPopup.jsx'
import RegisterService from './RegisterService.jsx'
import ServiceCongrats from './ServiceCongrats.jsx'
import Home from './home.jsx'
import AllCategoryUI from './All Category.jsx'
import DeliveryServicesUI from './Delivery Services.jsx'
import Search from './Search.jsx'
import CakeDelivery from './CakeDelivery.jsx'
import Filter from './Filter.jsx'
import Profile from './Profile.jsx'
import Request from './Request.jsx'
import Bookings from './Bookings.jsx'
import BookingDetails from './BookingDetails.jsx'
import PaymentMethods from './PaymentMethods.jsx'   
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('serviceconnect')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [userId, setUserId] = useState(null)

  // NAVIGATION
  const handleNavigateToLogin = () => setCurrentPage('login')
  const handleNavigateToRegister = () => setCurrentPage('register')
  const handleNavigateToOTP = () => setCurrentPage('otp')
  const handleNavigateToLocation = () => setCurrentPage('location')
  const handleNavigateToFillProfile = () => setCurrentPage('FillProfile')
  const handleNavigateToForgotPassword = () => setCurrentPage('forgotpassword')
  const handleNavigateToVerifyOtp = () => setCurrentPage('verifyotp')
  const handleNavigateToCreateNewPassword = () => setCurrentPage('createnewpassword')
  const handleNavigateToCongratulations = () => setCurrentPage('congratulations')
  const handleNavigateToRegisterService = () => setCurrentPage('registerservice')
  const handleNavigateToServiceCongrats = () => setCurrentPage('servicecongrats')

  const handleNavigateToHome = () => {
    setCurrentPage('home')
    setSelectedCategory(null)
  }

  const handleNavigateToAllCategory = () => setCurrentPage('allcategory')

  const handleNavigateToDeliveryServices = (category) => {
    setSelectedCategory(category)
    setCurrentPage('deliveryservices')
  }

  const handleNavigateToSearch = () => setCurrentPage('search')
  const handleNavigateToCakeDelivery = () => setCurrentPage('cakedelivery')
  const handleNavigateToFilter = () => setCurrentPage('filter')
  const handleNavigateToProfile = () => setCurrentPage('profile')

  // REQUEST
  const handleNavigateToRequest = () => setCurrentPage('request')

  // BOOKINGS
  const handleNavigateToBookings = () => setCurrentPage('bookings')

  // BOOKING DETAILS
  const handleNavigateToBookingDetails = () => setCurrentPage('bookingdetails')

  // ✅ PAYMENT METHODS
  const handleNavigateToPaymentMethods = () => setCurrentPage('paymentmethods')

  return (
    <>
      {currentPage === 'serviceconnect' ? (
        <ServiceConnect onNavigateToLogin={handleNavigateToLogin} />

      ) : currentPage === 'login' ? (
        <Login
          onNavigateToRegister={handleNavigateToRegister}
          onNavigateToOTP={handleNavigateToOTP}
          onNavigateToForgotPassword={handleNavigateToForgotPassword}
        />

      ) : currentPage === 'register' ? (
        <Register
          onNavigateToOTP={handleNavigateToOTP}
          onNavigateToLogin={handleNavigateToLogin}
          setUserId={setUserId}
        />

      ) : currentPage === 'otp' ? (
        <OTPVerification
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToLocation={handleNavigateToLocation}
          userId={userId}
        />

      ) : currentPage === 'location' ? (
        <LocationUI
          onNavigateToOTPVerification={handleNavigateToOTP}
          onNavigateToFillProfile={handleNavigateToFillProfile}
        />

      ) : currentPage === 'FillProfile' ? (
        <FillProfile
          onNavigateToOTPVerification={handleNavigateToOTP}
          onNavigateToRegisterService={handleNavigateToRegisterService}
        />

      ) : currentPage === 'forgotpassword' ? (
        <ForgotPassword
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToVerifyOtp={handleNavigateToVerifyOtp}
        />

      ) : currentPage === 'verifyotp' ? (
        <VerifyOtp
          onNavigateBack={handleNavigateToForgotPassword}
          onNavigateToCreateNewPassword={handleNavigateToCreateNewPassword}
        />

      ) : currentPage === 'createnewpassword' ? (
        <CreateNewPassword
          onNavigateBack={handleNavigateToVerifyOtp}
          onNavigateToCongratulations={handleNavigateToCongratulations}
        />

      ) : currentPage === 'congratulations' ? (
        <CongratulationsPopup
          onNavigateToLogin={handleNavigateToLogin}
        />

      ) : currentPage === 'registerservice' ? (
        <RegisterService
          onNavigateToServiceCongrats={handleNavigateToServiceCongrats}
        />

      ) : currentPage === 'servicecongrats' ? (
        <ServiceCongrats
          onNavigateToHome={handleNavigateToHome}
        />

      ) : currentPage === 'home' ? (
        <Home
          onNavigateToAllCategory={handleNavigateToAllCategory}
          onNavigateToCategory={handleNavigateToDeliveryServices}
          onNavigateToSearch={handleNavigateToSearch}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToBookings={handleNavigateToBookings}
        />

      ) : currentPage === 'allcategory' ? (
        <AllCategoryUI
          onNavigateToHome={handleNavigateToHome}
          onNavigateToDeliveryServices={handleNavigateToDeliveryServices}
          onNavigateToSearch={handleNavigateToSearch}
        />

      ) : currentPage === 'search' ? (
        <Search
          onNavigateToAllCategory={handleNavigateToAllCategory}
          onNavigateToDeliveryServices={handleNavigateToDeliveryServices}
          onNavigateToCakeDelivery={handleNavigateToCakeDelivery}
        />

      ) : currentPage === 'cakedelivery' ? (
        <CakeDelivery
          onNavigateToDeliveryServices={handleNavigateToDeliveryServices}
          onNavigateToFilter={handleNavigateToFilter}
          onNavigateToProfile={handleNavigateToProfile}
        />

      ) : currentPage === 'filter' ? (
        <Filter
          onNavigateToDeliveryServices={handleNavigateToDeliveryServices}
          onNavigateToCakeDelivery={handleNavigateToCakeDelivery}
        />

      ) : currentPage === 'profile' ? (
        <Profile
          onNavigateBack={handleNavigateToCakeDelivery}
          onNavigateToRequest={handleNavigateToRequest}
        />

      ) : currentPage === 'request' ? (
        <Request
          onNavigateBack={handleNavigateToProfile}
          onNavigateToBookings={handleNavigateToBookings}
        />

      ) : currentPage === 'bookings' ? (
        <Bookings
          onNavigateBack={handleNavigateToRequest}
          onNavigateToBookingDetails={handleNavigateToBookingDetails}
        />

      ) : currentPage === 'bookingdetails' ? (
        <BookingDetails
          onNavigateBack={handleNavigateToBookings}
          onNavigateToPaymentMethods={handleNavigateToPaymentMethods}
        />

      ) : currentPage === 'paymentmethods' ? (
        <PaymentMethods
          onNavigateBack={handleNavigateToBookingDetails}
          onNavigateToHome={handleNavigateToHome}
        />

      ) : (
        <DeliveryServicesUI
          onNavigateToHome={handleNavigateToHome}
          onNavigateToAllCategories={handleNavigateToAllCategory}
          onNavigateToSearch={handleNavigateToSearch}
          onNavigateToCakeDelivery={handleNavigateToCakeDelivery}
          onNavigateToFilter={handleNavigateToFilter}
          category={selectedCategory}
        />
      )}
    </>
  )
}

export default App