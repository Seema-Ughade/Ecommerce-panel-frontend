import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const ProductDiscussionReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch product discussion reports (static data for now)
    const fetchReports = async () => {
      const dummyData = [
        {
          product: "All-Natural Organic Face Oil with Jojoba and Rosehip",
          reporter: "User",
          title: "asdfa",
          date: "3 months ago",
          _id: "1"
        },
        {
          product: "Herbal Tea Collection",
          reporter: "User2",
          title: "Good Product",
          date: "2 months ago",
          _id: "2"
        },
        {
          product: "Ginseng Root Supplement",
          reporter: "User3",
          title: "Highly recommend",
          date: "1 month ago",
          _id: "3"
        }
      ];
      setReports(dummyData);
      setFilteredReports(dummyData);
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Filter reports based on search term
    const results = reports.filter((report) =>
      report.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, reports]);

  const handleDelete = async (id) => {
    try {
      // Delete report by id (simulating the delete for now)
      setReports(reports.filter((report) => report._id !== id));
      setFilteredReports(filteredReports.filter((report) => report._id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
      <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">
          Product Discussion Reports</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Product, Reporter, or Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Reporter</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Date & Time</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentReports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{report.product}</td>
                <td className="border border-gray-300 px-4 py-2">{report.reporter}</td>
                <td className="border border-gray-300 px-4 py-2">{report.title}</td>
                <td className="border border-gray-300 px-4 py-2">{report.date}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => console.log('Edit report')}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="flex items-center rounded-2xl text-white bg-red-900 hover:bg-red-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredReports.length)} of ${filteredReports.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1 rounded border focus:outline-none">
              Previous
            </button>
            {/* Page Number Indicators */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDiscussionReports;
