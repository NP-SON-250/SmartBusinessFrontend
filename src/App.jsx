// App.jsx
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import DefaultLay from "./Layouts/DefaultLayout";
import Landing from "./Defaults/pages/contents/Landing";
import Popup from "./shared/popups/Popup";
import PassRecovery from "./Defaults/pages/contents/PassRecovery";
import Businessess from "./Defaults/pages/businesses/Businesses";
import Default_analytics from "./Defaults/pages/businesses/Default_analytics";
import Register from "./shared/register/Register";
import Login from "./shared/login/Login";

//Admins
import AdminsLay from "./Layouts/AdminLayout";
import AdminsDashboards from "./systemAdmins/pages/dashboard/AdminDashboard";
import Users from "./systemAdmins/pages/users/Users";
import Businesses from "./systemAdmins/pages/businesses/Businesses";
import Products from "./systemAdmins/pages/Products/Products";

//Sellers
import SellersLay from "./Layouts/SellerLayout";
import SaleDashboard from "./systemSellers/pages/dashboard/SellerDashboard";
import SellerTransaction from "./systemSellers/pages/Transactions/SellerTransctions";
import SellerBusinesses from "./systemSellers/pages/businesses/SellerBusinesses";
import SellerProducts from "./systemSellers/pages/Products/SellerProducts";

//Suppliers
import SupplierLay from "./Layouts/SupplierLayout";
import SupplyDashboard from "./systemSuppliers/pages/dashboard/SupplierDashboard";
import SupplierTransaction from "./systemSuppliers/pages/Transactions/SupplierTransctions";
import SupplierBusinesses from "./systemSuppliers/pages/businesses/SupplierBusinesses";
import SupplierProducts from "./systemSuppliers/pages/Products/SupplierProducts";
const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-gray-200 text-gray-900 dark:text-white duration-200">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/password/recovery" element={<PassRecovery />} />
          <Route path="/businesses" element={<Businessess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Route>
        {/*Default Analytic Routes */}

        <Route element={<DefaultLay />}>
        <Route path="/analytics" element={<Default_analytics />} />
        </Route>

        {/*Addmin Routes */}

        <Route element={<AdminsLay />}>
        <Route path="dashboard/admins" element={<AdminsDashboards />} />
        <Route path="/manage/users" element={<Users />} />
        <Route path="/manage/businesses" element={<Businesses />} />
        <Route path="/manage/products" element={<Products />} />
        </Route>

        {/*Sellers Routes */}

        <Route element={<SellersLay />}>
        <Route path="sellers/dashboard" element={<SaleDashboard />} />
        <Route path="/seller/businesses" element={<SellerBusinesses />} />
        <Route path="/products" element={<SellerProducts />} />
        <Route path="/transactins" element={<SellerTransaction />} />
        </Route>

         {/*Suppliers Routes */}

         <Route element={<SupplierLay />}>
        <Route path="/suppliers/dashboard" element={<SupplyDashboard />} />
        <Route path="/businesses/supplier" element={<SupplierBusinesses />} />
        <Route path="/stock/supplier" element={<SupplierProducts />} />
        <Route path="/transactins/supplier" element={<SupplierTransaction />} />
        </Route>
      </Routes>
      <Popup />
    </div>
  );
};

export default App;
