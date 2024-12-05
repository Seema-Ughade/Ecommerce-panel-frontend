import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const Countries = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [states, setStates] = useState([]);  // State for storing states data
  const [isOpen, setIsOpen] = useState(false);
  const [newCountry, setNewCountry] = useState({ countryName: '', tax: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCountry, setEditCountry] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10;
  const [currentStates, setCurrentStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/states');
        setStates(response.data);
        setCurrentStates(response.data); // Assuming you have pagination or filtering logic
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);


  useEffect(() => {
    const fetchCountriesAndStates = async () => {
      try {
        const countryResponse = await axios.get('https://ecommerce-panel-backend.onrender.com/api/states');
        setCountries(countryResponse.data);
        setFilteredCountries(countryResponse.data);

        const stateResponse = await axios.get('https://ecommerce-panel-backend.onrender.com/api/states');
        setStates(stateResponse.data);  // Set the states data
      } catch (error) {
        console.error('Error fetching countries and states:', error);
      }
    };
    fetchCountriesAndStates();
  }, []);

  // useEffect(() => {
  //   const results = countries.filter((country) =>
  //     country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredCountries(results);
  //   setCurrentPage(1);
  // }, [searchTerm, countries]);

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

  const handleStatesClick = () => {
    navigate('/admin/states');
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

  const handleCountryStatusChange = async (countryId, newStatus) => {
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/countries/${countryId}/status`, { status: newStatus });
      console.log('Updated Country:', response.data);
  
      // Update countries in the state
      setCountries(prev =>
        prev.map(country => (country._id === countryId ? { ...country, status: newStatus } : country))
      );
      toast.success('Country status updated successfully!');
    } catch (error) {
      toast.error('Error updating country status. Please try again.');
    }
  };

  const handleStateStatusChange = async (stateId, newStatus) => {
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/states/${stateId}/status`, { status: newStatus });
      console.log('Updated State:', response.data);
  
      // Update states in the state
      setStates(prev =>
        prev.map(state => (state._id === stateId ? { ...state, status: newStatus } : state))
      );
      toast.success('State status updated successfully!');
    } catch (error) {
      toast.error('Error updating state status. Please try again.');
    }
  };
  






  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Manage Country
        </h4>

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
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
          {currentStates.map((state) => (
          <tr key={state._id} className="hover:bg-gray-100 text-center">
            <td className="border border-gray-300 px-4 py-2">
              {state.country}
            </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  {/* Render state for each country */}
                  {/* {states
                    .filter(state => state.countryId === country._id)
                    .map((state) => (
                      <div key={state._id}>{state.stateName}</div>
                    ))}
                </td> */} 
                <td className="py-2 px-4 border">
                  <select
                    value={state.status}
                    onChange={(e) => handleStateStatusChange(state._id, e.target.value)}
                    className="border  text-white rounded px-2 py-1"
                    style={{
                      backgroundColor: state.status === "active" ? "#1e7e34" : "#bd2130",
                      color: "white",
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                <button
        onClick={handleStatesClick}
        className="flex items-center rounded-2xl text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
      >
        <EnvironmentOutlined className="w-5 h-5 mr-1" />
        Manage State
      </button>

                  {/* <button
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
                  </button> */}
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
                className={`btn px-4 py-1 rounded border mx-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn px-4 py-1 rounded border focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
