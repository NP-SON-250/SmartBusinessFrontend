import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../systemAdmins/components/sidebar/Sidebar";
import Dash_footer from "../shared/dash_footer/Dash_footer";
const AdminsLay = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
      <Dash_footer />
    </div>
  );
};

export default AdminsLay;
