import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { usePopup } from "../../PopupContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Popup = () => {
  const { orderPopup, handleOrderPopup } = usePopup();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // State variables for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State variables for register form
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerProfile, setRegisterProfile] = useState("");

  const navigate = useNavigate();
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const error = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:2400/Smartbusiness/API/users/login", {
        email: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.users.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.users.firstName);
        localStorage.setItem("profile", response.data.users.profile);
        const { role } = response.data?.users;
        localStorage.setItem("role", role);
        if (role === "admin") {
          console.log(response);
          success("Welcome admin");
          setTimeout(() => {
            navigate("/dashboard/admins");
          }, 1000);
        } else if (role === "seller") {
          console.log(response);
          success("Welcome seller");
          setTimeout(() => {
            navigate("/sellers/dashboard");
          }, 1000);
        } else if (role === "supplier") {
          console.log(response);
          success("Welcome supplier");
          setTimeout(() => {
            navigate("/suppliers/dashboard");
          }, 1000);
        } else {
          console.log(response);
          toast.success("welcome dear");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        error("Incorrect email or password");
        console.error(error);
      });
    console.log("Login", loginEmail, loginPassword);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", registerEmail);
    formData.append("password", registerPassword);
    formData.append("firstName", registerFirstName);
    formData.append("lastName", registerLastName);

    // Append the profile file to FormData
    if (registerProfile) {
      formData.append("profile", registerProfile[0]);
    }

    axios
      .post("http://localhost:2400/Smartbusiness/API/users/signUp", formData)
      .then((response) => {
        console.log(response);
        success("User created successfully");
        setTimeout(() => {
          setIsLoginMode(!isLoginMode);
        }, 10000);
      })
      .catch((error) => {
        console.log("Errors");
        console.error(error);
      });
  };

  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 md:w-[600px] lg:w-[600px] w-[350px]">
              {/* header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className=" ml-24 md:ml-48 lg:ml-48 text-2xl font-semibold">
                    {isLoginMode ? "Login here..." : "Register here..."}
                  </h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer"
                    onClick={() => handleOrderPopup()}
                  />
                </div>
              </div>
              {/* form section */}
              <div className="mt-1">
                <form className="flex flex-col gap-0">
                  <div>
                    <label
                      htmlFor="Email"
                      className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="Email"
                      type="email"
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      value={isLoginMode ? loginEmail : registerEmail}
                      onChange={(e) =>
                        isLoginMode
                          ? setLoginEmail(e.target.value)
                          : setRegisterEmail(e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={isLoginMode ? loginPassword : registerPassword}
                        onChange={(e) =>
                          isLoginMode
                            ? setLoginPassword(e.target.value)
                            : setRegisterPassword(e.target.value)
                        }
                      />
                      {showPassword ? (
                        <FaEye
                          className="text-gray-500 absolute top-4 right-3 -translate-y-1/2 cursor-pointer "
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaEyeSlash
                          className="text-gray-500 absolute top-4 right-3 -translate-y-1/2 cursor-pointer "
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-18 text-center  hover:normal-case">
                    {isLoginMode && (
                      <a href="/password/recovery" className="cursor-default">
                        <p className="text-blue-800 underline hover:text-primary py-5 cursor-pointer">
                          Forget password?
                        </p>
                      </a>
                    )}
                  </div>
                  {isLoginMode ? null : (
                    <>
                      <div>
                        <label
                          htmlFor="firstName"
                          className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                          value={registerFirstName}
                          onChange={(e) => setRegisterFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                          value={registerLastName}
                          onChange={(e) => setRegisterLastName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="profile"
                          className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                        >
                          Profile
                        </label>
                        <input
                          id="profile"
                          type="file"
                          className="w-full rounded-md border border-gray-900 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                          onChange={(e) => setRegisterProfile(e.target.files)}
                        />
                      </div>
                    </>
                  )}
                </form>
                <div className="flex justify-center gap-10">
                  <button
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-md"
                    onClick={isLoginMode ? handleLogin : handleRegister}
                  >
                    {isLoginMode ? "Login" : "Register"}
                  </button>
                  Click here to
                  <p
                    className="text-gray-900 md:font-normal font-bold dark:text-white hover:text-primary cursor-pointer"
                    onClick={toggleMode}
                  >
                    {isLoginMode ? "Register" : "Login"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Popup;
