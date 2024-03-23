// Notification.jsx

import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NButton from '../button/NewBtn';
import { chatData } from '../data/DummyData';

const Notification = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <div>
     {isNotificationVisible && (
  <div className="nav-item absolute -right-[6rem] md:right-0 top-14 bg-white dark:bg-gray-900 p-8 rounded-lg md:w-[30rem] w-screen">
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
      
        <p className="font-semibold text-lg text-gray-500">Notifications</p>
        <button type="button" className="dark:text-gray-200 font-bold rounded p-1 px-2 bg-orange-theme "> 4 New</button>
      </div>
      <button
        type="button"
        style={{ color: "rgb(228, 106, 118)", backgroundColor: "rgb(255, 244, 229)"}}
        className=" flex justify-center items-center text-center absolute top-4 right-4 text-2xl opacity-0.9 w-12 h-12 rounded-full  p-4 hover:drop-shadow-xl"
       >
        <MdOutlineCancel/>
      </button>
    </div>
    <div className="-mt-4 ml-10 ">
      <Link to={"/notification"}>
      {chatData?.map((item, index) => (
        <div key={index} className="flex items-center gap-1 border-b-1 border-color p-3">
          <img className="rounded-full h-10 w-10" src={item.image} alt={item.message} />
          <div>
            <p className="font-semibold dark:text-gray-200">{item.message}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            <p className="text-gray-500 text-sm dark:text-gray-400"> {item.time} </p>

          </div>
        </div>
      ))}
      </Link>
      <div className="mt-0">
          <button className="text-white bg-blue-500 rounded-md hover:drop-shadow-xl w-full p-3">See all notification </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Notification;
