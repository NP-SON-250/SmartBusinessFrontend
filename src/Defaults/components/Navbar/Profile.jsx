// Profile.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiNotification3Line } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';

import Notification from "../../../shared/notifications/Notification";

const Profile = () => {

  const notify=4;
  const cart=8;
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <div className="flex md:gap-40 lg:gap-4 gap-40 dark:bg-transparent-900 dark:text-white">
        
        <div className="absolute md:right-[12rem] right-[3.5rem] md:top-1">
          <button className="py-1 px-4 rounded-full flex items-center"
          onClick={toggleNotifications}
          >
            <RiNotification3Line className="text-xl cursor-pointer text-blue-400" />
            <div className="absolute right-1 -top-1 flex justify-center items-center text-center w-5 h-5 " >{notify}</div>
          {showNotifications && <Notification />}

          </button>
        </div>

        {/* Login button */}
        <Link to={"/register"}>
          <button className="md:block lg:block hidden bg-gradient-to-r from-primary to-secondary text-white  py-1 px-4 -mr-4 rounded-full flex items-center gap-3">
            Join Us
          </button>
        </Link>

        <div className="absolute md:right-28 -right-[2rem] md:top-1">
          <button className="py-1 px-4 rounded-full flex items-center gap-3">
            <FiShoppingCart className="text-xl cursor-pointer text-blue-400" />
            <div className="absolute right-1 -top-1 flex justify-center items-center text-center w-5 h-5  " >{cart}</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;


