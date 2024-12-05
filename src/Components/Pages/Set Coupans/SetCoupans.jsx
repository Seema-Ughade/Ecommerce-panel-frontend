import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const SetCoupons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    productType: '',
    type: '',
    quantityType: 'unlimited', // New field to store quantity type (Limited/Unlimited)

    quantity: '',
    discountValue: '', // New field to hold the discount amount or percentage

    startDate: '',
    endDate: '',
  });
  const [coupons, setCoupons] = useState([]); // Assume this comes from an API
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        'https://ecommerce-panel-backend.onrender.com/api/categories'
      );
      setCategories(response.data);
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    if (newCoupon.productType === 'subcategories') {
      const fetchSubCategories = async () => {
        const response = await axios.get(
          'https://ecommerce-panel-backend.onrender.com/api/subcategories'
        );
        setSubCategories(response.data);
      };
      fetchSubCategories();
    } else if (newCoupon.productType === 'childcategories') {
      const fetchChildCategories = async () => {
        const response = await axios.get(
          'https://ecommerce-panel-backend.onrender.com/api/childcategories'
        );
        setChildCategories(response.data);
      };
      fetchChildCategories();
    }
  }, [newCoupon.productType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleQuantityTypeChange = (e) => {
    const value = e.target.value;
    setNewCoupon((prev) => ({
      ...prev,
      quantityType: value,
      quantity: value === 'unlimited' ? '' : prev.quantity, // Clear quantity if "Unlimited" is selected
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/coupons', newCoupon);
      setCoupons((prev) => [...prev, response.data]); // Add the new coupon from the response
      setNewCoupon({
        code: '',
        productType: '',
        type: '',
        quantity: '',
        discountValue: '',
        quantityType: 'unlimited',
        startDate: '',
        endDate: '',
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };
  const handleEdit = async (coupon) => {
    try {
      setNewCoupon(coupon); // Fill form with existing coupon data for editing
      setIsOpen(true); // Open form in edit mode
  
      // Once the form is submitted, save the changes
      const response = await axios.patch(
        `https://ecommerce-panel-backend.onrender.com/api/coupons/${coupon._id}`,
        newCoupon
      );
      setCoupons((prev) =>
        prev.map((item) => (item._id === coupon._id ? response.data : item))
      );
      setIsOpen(false);
      setNewCoupon({
        code: '',
        productType: '',
        type: '',
        quantity: '',
        discountValue: '',
        quantityType: 'unlimited',
        startDate: '',
        endDate: '',
      });
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/coupons/${id}`);
      setCoupons((prev) => prev.filter((coupon) => coupon._id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };
  
  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const currentCoupons = coupons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Coupons</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={() => setIsOpen(true)}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
            + Add New Coupon
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Code</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Used</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentCoupons.map((coupon, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{coupon.code}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.type}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.discountValue}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.used}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.status}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <PencilIcon className="h-5 w-5 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="flex items-center rounded-2xl text-white bg-red-900 hover:bg-red-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <TrashIcon className="h-5 w-5 mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, coupons.length)} of ${coupons.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1 rounded border focus:outline-none">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none">
              Next
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">

              <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="code">Code *</label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    value={newCoupon.code}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter coupon code"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
   {/* Product Type Selection */}
   <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="productType">Allow Product Type *</label>
                  <select
                    name="productType"
                    id="productType"
                    value={newCoupon.productType}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="categories">Categories</option>
                    <option value="subcategories">Subcategories</option>
                    <option value="childcategories">Child Categories</option>
                  </select>
                </div>

                {/* Conditional Field */}
                {newCoupon.productType === 'categories' && (
                  <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="category">Select Category</label>
                    <select
                      name="category"
                      id="category"
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {newCoupon.productType === 'subcategories' && (
                  <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="subCategory">Select Subcategory</label>
                    <select
                      name="subCategory"
                      id="subCategory"
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a subcategory</option>
                      {subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {newCoupon.productType === 'childcategories' && (
                  <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="childCategory">Select Child Category</label>
                    <select
                      name="childCategory"
                      id="childCategory"
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a child category</option>
                      {childCategories.map((childCategory) => (
                        <option key={childCategory._id} value={childCategory._id}>{childCategory.name}</option>
                      ))}
                    </select>
                  </div>
                )}              
        <div className="mb-4 col-lg-7">
                <label className="block text-gray-700" htmlFor="type">Type *</label>
                <select
                  id="type"
                  name="type"
                  value={newCoupon.type}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a type</option>
                  <option value="0">Discount By Percentage</option>
                  <option value="1">Discount By Amount</option>
                </select>
              </div>

              {/* Conditional rendering for discount input field */}
              {newCoupon.type && (
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="discountValue">
                    {newCoupon.type === "0" ? "Discount Percentage (%)" : "Discount Amount ($)"} *
                  </label>
                  <input
                    type="number"
                    name="discountValue"
                    id="discountValue"
                    value={newCoupon.discountValue}
                    onChange={handleInputChange}
                    required
                    placeholder={newCoupon.type === "0" ? "Enter discount percentage" : "Enter discount amount"}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}            
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="quantityType">Quantity Type *</label>
                <select
                  id="quantityType"
                  name="quantityType"
                  value={newCoupon.quantityType}
                  onChange={handleQuantityTypeChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="unlimited">Unlimited</option>
                  <option value="limited">Limited</option>
                </select>
              </div>

              {/* Conditional rendering for quantity input */}
              {newCoupon.quantityType === 'limited' && (
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="quantity">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={newCoupon.quantity}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter quantity"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="startDate">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={newCoupon.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="endDate">End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={newCoupon.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-1/3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetCoupons;
