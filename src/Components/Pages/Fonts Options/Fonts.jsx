import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Fonts = () => {
  const [fonts, setFonts] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newFont, setNewFont] = useState({ family: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editFont, setEditFont] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/fonts');
        setFonts(response.data);
        setFilteredFonts(response.data);
      } catch (error) {
        console.error('Error fetching fonts:', error);
      }
    };
    fetchFonts();
  }, []);

  useEffect(() => {
    const results = fonts.filter((font) =>
      font.family.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFonts(results);
    setCurrentPage(1);
  }, [searchTerm, fonts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFont({ ...newFont, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/fonts', newFont);
      setFonts([...fonts, response.data]);
      setNewFont({ family: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating font:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/fonts/${id}`);
      setFonts(fonts.filter((font) => font._id !== id));
      setFilteredFonts(filteredFonts.filter((font) => font._id !== id));
    } catch (error) {
      console.error('Error deleting font:', error);
    }
  };

  const openEditModal = (font) => {
    setEditFont(font);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFont({ ...editFont, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/fonts/${editFont._id}`, editFont);
      setFonts(fonts.map((font) =>
        font._id === editFont._id ? response.data : font
      ));
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error updating font:', error);
    }
  };

  const totalPages = Math.ceil(filteredFonts.length / itemsPerPage);
  const currentFonts = filteredFonts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Fonts</h4>

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
            + Add New Font
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Font Family</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentFonts.map((font) => (
              <tr key={font._id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{font.family}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(font)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(font._id)}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredFonts.length)} of ${filteredFonts.length} entries`}</span>
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
              <h2 className="text-xl font-bold mb-4">Add New Font</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="family">Font Family *</label>
                  <input
                    type="text"
                    name="family"
                    id="family"
                    value={newFont.family}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter font family"
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

        {isEditOpen && editFont && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit Font</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="family">Font Family *</label>
                  <input
                    type="text"
                    name="family"
                    id="family"
                    value={editFont.family}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter font family"
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
                    Save Changes
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

export default Fonts;
