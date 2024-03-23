import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import DarkMode from "../../../shared/dark_mode/DarkMode";
import Profile from "./Profile";
import Responsive from "./Responsive";
import { usePopup } from "../../../PopupContext";
import Notification from "../../../shared/notifications/Notification";

export const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Businesses",
    link: "/businesses",
  },
  {
    id: 3,
    name: "Contact us",
    link: "/contact",
  },
];

const Navbar = () => {
  const { handleOrderPopup } = usePopup();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 fixed w-full h-28 z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div className="md:-ml-10 lg:-ml-0 -ml-3">
            <a href="/" className="font-bold text-2xl sm:text-l flex gap-0">
              <img src={Logo} alt="Logo" className="w-10" />S
              <span className="text-secondary">Business</span>
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            {/* Darkmode Switch */}
            <div className="-mr-3">
              <DarkMode />
            </div>
            {/* Login button */}
        <Link to={"/register"}>
          <button className="md:hidden block bg-gradient-to-r from-primary to-secondary text-white  py-1 px-4 -mr-4 rounded-full flex items-center gap-3">
            Join Us
          </button>
        </Link>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-between">
        <ul className="sm:flex flex justify-between hidden items-start gap-0">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 py-4 hover:text-primary font-semibold duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
          
        </ul>
        {/* Mobile Hamburger icon */}
        <div className="lower flex bg-transparent h-16 md:w-12 lg-w-12 w-full duration-200">
          <div className="md:hidden lg:hidden block absolute left-5 top-4">
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
          <div className="absolute lg:right-10 md:right-2 right-10 top-4 flex">
            <div className="">
              <Profile />
            </div>
          </div>
        </div>
        <Responsive setShowMenu={setShowMenu} showMenu={showMenu} />
      </div>
    </div>
  );
};
export default Navbar;
