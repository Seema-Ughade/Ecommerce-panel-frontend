import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const ServiceComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/services');
        setServices(response.data);
      } catch (error) {
        toast.error('Error fetching services. Please try again.');
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewService((prevService) => ({ ...prevService, image: e.target.files[0] }));
  };

  const handleUpdateService = async () => {
    const formData = new FormData();
    formData.append('title', newService.title);
    formData.append('description', newService.description);
    if (newService.image) {
      formData.append('image', newService.image);
    }

    try {
      const response = await axios.put(
        `https://ecommerce-panel-backend.onrender.com/api/services/${editingServiceId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setServices((prevServices) =>
        prevServices.map((service) => (service.id === editingServiceId ? response.data : service))
      );
      setEditingServiceId(null);
      toast.success('Service updated successfully!');
    } catch (error) {
      toast.error('Error updating service. Please try again.');
      console.error('Error updating service:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingServiceId) {
      await handleUpdateService();
    } else {
      const formData = new FormData();
      formData.append('title', newService.title);
      formData.append('description', newService.description);
      if (newService.image) {
        formData.append('image', newService.image);
      }

      try {
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setServices((prev) => [...prev, response.data]);
        setNewService({ title: '', description: '', image: null });
        setIsModalOpen(false);
        toast.success('Service created successfully!');
      } catch (error) {
        toast.error('Error creating service. Please try again.');
        console.error('Error creating service:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/services/${id}`);
      setServices(services.filter(service => service._id !== id));
      toast.success('Service deleted successfully!');
    } catch (error) {
      toast.error('Error deleting service. Please try again.');
      console.error('Error deleting service:', error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="content-area ">
        <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">Services</h4>
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
              setEditingServiceId(null);
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
          >
            + Add New Service
          </button>
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-teal-400 text-white font-mono">
                <th className="py-2 px-4 border">Featured Image</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Detail</th>
                <th className="py-2 px-4 border">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white border divide-gray-200">
              {currentServices.map((service) => (
                <tr key={service.id} className='hover:bg-gray-100'>
                  <td className="px-6 py-4 border flex justify-center items-center">
                    {service.image ? <img src={service.image} alt={service.title} className="w-12 h-12 rounded" /> : '-'}
                  </td>
                  <td className="px-6 py-4 border text-center">{service.title}</td>
                  <td className="px-6 py-4 border text-center">{service.description}</td>
                  <td className="py-2 flex justify-center px-4">
                    <button
                      onClick={() => {
                        setEditingServiceId(service.id);
                        setNewService({ title: service.title, description: service.description, image: null });
                        setIsModalOpen(true);
                      }}
                      className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                    >
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
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

        {/* Add New Service Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{editingServiceId ? 'Edit Service' : 'Add New Service'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newService.title}
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
                    value={newService.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Description"
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
                    {editingServiceId ? 'Update Service' : 'Add Service'}
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

export default ServiceComponent;
