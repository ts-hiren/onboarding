import React, { useState } from "react";
import LoginForm from "./LoginForm";
import UserDetailsForm from "./UserDetailsForm";
import UserSelectionForm from "./UserSelectionForm";
import VerificationCodeForm from "./VerificationCodeForm";

const Login = () => {
  const [showLogInForm, setShowLogInForm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (showLogInForm === "loginForm") {
    return (
      <LoginForm
        setShowLogInForm={setShowLogInForm}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
      />
    );
  } else if (showLogInForm === "verificationForm") {
    return (
      <VerificationCodeForm
        setShowLogInForm={setShowLogInForm}
        phoneNumber={phoneNumber}
      />
    );
  } else if (showLogInForm === "userDetailsForm") {
    return <UserDetailsForm />;
  } else {
    return <UserSelectionForm setShowLogInForm={setShowLogInForm} />;
  }
};

export default Login;
