import React, { useEffect } from "react";
import "./ServiceCongrats.css";
import profileImg from "./assets/service congrats.png";

export default function ServiceCongrats({
  onNavigateToHome
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigateToHome();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNavigateToHome]);

  return (
    <div className="service-congrats-wrapper">

      <div className="service-congrats-card">

        <div className="service-congrats-image-area">
          <img
            src={profileImg}
            alt="profile"
            className="service-profile-image"
          />
        </div>

        <h1 className="service-congrats-title">
          Congratulations
        </h1>

        <p className="service-congrats-text">
          Your Account is Ready to Use.
          You will be redirected to the Home Page
          in a Few Seconds.
        </p>

        <div className="service-loader"></div>

      </div>
    </div>
  );
}