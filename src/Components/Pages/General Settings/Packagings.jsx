import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Packagings = () => {
  const [packagings, setPackagings] = useState([]);
  const [filteredPackagings, setFilteredPackagings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newPackaging, setNewPackaging] = useState({ id: '', title: '', subtitle: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPackagings = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/packagings'); // Replace with your API endpoint
        setPackagings(response.data);
        setFilteredPackagings(response.data);
      } catch (error) {
        console.error('Error fetching packagings:', error);
      }
    };

    fetchPackagings();
  }, []);

  useEffect(() => {
    const results = packagings.filter((packaging) =>
      packaging.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      packaging.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackagings(results);
    setCurrentPage(1);
  }, [searchTerm, packagings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackaging({ ...newPackaging, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPackaging.id) {
        // Update existing packaging
        const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/packagings/${newPackaging.id}`, newPackaging);
        setPackagings(packagings.map(packaging => (packaging._id === newPackaging.id ? response.data : packaging)));
      } else {
        // Create new packaging
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/packagings', newPackaging); // Replace with your API endpoint
        setPackagings([...packagings, response.data]);
      }
      setNewPackaging({ id: '', title: '', subtitle: '', price: '' }); // Reset the form
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving packaging:', error);
    }
  };

  const totalPages = Math.ceil(filteredPackagings.length / itemsPerPage);
  const currentPackagings = filteredPackagings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (packaging) => {
    setNewPackaging({ id: packaging._id, title: packaging.title, subtitle: packaging.subtitle, price: packaging.price });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/packagings/${id}`); // Replace with your actual API endpoint
      setPackagings(packagings.filter(packaging => packaging._id !== id));
      setFilteredPackagings(filteredPackagings.filter(packaging => packaging._id !== id));
    } catch (error) {
      console.error('Error deleting packaging:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Packagings</h4>

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
              setNewPackaging({ id: '', title: '', subtitle: '', price: '' });
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
              <th className="border border-gray-300 px-4 py-2">Subtitle</th>
              <th className="border border-gray-300 px-4 py-2">Price (USD)</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentPackagings.map((packaging) => (
              <tr key={packaging._id} className="hover:bg-gray-100">
                <td className="border text-center border-gray-300 px-4 py-2">{packaging.title}</td>
                <td className="border text-center border-gray-300 px-4 py-2">{packaging.subtitle}</td>
                <td className="border text-center border-gray-300 px-4 py-2">{packaging.price}$</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(packaging)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(packaging._id)}
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredPackagings.length)} of ${filteredPackagings.length} entries`}</span>
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
              <h2 className="text-xl font-bold mb-4">{newPackaging.id ? 'Edit Packaging' : 'Add New Packaging'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="title">Title *</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={newPackaging.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter packaging title"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="subtitle">Subtitle *</label>
                  <input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    value={newPackaging.subtitle}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter packaging subtitle"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="price">Price (USD) *</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={newPackaging.price}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter packaging price"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn px-4 py-1 rounded border focus:outline-none">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-900 text-white px-4 py-1 rounded focus:outline-none">
                    Save
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

export default Packagings;
