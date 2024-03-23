import React from "react";
import { Outlet } from "react-router-dom";
import SellerSidebar from "../systemSellers/components/sidebar/Seller_sidebar";
import Dash_footer from "../shared/dash_footer/Dash_footer";
const SellersLay = () => {
  return (
    <div>
      <SellerSidebar />
      <Outlet />
      <Dash_footer />
    </div>
  );
};

export default SellersLay;
