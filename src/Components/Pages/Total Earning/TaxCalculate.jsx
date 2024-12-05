import React, { useState, useEffect } from 'react';

const TaxCalculate = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taxData, setTaxData] = useState([
    { id: 1, orderNumber: 'p9xr1717219468', txnID: 'txn12345', tax: '$1.52', taxLocation: 'Dhaka', createdAt: '05-08-2024' },
    { id: 2, orderNumber: 'RujX1717233941', txnID: 'txn12346', tax: '$1.52', taxLocation: 'Dhaka', createdAt: '05-08-2024' },
    { id: 3, orderNumber: 'RD0a1717300348', txnID: 'txn12347', tax: '$0.75', taxLocation: 'Comilla', createdAt: '05-08-2024' },
    { id: 4, orderNumber: 'LmnX1717367481', txnID: 'txn12348', tax: '$2.30', taxLocation: 'Chittagong', createdAt: '06-08-2024' },
    { id: 5, orderNumber: 'XyZ1717374832', txnID: 'txn12349', tax: '$3.10', taxLocation: 'Khulna', createdAt: '07-08-2024' },
    { id: 6, orderNumber: 'ABpX1717456289', txnID: '', tax: '$1.90', taxLocation: 'Rajshahi', createdAt: '08-08-2024' },
    { id: 7, orderNumber: 'KjN1717492837', txnID: 'txn12350', tax: '$0.80', taxLocation: 'Sylhet', createdAt: '09-08-2024' },
  ]);
  const [filteredTaxData, setFilteredTaxData] = useState(taxData);
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the Check button click (filter data based on date range)
  const handleSearch = () => {
    if (startDate && endDate) {
      const filteredData = taxData.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredTaxData(filteredData);
    }
  };

  // Reset function to clear date filters and reset data
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setFilteredTaxData(taxData); // Reset to original data
    setCurrentPage(1); // Reset to page 1 when reset is clicked
  };

  // Calculate Total Earning
  const calculateTotalEarnings = () => {
    return filteredTaxData.reduce((total, item) => {
      return total + parseFloat(item.tax.replace('$', ''));
    }, 0).toFixed(2);
  };

  // Calculate Current Month Earnings
  const calculateCurrentMonthEarnings = () => {
    const currentMonth = new Date().getMonth();
    return filteredTaxData
      .filter((item) => new Date(item.createdAt).getMonth() === currentMonth)
      .reduce((total, item) => total + parseFloat(item.tax.replace('$', '')), 0)
      .toFixed(2);
  };

  // Calculate Last 30 Days Earnings
  const calculateLast30DaysEarnings = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return filteredTaxData
      .filter((item) => new Date(item.createdAt) >= thirtyDaysAgo)
      .reduce((total, item) => total + parseFloat(item.tax.replace('$', '')), 0)
      .toFixed(2);
  };

  // Paginate the filtered tax data
  const totalPages = Math.ceil(filteredTaxData.length / itemsPerPage);
  const paginatedData = filteredTaxData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h4 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Tax Calculate</h4>

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
          Total Earning: <span className="font-semibold text-green-600">${calculateTotalEarnings()}</span>
        </h5>
        <h5 className="text-lg font-medium">
          Current Month Earning: <span className="font-semibold text-blue-600">${calculateCurrentMonthEarnings()}</span>
        </h5>
        <h5 className="text-lg font-medium">
          Last 30 Days Earning: <span className="font-semibold text-teal-600">${calculateLast30DaysEarnings()}</span>
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
            {paginatedData.map((tax) => (
              <tr key={tax.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{tax.id}</td>
                <td className="border px-4 py-2">{tax.orderNumber}</td>
                <td className="border px-4 py-2">{tax.txnID}</td>
                <td className="border px-4 py-2">{tax.tax}</td>
                <td className="border px-4 py-2">{tax.taxLocation}</td>
                <td className="border px-4 py-2">{tax.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredTaxData.length)} of ${filteredTaxData.length} entries`}</span>
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

export default TaxCalculate;
