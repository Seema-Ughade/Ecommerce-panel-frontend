import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const PaymentGatewayComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGateway, setNewGateway] = useState({
    name: '',
    subtitle: '',
    description: '',
  });
  const [editingGatewayId, setEditingGatewayId] = useState(null);
  const [gateways, setGateways] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/payment-gateways');
        setGateways(response.data);
      } catch (error) {
        toast.error('Error fetching payment gateways. Please try again.');
        console.error('Error fetching payment gateways:', error);
      }
    };
    fetchGateways();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGateway((prevGateway) => ({ ...prevGateway, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGatewayId) {
        // Update existing gateway
        const response = await axios.put(
          `https://ecommerce-panel-backend.onrender.com/api/payment-gateways/${editingGatewayId}`,
          newGateway
        );
        setGateways((prev) =>
          prev.map((gateway) => (gateway._id === editingGatewayId ? response.data : gateway))
        );
        toast.success('Payment gateway updated successfully!');
      } else {
        // Add new gateway
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/payment-gateways', newGateway);
        setGateways((prev) => [...prev, response.data]);
        toast.success('Payment gateway added successfully!');
      }
      setIsModalOpen(false);
      setNewGateway({ name: '', subtitle: '', description: '' });
      setEditingGatewayId(null);
    } catch (error) {
      toast.error('Error saving payment gateway. Please try again.');
      console.error('Error saving payment gateway:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/payment-gateways/${id}`);
      setGateways(gateways.filter(gateway => gateway._id !== id));
      toast.success('Payment gateway deleted successfully!');
    } catch (error) {
      toast.error('Error deleting payment gateway. Please try again.');
      console.error('Error deleting payment gateway:', error);
    }
  };

  const filteredGateways = gateways.filter((gateway) =>
    gateway.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGateways.length / itemsPerPage);
  const currentGateways = filteredGateways.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleCheckoutChange = async (CheckoutId, newCheckout) => {
    try {
        const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/payment-gateways/${CheckoutId}/Checkout`, { Checkout: newCheckout });
        console.log('Updated Checkout:', response.data);

        // Update pages in the state
        setGateways(prev =>
            prev.map(gateway => (gateway._id === CheckoutId ? { ...gateway, Checkout: newCheckout } : gateway))
        );
        toast.success('Checkout updated successfully!');

    } catch (error) {
        toast.error('Error updating Checkout. Please try again.');
    }
};

const handleDepositChange = async (DepositId, newDeposit) => {
    try {
        const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/payment-gateways/${DepositId}/Deposit`, { Deposit: newDeposit });
        console.log('Updated Deposit:', response.data);

        // Update pages in the state
        setGateways(prev =>
            prev.map(gateway => (gateway._id === DepositId ? { ...gateway, Deposit: newDeposit } : gateway))
        );
        toast.success('Deposit updated successfully!');

    } catch (error) {
        toast.error('Error updating Deposit. Please try again.');
    }
};

const handleSubscriptionChange = async (SubscriptionId, newSubscription) => {
    try {
        const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/payment-gateways/${SubscriptionId}/Subscription`, { Subscription: newSubscription });
        console.log('Updated Subscription:', response.data);

        // Update pages in the state
        setGateways(prev =>
            prev.map(gateway => (gateway._id === SubscriptionId ? { ...gateway, Subscription: newSubscription } : gateway))
        );
        toast.success('Subscription updated successfully!');

    } catch (error) {
        toast.error('Error updating Subscription. Please try again.');
    }
};






  return (
    <>
      <div className="content-area ">
        <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">Payment Gateways</h4>
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
              setEditingGatewayId(null);
              setNewGateway({ name: '', subtitle: '', description: '' });
            }}
            className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
          >
            + Add New Payment
          </button>
        </div>

        {/* Gateways Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-teal-400 text-white font-mono">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Checkout</th>
                <th className="py-2 px-4 border">Deposit</th>
                <th className="py-2 px-4 border">Subscription</th>
                <th className="py-2 px-4 border">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white border divide-gray-200">
              {currentGateways.map((gateway) => (
                <tr key={gateway._id} className='hover:bg-gray-100 text-center'>
                  <td className="px-6 py-4 border">{gateway.name}</td>
                  <td className="px-6 py-4 border">{gateway.description}</td>
                  <td className="py-2 px-4 border">
                                        <select
                                            value={gateway.Checkout}
                                            onChange={(e) => handleCheckoutChange(gateway._id, e.target.value)}
                                            className="border bg-pink-300 text-white rounded px-2 py-1"
                                            style={{
                                                backgroundColor: gateway.Checkout === "Showed" ? "#1e7e34" : "#bd2130",
                                                color: "white",
                                            }}
                                        >
                                            <option value="Showed">Showed</option>
                                            <option value="Not Showed">Not Showed</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <select
                                            value={gateway.Deposit}
                                            onChange={(e) => handleDepositChange(gateway._id, e.target.value)}
                                            className="border bg-pink-300 text-white rounded px-2 py-1"
                                            style={{
                                                backgroundColor: gateway.Deposit === "Showed" ? "#1e7e34" : "#bd2130",
                                                color: "white",
                                            }}
                                        >
                                            <option value="Showed">Showed</option>
                                            <option value="Not Showed">Not Showed</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <select
                                            value={gateway.Subscription}
                                            onChange={(e) => handleSubscriptionChange(gateway._id, e.target.value)}
                                            className="border bg-pink-300 text-white rounded px-2 py-1"
                                            style={{
                                                backgroundColor: gateway.Subscription === "Showed" ? "#1e7e34" : "#bd2130",
                                                color: "white",
                                            }}
                                        >
                                            <option value="Showed">Showed</option>
                                            <option value="Not Showed">Not Showed</option>
                                        </select>
                                    </td>





                  <td className="py-2 flex justify-center px-4">
                    <button
                      onClick={() => {
                        setEditingGatewayId(gateway._id);
                        setNewGateway({ name: gateway.name, subtitle: gateway.subtitle, description: gateway.description });
                        setIsModalOpen(true);
                      }}
                      className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none"
                    >
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(gateway._id)}
                      className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none"
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

        {/* Add/Edit Payment Gateway Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">{editingGatewayId ? 'Edit Payment Gateway' : 'Add New Payment Gateway'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newGateway.name}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subtitle" className="block text-sm font-medium mb-1">Subtitle *</label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={newGateway.subtitle}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newGateway.description}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-4 py-2 w-full"
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
                    {editingGatewayId ? 'Update' : 'Add'}
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

export default PaymentGatewayComponent;
