import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import LoginImage from "../../assets/images/greenWitch.png";
import Logo from "../../assets/logo.png";
import Heading from '../fonts/Heading';
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const errors = (message) => {
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
  ``;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = async () => {
    try {
      const result = await axios.post(
        "http://localhost:2400/Smartbusiness/API/users/login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("id", result.data.users.id);

      const role = result.data.users.role;
      if (role === "admin") {
        console.log(result);
        success(result.data.message);
        setTimeout(() => {
          navigate("/dashboard/admins");
        }, 1000);
      } else if (role === "seller") {
        console.log(result);
        success(result.data.message);
        setTimeout(() => {
          navigate("/sellers/dashboard");
        }, 1000);
      } else if (role === "supplier") {
        console.log(result);
        success(result.data.message);
        setTimeout(() => {
          navigate("/suppliers/dashboard");
        }, 1000);
      } else {
        console.log(result);
        success(result.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response) {
        errors(error.response.data.message);
      } else if (error.request) {
        console.error("No Response from Server");
      } else {
        console.error("Request Setup Error:", error.message);
      }
    }
  };


  return (
    <div>
        <div className='container grid lg:grid-cols-2 grid-cols-1 pt-32 pb-4'>
            <div className="image bg-green-400 rounded-md shadow-md w-full">
                <img src={LoginImage} alt="" />
            </div>
            <div className="form shadow-md border-l border-red-100 w-full">
                <div className="pt-10 flex flex-col justify-center items-center text-center">
                <img src={Logo} alt="" className="h-12 w-12" />
                <Heading subtitle={"Login to the system"} />
                </div>
                <div className='lg:p-16 p-5 lg:pt-0'>
                      <div className="lg:px-12">
                    <label
                      htmlFor="Email"
                      className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="Email"
                      type="email"
                      placeholder='Email'
                      onChange={handleEmail}
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4"
                      
                    />
                  </div>
                  <div className="lg:px-12">
                    <label
                      htmlFor="password"
                      className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4"
                        id="password"
                        placeholder='Password'
                        onChange={handlePassword}
                        type={showPassword ? "text" : "password"}
                        
                      />
                      {showPassword ? (
                        <FaEye
                          className="text-gray-500 text-xl lg:text-md absolute top-4 right-3 -translate-y-1/2 cursor-pointer "
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaEyeSlash
                          className="text-gray-500 text-xl lg:text-md absolute top-4 right-3 -translate-y-1/2 cursor-pointer "
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                      <div className="terms flex flex-row justify-center gap-2 pb-5">
                        <input type="checkbox" name="keep" id="keep" className="lg:w-4 w-5"/>
                        Keep me loggedin
                      </div>
                <div className="flex flex-row justify-center gap-5 lg:ml-24 md:ml-48">
                <button
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-md "
                    onClick={handleApi}
                  >Login
                  </button>
                  <p className="text-gray-700">No Account?</p>
                  <Link to={"/register"}>
                    <p className="text-blue-400 hover:text-secondary">Create Account</p>
                  </Link>
                </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login