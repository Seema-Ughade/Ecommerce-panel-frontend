import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', icon: '' }); // Removed URL
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/social-links'); // Replace with your API endpoint
        setSocialLinks(response.data);
        setFilteredLinks(response.data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  useEffect(() => {
    const results = socialLinks.filter((link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLinks(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, socialLinks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ecommerce-panel-backend.onrender.com/api/social-links', newLink); // Replace with your API endpoint
      setSocialLinks([...socialLinks, newLink]);
      setNewLink({ name: '', icon: '' }); // Resetting fields
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating social link:', error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const currentLinks = filteredLinks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (link) => {
    setNewLink({ name: link.name, icon: link.icon }); // Adjusted for no URL
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/social-links/${id}`); // Replace with your actual API endpoint
      setSocialLinks(socialLinks.filter(link => link._id !== id)); // Use _id for filtering
      setFilteredLinks(filteredLinks.filter(link => link._id !== id)); // Update filtered links too
    } catch (error) {
      console.error('Error deleting social link:', error);
    }
  };
  const handleStatusChange = async (socialLinkId, newStatus) => {
    try {
      // Update the status of the SocialLink using the correct API endpoint
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/social-links/${socialLinkId}/status`, { status: newStatus });
      console.log('Updated SocialLink:', response.data); // Log the updated SocialLink

      // Update socialLinks in the state
      setSocialLinks(prev =>
        prev.map(link => (link._id === socialLinkId ? { ...link, status: newStatus } : link))
      );
      toast.success('Social link status updated successfully!');
    } catch (error) {
      toast.error('Error updating social link status. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Social Links</h4>

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
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
            + Add New Link
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Icon</th>
              <th className="border border-gray-300 py-2 px-4 ">Status</th>

              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentLinks.map((link, index) => (
              <tr key={index} className="hover:bg-gray-100 text-center">

                <td className="border border-gray-300 px-4 py-2">{link.name}</td>
                <td className="border border-gray-300 px-4 py-2">{link.icon}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center items-center">
                    <select
                      value={link.status}
                      onChange={(e) => handleStatusChange(link._id, e.target.value)}
                      className="border rounded px-2 py-1"
                      style={{
                        backgroundColor: link.status === "active" ? "#1e7e34" : "#bd2130",
                        color: "white", // Text color for visibility
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">

                  <button
                    onClick={() => handleEdit(link)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(link._id)} // Use link._id for deletion
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredLinks.length)} of ${filteredLinks.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              <h2 className="text-xl font-bold mb-4">Add New Link</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newLink.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter link name"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="icon">Icon *</label>
                  <input
                    type="text"
                    name="icon"
                    id="icon"
                    value={newLink.icon}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter link icon (e.g., FontAwesome class)"
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
                    Create Link
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

export default SocialLinks;
