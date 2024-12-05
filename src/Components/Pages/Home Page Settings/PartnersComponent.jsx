import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const PartnersComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({
    link: '',
    image: null,
  });
  const [editingPartnerId, setEditingPartnerId] = useState(null);
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/partners');
        setPartners(response.data);
      } catch (error) {
        toast.error('Error fetching partners. Please try again.');
        console.error('Error fetching partners:', error);
      }
    };
    fetchPartners();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartner((prevPartner) => ({ ...prevPartner, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewPartner((prevPartner) => ({ ...prevPartner, image: e.target.files[0] }));
  };

  const handleUpdatePartner = async () => {
    const formData = new FormData();
    formData.append('link', newPartner.link);
    if (newPartner.image) {
      formData.append('image', newPartner.image);
    }

    try {
      const response = await axios.put(
        `https://ecommerce-panel-backend.onrender.com/api/partners/${editingPartnerId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setPartners((prevPartners) =>
        prevPartners.map((partner) => (partner._id === editingPartnerId ? response.data : partner))
      );
      setEditingPartnerId(null);
      toast.success('Partner updated successfully!');
    } catch (error) {
      toast.error('Error updating partner. Please try again.');
      console.error('Error updating partner:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingPartnerId) {
      await handleUpdatePartner();
    } else {
      const formData = new FormData();
      formData.append('link', newPartner.link);
      if (newPartner.image) {
        formData.append('image', newPartner.image);
      }

      try {
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/partners', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setPartners((prev) => [...prev, response.data]);
        setNewPartner({ link: '', image: null });
        setIsModalOpen(false);
        toast.success('Partner created successfully!');
      } catch (error) {
        toast.error('Error creating partner. Please try again.');
        console.error('Error creating partner:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/partners/${id}`);
      setPartners(partners.filter(partner => partner._id !== id));
      toast.success('Partner deleted successfully!');
    } catch (error) {
      toast.error('Error deleting partner. Please try again.');
      console.error('Error deleting partner:', error);
    }
  };

  const filteredPartners = partners.filter((partner) =>
    partner.link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="content-area ">
        <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">Partners</h4>
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
              setEditingPartnerId(null);
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
          >
            + Add New Partner
          </button>
        </div>

        {/* Partners Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-teal-400 text-white font-mono">
                <th className="py-2 px-4 border">Featured Image</th>
                <th className="py-2 px-4 border">Link</th>
                <th className="py-2 px-4 border">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white border divide-gray-200">
              {filteredPartners.map((partner) => (
                <tr key={partner._id} className='hover:bg-gray-100'>
                  <td className="px-6 py-4 border flex justify-center items-center">
                    {partner.image ? <img src={partner.image} alt="Partner" className="w-12 h-12 rounded" /> : '-'}
                  </td>
                  <td className="px-6 py-4 border text-center">{partner.link}</td>
                  <td className="py-2 flex justify-center px-4">
                    <button
                      onClick={() => {
                        setEditingPartnerId(partner._id);
                        setNewPartner({ link: partner.link, image: null });
                        setIsModalOpen(true);
                      }}
                      className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                    >
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner._id)}
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

        {/* Add New Partner Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{editingPartnerId ? 'Edit Partner' : 'Add New Partner'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="link">Link *</label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={newPartner.link}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Link"
                    className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Set Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {editingPartnerId ? 'Update Partner' : 'Add Partner'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default PartnersComponent;
