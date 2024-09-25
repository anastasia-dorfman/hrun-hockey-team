import React from "react";
import { FaFacebookF, FaGoogle, FaTimes } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/CustomWelcomeToast";

const CustomWelcomeToast = ({ onClose, onSignUp, onSignIn }) => {
  return (
    <Wrapper>
      <button className="close-button" onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>

      <div className="image-container">
        <img
          src="/assets/images/welcome_hockey_school.png"
          alt="Hockey School"
        />
      </div>

      <div className="content-container">
        <div>
          <h1 className="title">Welcome to the Castors Hockey School</h1>
          <h3 className="subtitle">We're glad to see you here!</h3>
          <p className="description">
            Create an account to quickly and easily register for Hockey School.
          </p>
        </div>

        <div>
          <div className="button-container">
            <button className="selected sign-up-button" onClick={onSignUp}>
              Sign up
            </button>
            <button className="sign-in-button" onClick={onSignIn}>
              Sign in
            </button>
          </div>

          <div className="divider">or</div>

          <div className="social-button-container">
            <button className="social-button facebook">
              <FaFacebookF />
            </button>
            <button className="social-button google">
              <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomWelcomeToast;
