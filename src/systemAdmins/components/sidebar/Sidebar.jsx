
import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "../../../shared/dark_mode/DarkMode";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import AdminResp from "./AdminResp";


export const SidebarMenu = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard/admins",
  },
  {
    id: 2,
    name: "Users",
    link: "/manage/users",
  },
  {
    id: 3,
    name: "Businesses",
    link: "/manage/businesses",
  },
  {
    id: 4,
    name: "Products",
    link: "/manage/products",
  },
  {
    id: 5,
    name: "Sales",
    link: "/manage/sales",
  },
  {
    id: 6,
    name: "Payments",
    link: "/manage/payments",
  },
  {
    id: 7,
    name: "Signout",
    link: "/",
  },
];

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    
    <div className="">
      <div className="grid grid-cols-2">
      {/* Top bar */}
    <div className="dark:bg-gray-900 bg-white md:w-full lg:w-[82%] w-screen h-14 border-3 lg:ml-[15.5rem]  fixed z-50 shadow-md">
        <div className="flex flex-row md:justify-end md:gap-10 justify-between">
          {/* search bar */}
          <div className="flex justify-between items-center gap-4 absolute left-64 top-3">
            <div className="relative group md:hidden hidden lg:block">
              <input
                type="text"
                placeholder="Search here"
                className="items-center w-[300px] sm:w-[300px] group-hover:w-[310px] transition-all duration-300 rounded-full border border-gray-300 px-4 py-1 ml-5 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500  "
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            </div>
        <div className="lg:hidden block mt-2 pl-16 md:pr-24">
            <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-0">
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
            <div className="flex flex-col gap-3 lg:block hidden lg:mr-10 mr-5 mt-2 text-white hover:text-primary">
              <Link to={"/edit/profile"}>
              <FaUserCircle size={40} />
              <div>
              </div>
                </Link>
            </div>
        </div>
    </div>
      <div className="lg:block hidden border-r-2 shadow-md dark:bg-gray-900 bg-white dark:text-white duration-200 w-[20%] lg:w-[20%] md:w-[30%] h-screen z-50 fixed">
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
                className="inline-block px-4 py-4 hover:text-primary lg:text-sm md:text-2xl font-semibold duration-200 tex-gray-900"
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
        <AdminResp setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
  );
};
export default Sidebar;
