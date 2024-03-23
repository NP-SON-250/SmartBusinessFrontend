import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Defaults/components/Navbar/Navbar";
import Footer from "../Defaults/components/landing_footer/Footer";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
