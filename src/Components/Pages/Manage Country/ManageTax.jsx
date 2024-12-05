import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const ManageTax = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCountry, setNewCountry] = useState({ countryName: '', tax: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCountry, setEditCountry] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/countries');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(results);
    setCurrentPage(1);
  }, [searchTerm, countries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCountry({ ...newCountry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/countries', newCountry);
      setCountries([...countries, response.data]);
      setNewCountry({ countryName: '', tax: '' });
      setIsOpen(false);
      toast.success('Country added successfully!');
    } catch (error) {
      console.error('Error creating country:', error);
      toast.error('Error adding country. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/countries/${id}`);
      setCountries(countries.filter((country) => country._id !== id));
      setFilteredCountries(filteredCountries.filter((country) => country._id !== id));
      toast.success('Country deleted successfully!');
    } catch (error) {
      console.error('Error deleting country:', error);
      toast.error('Error deleting country. Please try again.');
    }
  };

  const openEditModal = (country) => {
    setEditCountry(country);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCountry({ ...editCountry, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/countries/${editCountry._id}`, editCountry);
      setCountries(countries.map((country) =>
        country._id === editCountry._id ? response.data : country
      ));
      setIsEditOpen(false);
      toast.success('Country updated successfully!');
    } catch (error) {
      console.error('Error updating country:', error);
      toast.error('Error updating country. Please try again.');
    }
  };

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const currentCountries = filteredCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Manage Countries</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Country Name</th>
              <th className="border border-gray-300 px-4 py-2">Tax</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((country) => (
              <tr key={country._id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{country.countryName}</td>
                <td className="border border-gray-300 px-4 py-2">{country.tax}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(country)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(country._id)}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCountries.length)} of ${filteredCountries.length} entries`}</span>
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
      </div>
    </div>
  );
};

export default ManageTax;
