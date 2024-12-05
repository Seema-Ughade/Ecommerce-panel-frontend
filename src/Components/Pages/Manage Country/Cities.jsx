import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCity, setNewCity] = useState({ state: '', city: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCity, setEditCity] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/cities');
        setCities(response.data);
        setFilteredCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const results = cities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(results);
    setCurrentPage(1);
  }, [searchTerm, cities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCity({ ...newCity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/cities', newCity);
      setCities([...cities, response.data]);
      setNewCity({ state: '', city: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating city:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/cities/${id}`);
      setCities(cities.filter((city) => city._id !== id));
      setFilteredCities(filteredCities.filter((city) => city._id !== id));
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const openEditModal = (city) => {
    setEditCity(city);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCity({ ...editCity, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/cities/${editCity._id}`, editCity);
      setCities(cities.map((city) =>
        city._id === editCity._id ? response.data : city
      ));
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const currentCities = filteredCities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);


  const handleCityStatusChange = async (cityId, newStatus) => {
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/cities/${cityId}/status`, { status: newStatus });
      console.log('Updated City:', response.data); // Log the updated city
  
      // Update cities in the state
      setCities(prev =>
        prev.map(city => (city._id === cityId ? { ...city, status: newStatus } : city))
      );
      toast.success('City status updated successfully!');
    } catch (error) {
      toast.error('Error updating city status. Please try again.');
    }
  };
    

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Manage City</h4>

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
            + Add New City
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">State</th>
              <th className="border border-gray-300 px-4 py-2">City</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>

              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentCities.map((city) => (
              <tr key={city._id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{city.state}</td>
                <td className="border border-gray-300 px-4 py-2">{city.city}</td>
                <td className="py-2 px-4 border">
  <select
    value={city.status}
    onChange={(e) => handleCityStatusChange(city._id, e.target.value)}
    className="border text-white rounded px-2 py-1"
    style={{
      backgroundColor: city.status === "active" ? "#1e7e34" : "#bd2130",
      color: "white",
    }}
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</td>

                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(city)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(city._id)}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCities.length)} of ${filteredCities.length} entries`}</span>
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
              <h2 className="text-xl font-bold mb-4">Add New City</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="state">State *</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={newCity.state}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter State"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="city">City *</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={newCity.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter City"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn btn-secondary  px-4 py-1 mr-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary  px-4 py-1 bg-blue-900 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditOpen && editCity && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit City</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="state">State *</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={editCity.state}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="city">City *</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={editCity.city}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="btn btn-secondary rounded-2xl px-4 py-1 mr-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-2xl px-4 py-1 bg-blue-900 text-white hover:bg-blue-700 focus:outline-none"
                  >
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

export default Cities;
