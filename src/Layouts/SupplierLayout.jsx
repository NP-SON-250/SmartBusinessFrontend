import React from "react";
import { Outlet } from "react-router-dom";
import SupplierSidebar from "../systemSuppliers/components/sidebar/Supplier_sidebar";
import Dash_footer from "../shared/dash_footer/Dash_footer";
const SupplierLay = () => {
  return (
    <div>
      <SupplierSidebar />
      <Outlet />
      <Dash_footer />
    </div>
  );
};

export default SupplierLay;
