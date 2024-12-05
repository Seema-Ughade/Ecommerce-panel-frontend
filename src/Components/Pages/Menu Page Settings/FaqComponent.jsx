import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const FaqComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({
    title: '',
    description: '',
  });
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/faqs');
        setFaqs(response.data);
      } catch (error) {
        toast.error('Error fetching FAQs. Please try again.');
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaq((prevFaq) => ({ ...prevFaq, [name]: value }));
  };

  const handleUpdateFaq = async () => {
    try {
      const response = await axios.put(
        `https://ecommerce-panel-backend.onrender.com/api/faqs/${editingFaqId}`,
        newFaq
      );
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) => (faq._id === editingFaqId ? response.data : faq))
      );
      setEditingFaqId(null);
      setNewFaq({ title: '', description: '' });
      toast.success('FAQ updated successfully!');
    } catch (error) {
      toast.error('Error updating FAQ. Please try again.');
      console.error('Error updating FAQ:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingFaqId) {
      await handleUpdateFaq();
    } else {
      try {
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/faqs', newFaq);
        setFaqs((prev) => [...prev, response.data]);
        setNewFaq({ title: '', description: '' });
        setIsModalOpen(false);
        toast.success('FAQ created successfully!');
      } catch (error) {
        toast.error('Error creating FAQ. Please try again.');
        console.error('Error creating FAQ:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/faqs/${id}`);
      setFaqs(faqs.filter(faq => faq._id !== id));
      toast.success('FAQ deleted successfully!');
    } catch (error) {
      toast.error('Error deleting FAQ. Please try again.');
      console.error('Error deleting FAQ:', error);
    }
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const currentFaqs = filteredFaqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="content-area ">
        <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">FAQs</h4>
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
              setIsModalOpen(true);
              setEditingFaqId(null);
              setNewFaq({ title: '', description: '' }); // Reset newFaq when opening modal
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
          >
            + Add New FAQ
          </button>
        </div>

        {/* FAQs Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-teal-400 text-white font-mono">
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Details</th>
                <th className="py-2 px-4 border">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white border divide-gray-200">
              {currentFaqs.map((faq) => (
                <tr key={faq._id} className='hover:bg-gray-100'>
                  <td className="px-6 py-4 border ">{faq.title}</td>
                  <td className="px-6 py-4 border ">{faq.description}</td>
                  <td className="py-2 flex justify-center px-4">
                    <button
                      onClick={() => {
                        setEditingFaqId(faq._id);
                        setNewFaq({ title: faq.title, description: faq.description });
                        setIsModalOpen(true);
                      }}
                      className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                    >
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none transition ease-in-out duration-200"
                    >
                      <TrashIcon className="h-5 w-5 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New FAQ Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{editingFaqId ? 'Edit FAQ' : 'Add New FAQ'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newFaq.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Title"
                    className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newFaq.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Description"
                    className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingFaqId ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default FaqComponent;
