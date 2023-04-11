import React from "react";
import PhoneNumberInput from "./PhoneNumberInput";

const LoginForm = ({ setShowLogInForm, setPhoneNumber, phoneNumber }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      await fetch(`${process.env.AUTH_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      setShowLogInForm("verificationForm");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto bordered-card-container my-28">
        <div className="px-3 pb-3">
          <i
            className="fas fa-arrow-left px-3 cursor-pointer"
            onClick={() => setShowLogInForm("")}
          />
          Back to User Selection
        </div>
        <div className="bordered-card rounded-2xl p-10 backdrop-blur-2xl">
          <p className="text-lg font-medium mb-4">
            Signing as a Freelancer/Creator
          </p>
          <PhoneNumberInput setPhoneNumber={setPhoneNumber} />
          {/* remove opacity class if no. is entered */}
          <button
            className={`bg-poddl-disabledButton ${
              phoneNumber && phoneNumber.length >= 10 ? "" : "opacity-50"
            } w-full mt-10 h-11 rounded-xl`}
            type="submit"
            disabled={!phoneNumber || phoneNumber.length < 10}
          >
            Get OTP
          </button>
        </div>
        <div className="text-center mt-4">
          Don't have an account?
          <span className="text-poddl-500 pl-1">Request early access</span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
