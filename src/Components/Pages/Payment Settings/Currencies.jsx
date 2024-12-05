import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCurrency, setNewCurrency] = useState({ name: '', sign: '', value: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCurrency, setEditCurrency] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/currencies');
        setCurrencies(response.data);
        setFilteredCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const results = currencies.filter((currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCurrencies(results);
    setCurrentPage(1);
  }, [searchTerm, currencies]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCurrency({ ...newCurrency, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ecommerce-panel-backend.onrender.com/api/currencies', newCurrency);
      setCurrencies([...currencies, newCurrency]);
      setNewCurrency({ name: '', sign: '', value: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating currency:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/currencies/${id}`);
      setCurrencies(currencies.filter((currency) => currency._id !== id));
      setFilteredCurrencies(filteredCurrencies.filter((currency) => currency._id !== id));
    } catch (error) {
      console.error('Error deleting currency:', error);
    }
  };

  const openEditModal = (currency) => {
    setEditCurrency(currency);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCurrency({ ...editCurrency, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ecommerce-panel-backend.onrender.com/api/currencies/${editCurrency._id}`, editCurrency);
      setCurrencies(currencies.map((currency) =>
        currency._id === editCurrency._id ? editCurrency : currency
      ));
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error updating currency:', error);
    }
  };

  const totalPages = Math.ceil(filteredCurrencies.length / itemsPerPage);
  const currentCurrencies = filteredCurrencies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Currencies</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
          >
            + Add New Currency
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Sign</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentCurrencies.map((currency) => (
              <tr key={currency._id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{currency.name}</td>
                <td className="border border-gray-300 px-4 py-2">{currency.sign}</td>
                <td className="border border-gray-300 px-4 py-2">{currency.value}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(currency)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(currency._id)}
                    className="flex items-center rounded-2xl text-white bg-red-900 hover:bg-red-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCurrencies.length)} of ${filteredCurrencies.length} entries`}</span>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1 rounded border focus:outline-none"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Add New Currency</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newCurrency.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter currency name"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="sign">Sign *</label>
                  <input
                    type="text"
                    name="sign"
                    id="sign"
                    value={newCurrency.sign}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter currency sign"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="value">Value *</label>
                  <input
                    type="number"
                    name="value"
                    id="value"
                    value={newCurrency.value}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter currency value"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-secondary rounded-2xl px-4 py-1 mr-2 border bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-2xl px-4 py-1 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditOpen && editCurrency && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit Currency</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editCurrency.name}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter currency name"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="sign">Sign *</label>
                  <input
                    type="text"
                    name="sign"
                    id="sign"
                    value={editCurrency.sign}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter currency sign"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="value">Value *</label>
                  <input
                    type="number"
                    name="value"
                    id="value"
                    value={editCurrency.value}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter currency value"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="btn btn-secondary rounded-2xl px-4 py-1 mr-2 border bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-2xl px-4 py-1 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Update
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

export default Currencies;
