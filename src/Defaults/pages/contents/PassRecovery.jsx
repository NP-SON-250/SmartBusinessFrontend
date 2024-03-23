import React, { useState } from "react";
import Recovery from "../../../assets/images/Loginimga.webp";
import VerifyCode from "./VerifyCode";

const PassRecovery = () => {
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const handleSendCode = () => {
    // Add your logic to send the verification code (e.g., API call)

    // Show the verification input form after sending the code
    setShowVerificationForm(true);
  };

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 pt-24">
      <div>
        <img src={Recovery} alt="" className="" />
      </div>
      <div className="text-center">
        {showVerificationForm ? (
          <VerifyCode />
        ) : (
          <form className="flex flex-col gap-10 py-10">
            <div>
              <h1 className="text-center font-semibold">Reset Your Password</h1>
              <p className="text-center text-gray-500">
                Enter your email and we'll send you a verification code <br />
                to reset your password. Please check it.
              </p>
              <label
                htmlFor="username"
                className="input-label lg:text-sm lg:font-normal text-xl font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-1/2 ml-5 mt-5 rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
              />
            </div>
            <button
              type="button"
              onClick={handleSendCode}
              className="bg-gradient-to-r from-primary to-secondary w-28 ml-36 hover:scale-105 duration-200 text-white py-1 px-4 rounded-md"
            >
              Send code
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PassRecovery;
