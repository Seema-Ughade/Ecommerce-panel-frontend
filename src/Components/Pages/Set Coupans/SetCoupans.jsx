import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const SetCoupons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    productType: '',
    type: '',
    quantity: '',
    startDate: '',
    endDate: '',
  });
  const [coupons, setCoupons] = useState([]); // Assume this comes from an API
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add coupon to the coupons state
    setCoupons((prev) => [...prev, { ...newCoupon, _id: Date.now() }]); // Mocked coupon ID
    setNewCoupon({
      code: '',
      productType: '',
      type: '',
      quantity: '',
      startDate: '',
      endDate: '',
    });
    setIsOpen(false);
  };

  const handleEdit = (coupon) => {
    // Logic for editing the coupon
  };

  const handleDelete = (id) => {
    setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
  };

  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const currentCoupons = coupons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <div className="content-area px-6">
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
                <td className="border border-gray-300 px-4 py-2">{coupon.amount}</td>
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                  </select>
                </div>
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
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="quantity">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={newCoupon.quantity}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter quantity (or 'Unlimited')"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
