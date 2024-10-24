import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from './Components/Pages/Dashboard';
import Sidebar from "./Components/Pages/Sidebar";
import Navbar from "./Components/Pages/Navbar";
import AddNewProduct from './Components/Pages/AddNewProduct';
import Breadcrumb from './Components/Pages/Breadcrumb';
import MainCategories from './Components/Pages/MainCategories';
import SubCategories from './Components/Pages/SubCategories';
import ChildCategories from './Components/Pages/ChildCategories';
import Categories from './Components/Pages/Categories';
import Posts from './Components/Pages/Posts';
import ManageStaffs from './Components/Pages/ManageStaffs'
import PhysicalCreateProduct from './Components/Pages/Products/PhysicalCreateProduct';
import DigitalProductCreate from './Components/Pages/Products/DigitalProductCreate';
import LicenseProductCreate from './Components/Pages/Products/LicenseProductCreate';
import ListingProductCreate from './Components/Pages/Products/ListingProductCreate';
import ProductList from './Components/Pages/Products/ProductList';
import DeactivatedProducts from './Components/Pages/Products/DeactivatedProducts';
import SetCoupans from './Components/Pages/SetCoupans';
import SocialLinks from './Components/Pages/Social Settings/SocialLinks';
const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router className="bg-black">
      <div className={`flex h-full w-full border border-gray-100 ${isSidebarCollapsed ? 'pl-16' : 'pl-60'}`}>
        <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1">
          <div className="h-12">
            <Navbar />
          </div>
          <div className='mt-10  ml-5'><Breadcrumb /></div>
          <div className="flex-1 ">
            <Routes >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/products/types" element={<AddNewProduct />} />
              <Route path="/admin/category" element={<MainCategories />} />
              <Route path="/admin/subcategory" element={<SubCategories />} />
              <Route path="/admin/childcategory" element={<ChildCategories />} />
              <Route path="/admin/products/types" element={<AddNewProduct />} />
              <Route path="/admin/blog/categories" element={<Categories />} />
              <Route path="/admin/blog/posts" element={<Posts />} />
              <Route path="/admin/blog/manage-staffs" element={<ManageStaffs />} />
              <Route path="/admin/products/physical/create" element={<PhysicalCreateProduct />} />
              <Route path="/admin/products/digital/create" element={<DigitalProductCreate />} />
              <Route path="/admin/products/license/create" element={<LicenseProductCreate />} />
              <Route path="/admin/products/listing/create" element={<ListingProductCreate />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/deactive" element={<DeactivatedProducts />} />
              <Route path="/admin/coupon" element={<SetCoupans />} />
              <Route path="/admin/social-link" element={<SocialLinks />} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
