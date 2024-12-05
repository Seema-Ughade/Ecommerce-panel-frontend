import React, { useState } from 'react';

const SubscriptionEarnings = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subscriptionData, setSubscriptionData] = useState([
    { id: 1, orderNumber: '242099342', txnID: '', tax: '$0', taxLocation: '', createdAt: '09-10-2019' },
    { id: 2, orderNumber: 'txn_1HlTPfJlIV5dN9n72gC9N5YJ', txnID: 'txn_1HlTPfJlIV5dN9n72gC9N5YJ', tax: '$0', taxLocation: '', createdAt: '08-11-2020' },
    { id: 3, orderNumber: '6KD881488A1277949', txnID: '', tax: '$0', taxLocation: '', createdAt: '08-11-2020' },
    { id: 4, orderNumber: '0R5121086C3908633', txnID: '', tax: '$0', taxLocation: '', createdAt: '08-11-2020' },
    { id: 5, orderNumber: '949523367', txnID: '', tax: '$0', taxLocation: '', createdAt: '08-11-2020' },
    { id: 6, orderNumber: '', txnID: '', tax: '$0', taxLocation: '', createdAt: '08-11-2020' },
    { id: 7, orderNumber: '', txnID: '', tax: '$0', taxLocation: '', createdAt: '10-11-2020' },
    { id: 8, orderNumber: '', txnID: '', tax: '$0', taxLocation: '', createdAt: '10-11-2020' },
    { id: 9, orderNumber: 'tr_GujuVzTkBB', txnID: '', tax: '$0', taxLocation: '', createdAt: '11-09-2021' },
    { id: 10, orderNumber: 'SSLCZ_TXN_61b9c1097bc27', txnID: '', tax: '$0', taxLocation: '', createdAt: '14-12-2021' },
  ]);
  const [filteredSubscriptionData, setFilteredSubscriptionData] = useState(subscriptionData);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the Search button click (filter data based on date range)
  const handleSearch = () => {
    if (startDate && endDate) {
      const filteredData = subscriptionData.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredSubscriptionData(filteredData);
    }
  };

  // Reset function to clear date filters and reset data
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredSubscriptionData(subscriptionData); // Reset to original data
    setCurrentPage(1); // Reset to page 1 when reset is clicked
  };

  // Calculate Total Subscription Earnings
  const calculateTotalEarnings = () => {
    return filteredSubscriptionData.reduce((total, item) => {
      return total + parseFloat(item.tax.replace('$', ''));
    }, 0).toFixed(2);
  };

  // Paginate the filtered subscription data
  const totalPages = Math.ceil(filteredSubscriptionData.length / itemsPerPage);
  const paginatedData = filteredSubscriptionData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Subscription Earnings Dashboard</h4>

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
          Total Subscription Earnings: <span className="font-semibold text-green-600">${calculateTotalEarnings()}</span>
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
              <th className="border px-4 py-2">Tax</th>
              <th className="border px-4 py-2">Tax Location</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{subscription.id}</td>
                <td className="border px-4 py-2">{subscription.orderNumber}</td>
                <td className="border px-4 py-2">{subscription.txnID}</td>
                <td className="border px-4 py-2">{subscription.tax}</td>
                <td className="border px-4 py-2">{subscription.taxLocation}</td>
                <td className="border px-4 py-2">{subscription.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredSubscriptionData.length)} of ${filteredSubscriptionData.length} entries`}</span>
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
              className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} border rounded hover:bg-gray-200 focus:outline-none`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn ml-2 px-4 py-1 rounded hover:bg-gray-200 border focus:outline-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionEarnings;
