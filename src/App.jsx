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
import Review from './Review.jsx'
import Reviewss from './Reviewss.jsx'
import Jobs from './Jobs.jsx'
import Jobses from './Jobses.jsx'
import ServiceDetails from './ServiceDetails.jsx'
import ComplaintForm from './ComplaintForm.jsx'
import ComplaintList from './ComplaintList.jsx'     
import Request from './Request.jsx'
import Bookings from './Bookings.jsx'
import BookingDetails from './BookingDetails.jsx'
import PaymentMethods from './PaymentMethods.jsx'
import PaymentSuccess from './PaymentSuccess.jsx'
import EReceipt from './EReceipt.jsx'
import ServiceCompleted from './ServiceCompleted.jsx'  
import Transactions from './Transactions.jsx' 
import Services from './Services.jsx' 
import Profiless from './Profiless.jsx' 
import EditProfiless from './EditProfiless.jsx' 
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('serviceconnect')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [userId, setUserId] = useState(null)

  const [selectedPayment, setSelectedPayment] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState(0)

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

  // REVIEW
  const handleNavigateToReview = () => setCurrentPage('review')
  const handleNavigateToReviewss = () => setCurrentPage('reviewss')

  // JOBS
  const handleNavigateToJobs = () => setCurrentPage('jobs')

  // SERVICE DETAILS
  const handleNavigateToServiceDetails = () => setCurrentPage('servicedetails')

  //  COMPLAINT FORM
  const handleNavigateToComplaintForm = () => setCurrentPage('complaint')
  const handleNavigateToComplaintList = () => setCurrentPage('complaintlist')

  // REQUEST / BOOKINGS
  const handleNavigateToRequest = () => setCurrentPage('request')
  const handleNavigateToBookings = () => setCurrentPage('bookings')
  const handleNavigateToBookingDetails = () => setCurrentPage('bookingdetails')

  // PAYMENTServices
  const handleNavigateToPaymentMethods = () => setCurrentPage('paymentmethods')
  // ServiceCompleted
  const handleNavigateToServiceCompleted = () => setCurrentPage('servicecompleted')
  //  TRANSACTIONS NAVIGATION
  const handleNavigateToTransactions = () => setCurrentPage('transactions')
  // Services
   const handleNavigateToServices = () => setCurrentPage('Services') 

  //  Jobses
  const handleNavigateToJobses = () => setCurrentPage('Jobses')
  // Profiless
  const handleNavigateToProfiless = () => setCurrentPage('Profiless')
  
  // EditProfiless
  const handleNavigateToEditProfiless = () => setCurrentPage('EditProfiless')

  const handlePaymentSuccess = (selected, amount) => {
    setSelectedPayment(selected)
    setPaymentAmount(amount)
    setCurrentPage('paymentsuccess')
  }

  const handleNavigateToEReceipt = () => setCurrentPage('ereceipt')

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
        <CongratulationsPopup onNavigateToLogin={handleNavigateToLogin} />

      ) : currentPage === 'registerservice' ? (
        <RegisterService onNavigateToServiceCongrats={handleNavigateToServiceCongrats} />

      ) : currentPage === 'servicecongrats' ? (
        <ServiceCongrats onNavigateToHome={handleNavigateToHome} />

      ) : currentPage === 'home' ? (
        <Home
          onNavigateToAllCategory={handleNavigateToAllCategory}
          onNavigateToCategory={handleNavigateToDeliveryServices}
          onNavigateToSearch={handleNavigateToSearch}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToBookings={handleNavigateToBookings}
          onNavigateToJobs={handleNavigateToJobs}
        />

      ) : currentPage === 'jobs' ? (
        <Jobs
          onNavigateBack={handleNavigateToHome}
          onNavigateToServiceDetails={handleNavigateToServiceDetails}
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
          onNavigateToServiceDetails={handleNavigateToServiceDetails}
        />

      ) : currentPage === 'servicedetails' ? (
        <ServiceDetails
          onNavigateBack={handleNavigateToJobs}
          onNavigateToComplaint={handleNavigateToComplaintForm}   
        />

      ) : currentPage === 'complaint' ? (
        <ComplaintForm
          onNavigateBack={handleNavigateToServiceDetails}
           onNavigateToComplaintList={handleNavigateToComplaintList}
        />

        ) : currentPage === 'complaintlist' ? (
        <ComplaintList
          onNavigateBack={handleNavigateToComplaintForm}
           onNavigateToServiceCompleted ={handleNavigateToServiceCompleted }

        />
        

        ) : currentPage === 'servicecompleted' ? (
        <ServiceCompleted 
        onNavigateToTransactions={handleNavigateToTransactions}
         />

         ) : currentPage === 'transactions' ? (
        <Transactions
          onNavigateBack={handleNavigateToComplaintList}
           onNavigateToServices ={handleNavigateToServices }
        />

         ) : currentPage === 'Services' ? (
        <Services
          onNavigateBack={handleNavigateToTransactions}
          onNavigateToJobses={handleNavigateToJobses}
        />

         ) : currentPage === 'Jobses' ? (
        <Jobses
          onNavigateBack={handleNavigateToServices}
          onNavigateToProfiless={handleNavigateToProfiless}
          
        />
        ) : currentPage === 'Profiless' ? (
        <Profiless
          onNavigateBack={handleNavigateToJobses}
          onNavigateToEditProfiless={handleNavigateToEditProfiless}
          
        />
        ) : currentPage === 'EditProfiless' ? (
        <EditProfiless
          onNavigateBack={handleNavigateToProfiless}
          
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
          onNavigateToReview={handleNavigateToReview}
        />

      ) : currentPage === 'review' ? (
        <Review
          onNavigateBack={handleNavigateToProfile}
          onNavigateToReviewss={handleNavigateToReviewss}
        />

      ) : currentPage === 'reviewss' ? (
        <Reviewss
          onNavigateBack={handleNavigateToReview}
          onNavigateToJobs={handleNavigateToJobs}
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
          onSuccess={handlePaymentSuccess}
        />

      ) : currentPage === 'paymentsuccess' ? (
        <PaymentSuccess
          selected={selectedPayment}
          amount={paymentAmount}
          onClose={handleNavigateToHome}
          onNavigateToEReceipt={handleNavigateToEReceipt}
        />

      ) : currentPage === 'ereceipt' ? (
        <EReceipt
          selected={selectedPayment}
          amount={paymentAmount}
          onNavigateToHome={handleNavigateToHome}
          onNavigateBack={handleNavigateToPaymentMethods}
          onNavigateToReview={handleNavigateToReview}
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