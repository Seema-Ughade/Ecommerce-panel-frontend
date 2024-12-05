import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EditOutlined } from "@ant-design/icons";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch completed orders (static data for now)
    const fetchOrders = async () => {
      const dummyData = [
        { customerEmail: "user1@gmail.com", orderNumber: "ZW7o1725437595", totalQty: 1, totalCost: 181.82 },
        { customerEmail: "user@gmail.com", orderNumber: "ZWMY1724136674", totalQty: 2, totalCost: 147.97 },
        { customerEmail: "user@gmail.com", orderNumber: "EM2l1724131124", totalQty: 1, totalCost: 348.84 },
        { customerEmail: "vendor@gmail.com", orderNumber: "8Se01717319203", totalQty: 1, totalCost: 53.30 },
      ];
      setOrders(dummyData);
      setFilteredOrders(dummyData);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search term
    const results = orders.filter(
      (order) =>
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(results);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, orders]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container mx-auto">
      <div className="content-area">
        <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">
          Completed Orders
        </h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search completed orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white">
              <th className="border border-gray-300 px-4 py-2">Customer Email</th>
              <th className="border border-gray-300 px-4 py-2">Order Number</th>
              <th className="border border-gray-300 px-4 py-2">Total Qty</th>
              <th className="border border-gray-300 px-4 py-2">Total Cost</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentOrders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{order.customerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{order.orderNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{order.totalQty}</td>
                <td className="border border-gray-300 px-4 py-2">${order.totalCost.toFixed(2)}</td>
                <td className="py-2 flex justify-center px-4 border">
                  <div className="group inline-block">
                    {/* Actions Button */}
                    <button
                      className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                    >
                      Actions <i className="fas fa-chevron-down ml-2"></i>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute hidden group-hover:block bg-white border border-gray-300 rounded shadow-lg mt-2 w-48">
                      {/* View Details */}
                      <button
                        onClick={() => alert('View Details clicked')}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <i className="fas fa-eye"></i> View Details
                      </button>

                      {/* Send */}
                      <button
                        onClick={() => alert(`Send email to: ${order.customerEmail}`)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <i className="fas fa-envelope"></i> Send
                      </button>

                      {/* Track Order */}
                      <button
                        onClick={() => alert('Track Order clicked')}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <i className="fas fa-truck"></i> Track Order
                      </button>

                      {/* Delivery Status */}
                      <button
                        onClick={() => alert('Change delivery status clicked')}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <i className="fas fa-dollar-sign"></i> Delivery Status
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredOrders.length)} of ${filteredOrders.length} entries`}</span>
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

export default CompletedOrders;
