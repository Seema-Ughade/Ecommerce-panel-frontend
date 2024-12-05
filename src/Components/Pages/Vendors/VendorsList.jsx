import React, { useState, useEffect } from 'react';

const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Use hardcoded demo data for Vendors
    const demoVendors = [
      { storeName: 'Jerald Spares', vendorEmail: 'jerald.spares.au@phinmaed.com', shopNumber: '', pendingCommission: '0$', status: 'Active' },
      { storeName: 'Silver Lights', vendorEmail: 'dev6.silverlights@gmail.com', shopNumber: '', pendingCommission: '0$', status: 'Active' },
      { storeName: 'O Alamin', vendorEmail: 'oalamin23@gmail.com', shopNumber: '', pendingCommission: '0$', status: 'Inactive' },
      { storeName: 'Akeem Frederick', vendorEmail: 'user@gmail.com', shopNumber: '489', pendingCommission: '0$', status: 'Active' },
      { storeName: 'Test Stores', vendorEmail: 'vendor@gmail.com', shopNumber: '43543534', pendingCommission: '0$', status: 'Active' },
    ];

    setVendors(demoVendors);
    setFilteredVendors(demoVendors);
  }, []);

  useEffect(() => {
    // Filter vendors based on search term
    const results = vendors.filter((vendor) =>
      vendor.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, vendors]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const currentVendors = filteredVendors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Vendors List</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Store Name</th>
              <th className="border border-gray-300 px-4 py-2">Vendor Email</th>
              <th className="border border-gray-300 px-4 py-2">Shop Number</th>
              <th className="border border-gray-300 px-4 py-2">Pending Commission</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentVendors.length === 0 ? (
              <tr>
                <td colSpan="6" className="border px-4 py-2 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentVendors.map((vendor, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{vendor.storeName}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.vendorEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.shopNumber || 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.pendingCommission}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="btn px-4 py-1 rounded border focus:outline-none">Actions</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredVendors.length)} of ${filteredVendors.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1 rounded border focus:outline-none"
            >
              Previous
            </button>
            {/* Page Number Indicators */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorsList;
