import React from "react";
import { Menu } from "./Navbar";

const Responsive = ({ showMenu, setShowMenu }) => {
  
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-14 z-20 flex h-[14rem] w-[100%] flex-col lg:hidden justify-between dark:bg-gray-900 bg-white dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden shadow-md`}
    >
      <div className="card">
        <nav className="mt-12">
          <ul className="space-y-2 text-xl -mt-24">
            {Menu.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  onClick={() => setShowMenu(false)}
                  className="mb-5 inline-block font-medium dark:hover:text-primary/40 hover:text-primary"
                >
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

export default Responsive;
