
import React, { useState } from "react";
import Logo from "../../../../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiNotification3Line } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';
import DarkMode from "../../../../shared/dark_mode/DarkMode";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import BResp from "./BResponsive";
import Notification from "../../../../shared/notifications/Notification";


export const SidebarMenu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Analysis",
    link: "#",
  },
  {
    id: 3,
    name: "Transactions",
    link: "/transactions",
  },
  {
    
    id: 5,
    name: "Stock",
    link: "/stock",
  },
  {title: 'Reports'},
  {
    link: "journal",
    name: 'Journal',
      
  },
  {
    link: "ledger",
    name: 'Ledger',
      
  },
  {
    link: "trialbalance",
    name: 'Trial Balance',
    
  },
  {
    link: "Icomestatement",
    name: 'Income Statement',
      
  },
  {
    link: "balancesheet",
    name: 'Balance Sheet',
      
  },
];


const Sidebar = () => {

  const notify=0;
  const cart=0;
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
// Notification

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    
    <div className="">
      <div className="grid grid-cols-2">
      {/* Top bar */}
    <div className=" dark:bg-gray-900 bg-yellow-800 md:w-full lg:w-[82%] w-screen h-14 border-3 lg:ml-[15.5rem]  fixed z-50 shadow-md">
        <div className="flex flex-row md:justify-end md:gap-10 justify-between">
          
        <div className="lg:hidden block mt-2 pl-16 md:pr-24">
            <a href="/" className="font-bold text-2xl sm:text-3xl flex ">
              <img src={Logo} alt="Logo" className="w-10" />S
              <span className="text-secondary">Business</span>
            </a>
          </div>
          
          <div className="flex">
          <div className="absolute md:right-[16rem] right-24 md:top-1">
          <button className="py-4 px-4 rounded-full flex items-center"
          onClick={toggleNotifications}
          >
            <RiNotification3Line className="text-xl cursor-pointer text-blue-400" />
            <div className="absolute right-2 top-2 flex justify-center items-center text-center w-5 h-5 " >{notify}</div>
             {showNotifications && <Notification />}
          </button>
        </div>
        <div className="absolute md:right-48 right-[3rem] md:top-1">
          <button className="py-4 px-4 rounded-full flex items-center gap-3">
            <FiShoppingCart className="text-xl cursor-pointer text-blue-400" />
            <div className="absolute right-1.5 top-2 flex justify-center items-center text-center w-5 h-5  " >{cart}</div>
          </button>
        </div>
          </div>
        <div className="mt-4 ">
          <DarkMode />
        </div>
          
            <div className="flex flex-col lg:block hidden lg:mr-10 mr-5 mt-2 text-white hover:text-primary">
              <Link to={"/edit/profile"}>
              <FaUserCircle size={40} />
              <div>
              </div>
                </Link>
            </div>
        </div>
    </div>
      <div className="lg:block hidden border-r-2 shadow-md dark:bg-gray-900 bg-yellow-800 dark:text-white duration-200 w-[20%] lg:w-[20%] md:w-[30%] h-screen z-50 fixed">
      <div className="pl-3">
            <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-0">
              <img src={Logo} alt="Logo" className="w-10" />S
              <span className="text-secondary">Business</span>
            </a>
          </div>
      <div className="flex flex-col p-5 ">
      <ul className="">
        
          {SidebarMenu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 py-4 hover:text-primary lg:text-sm md:text-2xl font-semibold duration-200 text-white"
              >
                <p className="text-gray-500 cursor-default">{data.title}</p>
                  {data.name}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </div>
    </div>
    {/* Mobile Hamburger icon */}
    <div className="lower flex bg-gray-900  duration-200 fixed z-50">
          <div className=" lg:hidden block absolute left-2 top-4">
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
        <BResp setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
  );
};
export default Sidebar;
