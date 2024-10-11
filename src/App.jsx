import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from './Components/Pages/Dashboard';
import Sidebar from "./Components/Pages/Sidebar";
import Navbar from "./Components/Pages/Navbar";
import AddNewProduct from './Components/Pages/Dashboard';
import  Breadcrumb from './Components/Pages/Breadcrumb'
import MainCategories from './Components/Pages/MainCategories';
const App = () => {
  return (
    <Router className="bg-black">
      <div className="flex h-full w-full border border-gray-100">
      <div className=" w-60">
      <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <div className="h-12">
            <Navbar />
          </div>
          <div className='mt-10 ml-5'> <Breadcrumb/></div>
            <div className="flex-1  bg-white">
            <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/products/types" element={<AddNewProduct />} />
            <Route path="/admin/category" element={<MainCategories />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App