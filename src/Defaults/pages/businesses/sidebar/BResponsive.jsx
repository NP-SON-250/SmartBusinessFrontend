import React, { useState } from "react";
import { SidebarMenu } from "./Default_Navbar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const BResp = ({ showMenu, setShowMenu }) => {
  
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-14 z-20 flex h-[100vh] w-[100%] flex-col lg:hidden justify-between dark:bg-gray-900 bg-yellow-800 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 shadow-md`}
    >
      <div className="card">
        <nav className="mt-12">
          <ul className="space-y-2 text-xl -mt-24">
          <div className="flex flex-col gap-3 justify-center items-center pb-10 hover:text-primary">
              <Link to={"/edit/profile"}>
              <FaUserCircle size={40} />
              <div >
                <h1 className="-ml-7">Hello, Alexis</h1>
                <h1 className="text-sm text-slate-500">Admin</h1>
              </div>
                </Link>
            </div>
            {SidebarMenu.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  onClick={() => setShowMenu(false)}
                  className="mb-5 inline-block font-medium dark:hover:text-primary hover:text-primary"
                >
                  <p className="text-gray-500 cursor-default">{data.title}</p>
                  {data.name}
                </a>
              </li>
            ))}
      
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default BResp;