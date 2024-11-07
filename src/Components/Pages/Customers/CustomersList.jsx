import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    profileImage: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    fax: '',
    postalCode: '',
    password: ''
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/api/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Error fetching customers');
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const results = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
    setCurrentPage(1); // Reset to first page on search term change
  }, [searchTerm, customers]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://your-api-url.com/api/customers/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
      setFilteredCustomers(filteredCustomers.filter((customer) => customer._id !== id));
      toast.success('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer.');
    }
  };

  const openEditModal = (customer) => {
    setEditCustomer(customer);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editCustomer, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://your-api-url.com/api/customers/${editCustomer._id}`, editCustomer);
      setCustomers(customers.map((customer) =>
        customer._id === editCustomer._id ? response.data : customer
      ));
      setIsEditOpen(false);
      toast.success('Customer updated successfully!');
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error updating customer.');
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newCustomer).forEach((key) => {
        formData.append(key, newCustomer[key]);
      });
      await axios.post('https://your-api-url.com/api/customers', formData);
      setCustomers([...customers, newCustomer]);
      setIsAddOpen(false);
      toast.success('Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Error adding customer.');
    }
  };

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCustomerStatusChange = async (customerId, newStatus) => {
    try {
      const response = await axios.put(`https://your-api-url.com/api/customers/${customerId}/status`, { status: newStatus });
      setCustomers(customers.map((customer) =>
        customer._id === customerId ? { ...customer, status: newStatus } : customer
      ));
      toast.success('Customer status updated successfully!');
    } catch (error) {
      toast.error('Error updating customer status. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="content-area px-6">
        <h4 className="heading text-2xl font-semibold mb-4">Manage Customers</h4>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="btn bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Add Customer
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={customer.status}
                    onChange={(e) => handleCustomerStatusChange(customer._id, e.target.value)}
                    className="border text-white rounded px-2 py-1"
                    style={{
                      backgroundColor: customer.status === "active" ? "#1e7e34" : "#bd2130",
                      color: "white",
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(customer)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer._id)}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of ${filteredCustomers.length} entries`}</span>
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
      </div>

      {/* Add Customer Modal */}
      {isAddOpen && (
        
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h3 className="text-xl font-semibold mb-4">Add New Customer</h3>

          <form className="bg-white p-6 rounded shadow-md  w-1/3" onSubmit={handleAddSubmit}>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newCustomer.email}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={newCustomer.phone}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={newCustomer.address}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">City</label>
            <input
              type="text"
              name="city"
              value={newCustomer.city}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">State</label>
            <input
              type="text"
              name="state"
              value={newCustomer.state}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={newCustomer.country}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Fax</label>
            <input
              type="text"
              name="fax"
              value={newCustomer.fax}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={newCustomer.postalCode}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={newCustomer.password}
              onChange={handleAddChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="btn text-gray-600 border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-blue-600 text-white px-6 py-2 rounded-md"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomersList;
