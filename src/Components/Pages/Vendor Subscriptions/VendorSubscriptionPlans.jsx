import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorSubscriptionPlans = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch subscription plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/subscription-plans');
        setSubscriptionPlans(response.data);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = subscriptionPlans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.productLimitations.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  const currentItems = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="content-area">
        <h4 className="heading text-2xl font-semibold mb-4">Vendor Subscription Plans</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Title or Product Limitations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add New</button>
        </div>

        {currentItems.length === 0 ? (
          <p className="text-center text-gray-500">No data available in table</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-teal-400 text-white font-mono">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Cost</th>
                <th className="border border-gray-300 px-4 py-2">Duration (Days)</th>
                <th className="border border-gray-300 px-4 py-2">Product Allowed</th>
                <th className="border border-gray-300 px-4 py-2">Options</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((plan) => (
                <tr key={plan._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{plan.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.cost}$</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.duration}</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.productLimitations}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-900 text-white hover:bg-blue-700 px-3 py-1 rounded-2xl">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredPlans.length)} of ${filteredPlans.length} entries`}</span>
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
    </div>
  );
};

export default VendorSubscriptionPlans;
