import React, { useState, useEffect } from 'react';

const WithdrawEarnings = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [earningsData, setEarningsData] = useState([
    { id: 1, orderNumber: 'p9xr1717219468', txnID: 'txn12345', amount: '$56.35', location: 'Dhaka', createdAt: '04-06-2024' },
    { id: 2, orderNumber: 'RujX1717233941', txnID: 'txn12346', amount: '$45.10', location: 'Dhaka', createdAt: '11-08-2024' },
    { id: 3, orderNumber: 'RD0a1717300348', txnID: 'txn12347', amount: '$23.75', location: 'Comilla', createdAt: '20-08-2024' },
    { id: 4, orderNumber: 'LmnX1717367481', txnID: 'txn12348', amount: '$34.20', location: 'Chittagong', createdAt: '03-09-2024' },
  ]);
  const [filteredEarningsData, setFilteredEarningsData] = useState(earningsData);
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the Check button click (filter data based on date range)
  const handleSearch = () => {
    if (startDate && endDate) {
      const filteredData = earningsData.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredEarningsData(filteredData);
    }
  };

  // Reset function to clear date filters and reset data
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredEarningsData(earningsData); // Reset to original data
    setCurrentPage(1); // Reset to page 1 when reset is clicked
  };

  // Calculate Total Earnings
  const calculateTotalEarnings = () => {
    return filteredEarningsData.reduce((total, item) => {
      return total + parseFloat(item.amount.replace('$', ''));
    }, 0).toFixed(2);
  };

  // Paginate the filtered earnings data
  const totalPages = Math.ceil(filteredEarningsData.length / itemsPerPage);
  const paginatedData = filteredEarningsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Withdraw Earnings</h4>

      {/* Date Range Inputs */}
      <div className="mb-4 flex justify-between space-x-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Search and Reset Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Check
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500 transition duration-300"
        >
          Reset
        </button>
      </div>

      {/* Earnings Display */}
      <div className="mb-6 text-center">
        <h5 className="text-lg font-medium">
          Total Earnings: <span className="font-semibold text-green-600">${calculateTotalEarnings()}</span>
        </h5>
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse table-auto border border-gray-200">
          <thead className="bg-teal-400 text-white">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Order Number</th>
              <th className="border px-4 py-2">Txn ID</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((earning) => (
              <tr key={earning.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{earning.id}</td>
                <td className="border px-4 py-2">{earning.orderNumber}</td>
                <td className="border px-4 py-2">{earning.txnID}</td>
                <td className="border px-4 py-2">{earning.amount}</td>
                <td className="border px-4 py-2">{earning.location}</td>
                <td className="border px-4 py-2">{earning.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredEarningsData.length)} of ${filteredEarningsData.length} entries`}</span>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn px-4 py-1  rounded border focus:outline-none disabled:opacity-50"
          >
            Previous
          </button>
          {/* Page Number Indicators */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} border rounded hover:bg-gray-200 focus:outline-none`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn ml-2 px-4 py-1  rounded hover:bg-gray-200 border focus:outline-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawEarnings;
