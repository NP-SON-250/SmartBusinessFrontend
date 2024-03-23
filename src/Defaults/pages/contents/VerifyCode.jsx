import React, { useState } from "react";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Move to the next input field
      if (index < verificationCode.length - 1 && value !== "") {
        document.getElementById(`verification-input-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    if (
      /^\d*$/.test(pastedData) &&
      pastedData.length <= verificationCode.length
    ) {
      const newVerificationCode = [...verificationCode];
      for (let i = 0; i < pastedData.length; i++) {
        newVerificationCode[i] = pastedData[i];
      }
      setVerificationCode(newVerificationCode);
    }
  };

  return (
    <div className="flex flex-col gap-0 py-10 shadow-md lg:w-[30rem] lg:ml-20 lg:mt-10">
      <div>
        <h1 className="text-center font-semibold">Enter Verification Code</h1>
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            id={`verification-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onPaste={(e) => handlePaste(e)}
            className="bg-transparent w-8 h-8 mx-1 text-4xl text-center border-b-2 border-gray-900 dark:border-white focus:outline-none focus:border-primary"
          />
        ))}
        <button className="absolute right-8 lg:right-36 md:right-10 font-semibold text-blue-800 hover:text-primary">
          Verify
        </button>
        <p className="text-center text-gray-500 pt-5">
          No code recieved?{" "}
          <a
            href="/password/recovery"
            className="text-blue-800 hover:text-primary pl-5"
          >
            Resent
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyCode;
