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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
