import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EnvironmentOutlined } from "@ant-design/icons";

const States = () => {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newState, setNewState] = useState({ country: '', state: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editState, setEditState] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/states');
        setStates(response.data);
        setFilteredStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const results = states.filter((state) =>
      state.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStates(results);
    setCurrentPage(1);
  }, [searchTerm, states]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewState({ ...newState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/states', newState);
      setStates([...states, response.data]);
      setNewState({ country: '', state: '' });
      setIsOpen(false);
      toast.success('State added successfully!');
    } catch (error) {
      console.error('Error creating state:', error);
      toast.error('Error adding state. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/states/${id}`);
      setStates(states.filter((state) => state._id !== id));
      setFilteredStates(filteredStates.filter((state) => state._id !== id));
      toast.success('State deleted successfully!');
    } catch (error) {
      console.error('Error deleting state:', error);
      toast.error('Error deleting state. Please try again.');
    }
  };

  const openEditModal = (state) => {
    setEditState(state);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditState({ ...editState, [name]: value });
  };

  const handleCitiesClick = () => {
    navigate('/admin/cities');
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/states/${editState._id}`, editState);
      setStates(states.map((state) =>
        state._id === editState._id ? response.data : state
      ));
      setIsEditOpen(false);
      toast.success('State updated successfully!');
    } catch (error) {
      console.error('Error updating state:', error);
      toast.error('Error updating state. Please try again.');
    }
  };

  const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
  const currentStates = filteredStates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);


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
        <h4 className="heading text-2xl font-semibold mb-4">Manage State</h4>

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
            + Add New State
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Country</th>
              <th className="border border-gray-300 px-4 py-2">State</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Tax</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentStates.map((state) => (
              <tr key={state._id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{state.country}</td>
                <td className="border border-gray-300 px-4 py-2">{state.state}</td>
                <td className="py-2 px-4 border">
  <select
    value={state.status}
    onChange={(e) => handleStateStatusChange(state._id, e.target.value)}
    className="border text-white rounded px-2 py-1"
    style={{
      backgroundColor: state.status === "active" ? "#1e7e34" : "#bd2130",
      color: "white",
    }}
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
</td>

                <td className="border border-gray-300 px-4 py-2">{state.tax}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                <button
        onClick={handleCitiesClick}
        className="flex items-center rounded-2xl text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
        >
        <EnvironmentOutlined className="w-5 h-5 mr-1" />
        Manage City
      </button>
                  <button
                    onClick={() => openEditModal(state)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(state._id)}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredStates.length)} of ${filteredStates.length} entries`}</span>
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
              <h2 className="text-xl font-bold mb-4">Add New State</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="country">Country *</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={newState.country}
                    onChange={handleInputChange}
                    required
                    placeholder="In Any Language"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="state">State *</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={newState.state}
                    onChange={handleInputChange}
                    required
                    placeholder="In Any Language"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-500 text-white px-4 py-1 rounded border border-gray-500 focus:outline-none hover:bg-gray-600"
                    >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1 rounded border border-blue-500 focus:outline-none hover:bg-blue-600"
                    >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit State</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="country">Country *</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={editState.country}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="state">State *</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={editState.state}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="btn btn-secondary px-4 py-1 rounded border focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-1 rounded border focus:outline-none"
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

export default States;
