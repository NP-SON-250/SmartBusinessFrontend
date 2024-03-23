import React,{ useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/greenWitch.png";
import Logo from "../../assets/logo.png";
import Heading from '../fonts/Heading';
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";


const Register = () => {

  //show password state
  const [showPassword, setShowPassword] = useState(false);

  // Toasting
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
  
  const failed = (message) => {
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
  // =================== adding new user ================
    
  const [user, setUser] = useState({
    profile: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const apiKey = localStorage.getItem("token");

  const handleInput = (event) => {
    if (event.target.name === "profile") {
      setUser({ ...user, profile: event.target.files[0] });
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("profile", user.profile);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("password", user.password);
  
      const response = await axios.post(
        "http://localhost:2400/Smartbusiness/API/users/signUp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.data.status == 200){
      success(response.data.message);
      navigate("/login");
      setTimeout(() => {
      }, 2000);
    }
  
      setTimeout(() => {
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response) {
        failed(error.response.data.message);
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
                <img src={RegisterImage} alt="" />
            </div>
            <div className="form shadow-md border-l border-red-100 w-full">
            <div className="pt-10 flex flex-col justify-center items-center text-center">
                <img src={Logo} alt="" className="h-12 w-12" />
                <Heading subtitle={"Register to have account"} />
            </div>
              <div className='lg:p-16 p-5 lg:pt-0'>
              <form action="#" onSubmit={handleSubmit}>
                      <div className="lg:px-12">
                        <label
                          htmlFor="firstName"
                          className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          placeholder='First Name'
                          type="text"
                          className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4"
                          onChange={handleInput}
                          
                        />
                      </div>
                      <div className="lg:px-12">
                        <label
                          htmlFor="lastName"
                          className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          placeholder='Last Name'
                          type="text"
                          className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4"
                          onChange={handleInput}
                          
                        />
                      </div>
                      <div className="lg:px-12">
                    <label
                      htmlFor="Email"
                      className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="Email"
                      name="email"
                      type="email"
                      placeholder='Email'
                      className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4"
                      onChange={handleInput}
                      
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
                        name="password"
                        laceholder='Password'
                        type={showPassword ? "text" : "password"}
                        onChange={handleInput}
                        
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
                  <div className="lg:px-12">
                        <label
                          htmlFor="profile"
                          className="input-label lg:text-sm lg:font-normal text-xl font-medium"
                        >
                          Profile
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="profile"
                          accept="image/*"
                          onChange={handleInput}
                          className="w-full rounded-md border border-gray-900 dark:border-gray-500 px-2 py-1 mb-4"
                        />
                      </div>
                      <div className="terms flex flex-row justify-center gap-2 pb-5">
                        <input type="checkbox" name="terms" id="terms" className="lg:w-4 w-5"/>
                        I aggree to the
                        <Link to={"/terms"}>
                            <p className="text-blue-400 hover:text-secondary">terms and conditions</p>
                        </Link>
                      </div>
                <div className="flex flex-row justify-center gap-5 lg:ml-24 md:ml-48">
                <button
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-md "
                    name="submit"
                  >Register
                  </button>
                  <p className="text-gray-700">Have an account?</p>
                  <Link to={"/login"}>
                    <p className="text-blue-400 hover:text-secondary">Login</p>
                  </Link>
                </div>
                </form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Register