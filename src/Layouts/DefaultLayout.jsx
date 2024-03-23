import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Defaults/pages/businesses/sidebar/Default_Navbar";
import Dash_footer from "../shared/dash_footer/Dash_footer";
const DefaultLay = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
      <Dash_footer />
    </div>
  );
};

export default DefaultLay;
