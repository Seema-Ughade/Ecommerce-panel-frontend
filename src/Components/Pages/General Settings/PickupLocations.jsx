import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const PickupLocations = () => {
  const [pickupLocations, setPickupLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({ id: '', location: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPickupLocations = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/pickup-locations'); // Replace with your API endpoint
        setPickupLocations(response.data);
        setFilteredLocations(response.data);
      } catch (error) {
        console.error('Error fetching pickup locations:', error);
      }
    };

    fetchPickupLocations();
  }, []);

  useEffect(() => {
    const results = pickupLocations.filter((location) =>
      location.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(results);
    setCurrentPage(1);
  }, [searchTerm, pickupLocations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newLocation.id) {
        // Update existing pickup location
        const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/pickup-locations/${newLocation.id}`, newLocation);
        setPickupLocations(pickupLocations.map(location => (location._id === newLocation.id ? response.data : location)));
      } else {
        // Create new pickup location
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/pickup-locations', newLocation); // Replace with your API endpoint
        setPickupLocations([...pickupLocations, response.data]);
      }
      setNewLocation({ id: '', location: '' }); // Reset the form
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving pickup location:', error);
    }
  };

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const currentLocations = filteredLocations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (location) => {
    setNewLocation({ id: location._id, location: location.location });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/pickup-locations/${id}`); // Replace with your actual API endpoint
      setPickupLocations(pickupLocations.filter(location => location._id !== id));
      setFilteredLocations(filteredLocations.filter(location => location._id !== id));
    } catch (error) {
      console.error('Error deleting pickup location:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Pickup Locations</h4>

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
              setNewLocation({ id: '', location: '' });
              setIsOpen(true);
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
            + Add New
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.map((location) => (
              <tr key={location._id} className="hover:bg-gray-100">
                <td className="border text-center border-gray-300 px-4 py-2">{location.location}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(location)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(location._id)}
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredLocations.length)} of ${filteredLocations.length} entries`}</span>
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
              <h2 className="text-xl font-bold mb-4">{newLocation.id ? 'Edit Pickup Location' : 'Add New Pickup Location'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="location">Location *</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={newLocation.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter pickup location"
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
                    {newLocation.id ? 'Save Changes' : 'Create'}
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

export default PickupLocations;
