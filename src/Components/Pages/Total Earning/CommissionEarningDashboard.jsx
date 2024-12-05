import React, { useState, useEffect } from 'react';

const CommissionEarningDashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [commissionData, setCommissionData] = useState([
    { id: 1, orderNumber: 'ord123', txnID: 'txn001', commission: '$50.00', location: 'New York', createdAt: '05-08-2024' },
    { id: 2, orderNumber: 'ord124', txnID: 'txn002', commission: '$60.00', location: 'Chicago', createdAt: '05-09-2024' },
    { id: 3, orderNumber: 'ord125', txnID: 'txn003', commission: '$75.00', location: 'San Francisco', createdAt: '06-01-2024' },
    { id: 4, orderNumber: 'ord126', txnID: 'txn004', commission: '$40.00', location: 'Los Angeles', createdAt: '06-15-2024' },
    { id: 5, orderNumber: 'ord127', txnID: 'txn005', commission: '$30.00', location: 'Miami', createdAt: '07-01-2024' },
    { id: 6, orderNumber: 'ord128', txnID: 'txn006', commission: '$120.00', location: 'Houston', createdAt: '07-10-2024' },
    { id: 7, orderNumber: 'ord129', txnID: 'txn007', commission: '$90.00', location: 'Dallas', createdAt: '08-02-2024' },
  ]);
  const [filteredCommissionData, setFilteredCommissionData] = useState(commissionData);
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the Check button click (filter data based on date range)
  const handleSearch = () => {
    if (startDate && endDate) {
      const filteredData = commissionData.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredCommissionData(filteredData);
    }
  };

  // Reset function to clear date filters and reset data
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredCommissionData(commissionData); // Reset to original data
    setCurrentPage(1); // Reset to page 1 when reset is clicked
  };

  // Calculate Total Commission
  const calculateTotalCommission = () => {
    return filteredCommissionData.reduce((total, item) => {
      return total + parseFloat(item.commission.replace('$', ''));
    }, 0).toFixed(2);
  };

  // Calculate Current Month Commission
  const calculateCurrentMonthCommission = () => {
    const currentMonth = new Date().getMonth();
    return filteredCommissionData
      .filter((item) => new Date(item.createdAt).getMonth() === currentMonth)
      .reduce((total, item) => total + parseFloat(item.commission.replace('$', '')), 0)
      .toFixed(2);
  };

  // Calculate Last 30 Days Commission
  const calculateLast30DaysCommission = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return filteredCommissionData
      .filter((item) => new Date(item.createdAt) >= thirtyDaysAgo)
      .reduce((total, item) => total + parseFloat(item.commission.replace('$', '')), 0)
      .toFixed(2);
  };

  // Paginate the filtered commission data
  const totalPages = Math.ceil(filteredCommissionData.length / itemsPerPage);
  const paginatedData = filteredCommissionData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Commission Earning Dashboard</h4>

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
          Total Commission: <span className="font-semibold text-green-600">${calculateTotalCommission()}</span>
        </h5>
        <h5 className="text-lg font-medium">
          Current Month Commission: <span className="font-semibold text-blue-600">${calculateCurrentMonthCommission()}</span>
        </h5>
        <h5 className="text-lg font-medium">
          Last 30 Days Commission: <span className="font-semibold text-teal-600">${calculateLast30DaysCommission()}</span>
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
              <th className="border px-4 py-2">Commission</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((commission) => (
              <tr key={commission.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{commission.id}</td>
                <td className="border px-4 py-2">{commission.orderNumber}</td>
                <td className="border px-4 py-2">{commission.txnID}</td>
                <td className="border px-4 py-2">{commission.commission}</td>
                <td className="border px-4 py-2">{commission.location}</td>
                <td className="border px-4 py-2">{commission.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCommissionData.length)} of ${filteredCommissionData.length} entries`}</span>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn px-4 py-1 rounded border focus:outline-none disabled:opacity-50"
          >
            Previous
          </button>
          {/* Page Number Indicators */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn ml-2 px-4 py-1 rounded border focus:outline-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommissionEarningDashboard;
