import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const ShippingMethods = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [filteredMethods, setFilteredMethods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newMethod, setNewMethod] = useState({ id: '', title: '', duration: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/shipping-methods'); // Replace with your API endpoint
        setShippingMethods(response.data);
        setFilteredMethods(response.data);
      } catch (error) {
        console.error('Error fetching shipping methods:', error);
      }
    };

    fetchShippingMethods();
  }, []);

  useEffect(() => {
    const results = shippingMethods.filter((method) =>
      method.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMethods(results);
    setCurrentPage(1);
  }, [searchTerm, shippingMethods]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethod({ ...newMethod, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newMethod.id) {
        // Update existing shipping method
        const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/shipping-methods/${newMethod.id}`, newMethod);
        setShippingMethods(shippingMethods.map(method => (method._id === newMethod.id ? response.data : method)));
      } else {
        // Create new shipping method
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/shipping-methods', newMethod); // Replace with your API endpoint
        setShippingMethods([...shippingMethods, response.data]);
      }
      setNewMethod({ id: '', title: '', duration: '', price: '' }); // Reset the form
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving shipping method:', error);
    }
  };

  const totalPages = Math.ceil(filteredMethods.length / itemsPerPage);
  const currentMethods = filteredMethods.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (method) => {
    setNewMethod({ id: method._id, title: method.title, duration: method.duration, price: method.price });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/shipping-methods/${id}`); // Replace with your actual API endpoint
      setShippingMethods(shippingMethods.filter(method => method._id !== id));
      setFilteredMethods(filteredMethods.filter(method => method._id !== id));
    } catch (error) {
      console.error('Error deleting shipping method:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Shipping Methods</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              setNewMethod({ id: '', title: '', duration: '', price: '' });
              setIsOpen(true);
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
            + Add New 
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentMethods.map((method) => (
              <tr key={method._id} className="hover:bg-gray-100">
                <td className="border text-center border-gray-300 px-4 py-2">{method.title}</td>
                <td className="border text-center border-gray-300 px-4 py-2">{method.duration}</td>
                <td className="border text-center border-gray-300 px-4 py-2">{method.price}$</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(method)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(method._id)}
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredMethods.length)} of ${filteredMethods.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1 rounded border focus:outline-none">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none">
              Next
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">{newMethod.id ? 'Edit Shipping Method' : 'Add New Shipping Method'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="title">Title *</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={newMethod.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter shipping method title"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="duration">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={newMethod.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter shipping method duration"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="price">Price *</label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={newMethod.price}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter shipping method price"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-1/3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700">
                    {newMethod.id ? 'Save Changes' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingMethods;
