import React, { useEffect } from "react";
import "./CongratulationsPopup.css";
import { X } from "lucide-react";
import successImage from "./assets/success Image.png";

export default function CongratulationsPopup({
  onNavigateToLogin
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigateToLogin();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigateToLogin]);

  return (
    <div className="congrats-wrapper">

      <div className="congrats-popup">

        <button
          className="congrats-close-btn"
          onClick={onNavigateToLogin}
        >
          <X size={28} />
        </button>

        <div className="congrats-icon-area">
          <div className="success-image-wrapper">
            <img
              src={successImage}
              alt="success"
              className="success-image"
            />
          </div>
        </div>

        <h1 className="congrats-title">
          Congratulations
        </h1>

        <p className="congrats-text">
          Your Account is Ready to Use. You will be redirected
          to the Login Page in a Few Seconds.
        </p>

        <div className="loader-ring"></div>

      </div>
    </div>
  );
}