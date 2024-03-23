
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "../../../shared/dark_mode/DarkMode";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import SupplierResp from "./SupplierResp";


export const SupplierSidebarMenu = [
  {
    id: 1,
    name: "Dashboard",
    link: "/suppliers/dashboard",
  },
  {
    id: 2,
    name: "Businesses",
    link: "/businesses/supplier",
  },
  {
    id: 3,
    name: "Stock",
    link: "/stock/supplier",
  },
  {
    id: 4,
    name: "Purchase Orders",
    link: "/purchase/orders",
  },
  {
    id: 5,
    name: "Transactins",
    link: "/transactins/supplier",
  },
  {
    id: 6,
    name: "Sales",
    link: "/sales/supplier",
  },
  {
    id: 7,
    name: "Payments",
    link: "/payments/supplier",
  },
  {
    id: 8,
    name: "Signout",
    link: "/",
  },
];

const SupplierSidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    
    <div className="">
      <div className="grid grid-cols-2">
      {/* Top bar */}
    <div className=" dark:bg-gray-900 bg-white md:w-full lg:w-[82%] w-screen h-14 border-3 lg:ml-[15.5rem]  fixed z-50 shadow-md">
        <div className="flex flex-row md:justify-end md:gap-10 justify-between">
          {/* search bar */}
          <div className="flex justify-between items-center gap-4 absolute left-64 top-3">
            <div className="relative group md:block hidden lg:block">
              <input
                type="text"
                placeholder="Search here"
                className="items-center w-[300px] sm:w-[300px] group-hover:w-[310px] transition-all duration-300 rounded-full border border-gray-300 px-4 py-1 ml-5 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500  "
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            </div>
        <div className="md:hidden lg:hidden block mt-2 md:pl-0 pl-16">
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />S
              <span className="text-secondary">Business</span>
            </a>
          </div>
          
        <h2 className="text-2xl font-medium mt-4 cursor-pointer text-white hover:text-primary">
        <IoIosNotificationsOutline  size={0} className="-mr-5"/>
        </h2>
        <div className="mt-4 pr-5">
              <DarkMode />
            </div>
            <div className="flex flex-col gap-3 md:block lg:block hidden lg:mr-10 mr-5 mt-2 text-gray-900 hover:text-primary">
              <Link to={"/edit/profile"}>
              <FaUserCircle size={40} />
              <div>
              </div>
                </Link>
            </div>
        </div>
    </div>
      <div className="md:block lg:block hidden border-r-2 shadow-md dark:bg-gray-900 bg-white dark:text-white duration-200 w-[20%] lg:w-[20%] md:w-[30%] h-screen z-50 fixed">
      <div className="pl-3">
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />S
              <span className="text-secondary">Business</span>
            </a>
          </div>
      <div className="flex flex-col p-5 ">
      <ul className="">
        
          {SupplierSidebarMenu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 py-4 hover:text-primary dark:text-white lg:text-sm md:text-2xl font-semibold duration-200 text-gray-900"
              >
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
          <div className="md:hidden lg:hidden block absolute left-2 top-4">
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
        <SupplierResp setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
  );
};
export default SupplierSidebar;
