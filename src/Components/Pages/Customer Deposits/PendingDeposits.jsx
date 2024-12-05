import React, { useEffect, useState } from 'react';

const PendingDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Use hardcoded demo data for Pending Deposits
    const demoData = [
      {
        customerName: 'User',
        amount: '100$',
        paymentMethod: 'Paypal',
        transactionId: 'TXN12345',
        status: 'Pending',
      },
      {
        customerName: 'User',
        amount: '50$',
        paymentMethod: 'Razorpay',
        transactionId: 'TXN67890',
        status: 'Pending',
      },
      {
        customerName: 'User',
        amount: '25$',
        paymentMethod: 'Stripe',
        transactionId: 'TXN11223',
        status: 'Pending',
      },
    ];
    setDeposits(demoData);
    setFilteredDeposits(demoData);
  }, []);

  useEffect(() => {
    // Filter deposits based on search term
    const results = deposits.filter((deposit) =>
      deposit.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDeposits(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, deposits]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
  const currentDeposits = filteredDeposits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Pending Deposits</h4>

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
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Payment Method</th>
              <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentDeposits.length === 0 ? (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentDeposits.map((deposit, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{deposit.customerName}</td>
                  <td className="border border-gray-300 px-4 py-2">{deposit.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{deposit.paymentMethod}</td>
                  <td className="border border-gray-300 px-4 py-2">{deposit.transactionId}</td>
                  <td className="border border-gray-300 px-4 py-2">{deposit.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredDeposits.length)} of ${filteredDeposits.length} entries`}</span>
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

export default PendingDeposits;
