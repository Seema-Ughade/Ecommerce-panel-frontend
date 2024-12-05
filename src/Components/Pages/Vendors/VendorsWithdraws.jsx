

import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const VendorsWithdraws = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data for vendor withdraws
  const withdraws = [
    {
      email: 'vendor@gmail.com',
      phone: '3453453345453411',
      amount: '37.50$',
      method: 'Paypal',
      withdrawDate: '2024-08-25T04:00:15.000000Z',
      status: 'Pending',
    },
    {
      email: 'vendor@gmail.com',
      phone: '3453453345453411',
      amount: '9$',
      method: 'Paypal',
      withdrawDate: '2024-08-25T03:59:56.000000Z',
      status: 'Pending',
    },
    {
      email: 'vendor@gmail.com',
      phone: '3453453345453411',
      amount: '9$',
      method: 'Paypal',
      withdrawDate: '2024-08-25T03:59:41.000000Z',
      status: 'Pending',
    },
    {
      email: 'vendor@gmail.com',
      phone: '3453453345453411',
      amount: '9$',
      method: 'Paypal',
      withdrawDate: '2024-08-25T03:58:30.000000Z',
      status: 'Pending',
    },
  ];

  // Filter withdraws based on search term
  const filteredWithdraws = withdraws.filter(
    (withdraw) =>
      withdraw.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdraw.phone.includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredWithdraws.length / itemsPerPage);
  const currentWithdraws = filteredWithdraws.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAccept = (id) => {
    console.log(`Accepting withdrawal with id: ${id}`);
    // Add your accept functionality here
  };

  const handleReject = (id) => {
    console.log(`Rejecting withdrawal with id: ${id}`);
    // Add your reject functionality here
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Vendor Withdraws</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Method</th>
              <th className="border border-gray-300 px-4 py-2">Withdraw Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentWithdraws.map((withdraw, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{withdraw.email}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.method}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.withdrawDate}</td>
                <td className="border border-gray-300 px-4 py-2">{withdraw.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => console.log('View Details')}
                    className="text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 rounded-2xl mr-2"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleAccept(withdraw._id)} // Use withdraw._id for accepting
                    className="text-white bg-green-900 hover:bg-green-700 px-3 py-1 rounded-2xl mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(withdraw._id)} // Use withdraw._id for rejecting
                    className="text-white bg-red-900 hover:bg-red-700 px-3 py-1 rounded-2xl"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(
              currentPage * itemsPerPage,
              filteredWithdraws.length
            )} of ${filteredWithdraws.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                className={`btn ml-2 px-4 py-1 ${
                  currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'
                } rounded border hover:bg-gray-200 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default VendorsWithdraws;
