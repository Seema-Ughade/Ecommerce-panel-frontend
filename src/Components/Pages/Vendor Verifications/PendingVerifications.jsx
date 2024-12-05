import React, { useState } from 'react';

const PendingVerifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [pendingVerifications] = useState([
    {
      vendorName: 'User',
      vendorEmail: 'vendor@gmail.com',
      description: 'Verification in progress.',
      status: 'Pending',
    },
    {
      vendorName: 'Sopoline Winters',
      vendorEmail: 'sopoline@gmail.com',
      description: 'Waiting for confirmation.',
      status: 'Pending',
    },
    {
      vendorName: 'Vendor XYZ',
      vendorEmail: 'vendorxyz@gmail.com',
      description: 'Verification required for account.',
      status: 'Pending',
    },
    {
      vendorName: 'Test Vendor',
      vendorEmail: 'testvendor@gmail.com',
      description: 'Documents are being reviewed.',
      status: 'Pending',
    },
    // Add more demo data as needed
  ]);

  const filteredVerifications = pendingVerifications.filter(
    (verification) =>
      verification.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);

  const currentItems = filteredVerifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Pending Vendor Verifications</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Vendor Name or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {currentItems.length === 0 ? (
          <p className="text-center text-gray-500">No data available in table</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-teal-400 text-white font-mono">
                <th className="border border-gray-300 px-4 py-2">Vendor Name</th>
                <th className="border border-gray-300 px-4 py-2">Vendor Email</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((verification, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{verification.vendorName}</td>
                  <td className="border border-gray-300 px-4 py-2">{verification.vendorEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">{verification.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{verification.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 rounded-2xl">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

<div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredVerifications.length)} of ${filteredVerifications.length} entries`}</span>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn px-4 py-1  rounded border  focus:outline-none "
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
            // className="btn ml-2 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none disabled:opacity-50"
            className="btn  ml-2 px-4 py-1  rounded border  focus:outline-none "

          >
            Next
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PendingVerifications;
