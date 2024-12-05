import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch reviews (static data for now)
    const fetchReviews = async () => {
      const dummyData = [
        { product: "Product A", reviewer: "user1@gmail.com", review: "Great product!", _id: "1" },
        { product: "Product B", reviewer: "user@gmail.com", review: "Not bad", _id: "2" },
        { product: "Product C", reviewer: "user2@gmail.com", review: "Could be better", _id: "3" },
        { product: "Product D", reviewer: "vendor@gmail.com", review: "Excellent quality", _id: "4" },
      ];
      setReviews(dummyData);
      setFilteredReviews(dummyData);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    // Filter reviews based on search term
    const results = reviews.filter((review) =>
      review.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, reviews]);

  const handleDelete = async (id) => {
    try {
      // Delete review by id (simulating the delete for now)
      setReviews(reviews.filter((review) => review._id !== id));
      setFilteredReviews(filteredReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const currentReviews = filteredReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="content-area">
      <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">
            Product Reviews</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Reviewer</th>
              <th className="border border-gray-300 px-4 py-2">Review</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentReviews.map((review, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{review.product}</td>
                <td className="border border-gray-300 px-4 py-2">{review.reviewer}</td>
                <td className="border border-gray-300 px-4 py-2">{review.review}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => console.log('Edit review')}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredReviews.length)} of ${filteredReviews.length} entries`}</span>
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

export default ProductReviews;
