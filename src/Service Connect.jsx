import "./Service Connect.css";
import ServiceConnect from "./assets/Service Connect.png";
import google from "./assets/google.png";
import Phone from "./assets/Phone.png";
export default function LaunchScreen({ onNavigateToLogin }) {
  return (
    <div className="sc-launch-root">
      <div className="sc-launch-main">

        <div className="sc-logo-area">
          <div className="sc-logo-outer">
            <div className="sc-logo-inner">
              <img src={ServiceConnect} alt="logo" className="sc-logo-image" />
            </div>
          </div>

          
        </div>

        <div className="sc-login-area">

          <button className="sc-login-button sc-phone-button" onClick={onNavigateToLogin}>
            <div className="sc-icon-circle">
              <img src={Phone} alt="Phone" className="phone-icon" />
              </div>
            Login with Email/Phone
          </button>

          <button className="sc-login-button sc-google-button">
            <div className="sc-icon-circle sc-google-icon-circle">
              <img src={google} alt="Google" className="sc-google-icon" />
            </div>
            Login with Google
          </button>

          <p className="sc-signup-text">
            Don't have an account? <span>Sign Up</span>
          </p>

        </div>

      </div>
    </div>
  );
}
