import React, { useCallback, useEffect, useRef, useState } from "react";
import PinInput from "react-pin-input";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const VerificationCodeForm = ({ setShowLogInForm, phoneNumber, setData }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const pinInputRef = useRef("");

  const resetInput = useCallback(() => {
    setError("");
    setVerificationCode("");
    if (pinInputRef && pinInputRef.current) pinInputRef.current.clear();
  }, [pinInputRef]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(resetInput, 1500);
      return () => clearTimeout(timeout);
    }
  }, [error, resetInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificationCode.length < 6) {
      setError("Please enter a valid verification code");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.AUTH_API_URL}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: phoneNumber, code: verificationCode }),
        }
      );

      if (!response.ok) {
        setError("error");
        // throw new Error("Verification code is incorrect");
      }
      const data = await response.json();
      signInWithCustomToken(getAuth(), data.result.token);
      console.log(getAuth());
      setError("");
      if (data.result && !data?.result?.expertise) {
        setShowLogInForm("userDetailsForm");
      }

      alert("Verification successful");
    } catch (error) {
      console.log(error);
      setError("error");
      // alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto bordered-card-container my-28">
        <div className="px-3 pb-3">
          <i
            className="fas fa-arrow-left px-3 cursor-pointer"
            onClick={() => setShowLogInForm("loginForm")}
          />
          Back to Sign in
        </div>
        <div className="bordered-card rounded-2xl p-10">
          <p className="text-lg font-medium mb-4">
            Sent to {phoneNumber}
            <button
              className="pl-1"
              onClick={() => setShowLogInForm("loginForm")}
            >
              Edit
            </button>
          </p>
          <div className="mt-4">
            <p className="py-3 ">Enter your verification code</p>
            <PinInput
              ref={pinInputRef}
              length={6}
              type="numeric"
              inputMode="number"
              inputStyle={{
                margin: "0 5px",
                background: "#1C1E31",
                border: `1px solid ${!error ? "#B3BAE7" : "#FF0000"}`,
                borderRadius: "12px",
                fontSize: "25px",
              }}
              onChange={(e) => {
                setVerificationCode(e);
              }}
            />
            {error && (
              <p className="flex pt-2 text-poddl-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-1 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                The OTP you entered is incorrect
              </p>
            )}
            <p className="pt-5 text-poddl-500">Didn't get your code?</p>
          </div>
          {/* remove opacity class if otp is entered */}
          <button
            className={`bg-poddl-disabledButton w-full ${
              verificationCode.length === 6 ? "" : "opacity-50"
            } mt-10 h-11 rounded-xl`}
            type="submit"
          >
            Proceed
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerificationCodeForm;
