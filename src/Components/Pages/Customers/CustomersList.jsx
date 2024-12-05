import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CustomersList = () => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/admin/customerdetails");
  };


  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false); // For the Make Vendor modal

  const [newCustomer, setNewCustomer] = useState({
    featureImage: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    fax: '',
    postalCode: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [depositData, setDepositData] = useState({
    currentBalance: 0,
    amount: '',
    details: '',
    action: 'Add',
  });
  const [vendorData, setVendorData] = useState({
    shopName: '',
    ownerName: '',
    shopNumber: '',
    shopAddress: '',
    registrationNumber: '',
    shopDetails: '',
    plan: 'standard', // default plan
  });

  // Fetch customers and ensure data is an array
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/customers');
        const data = Array.isArray(response.data) ? response.data : [];
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    const results = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
    setCurrentPage(1);
  }, [searchTerm, customers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const [isDepositOpen, setIsDepositOpen] = useState(false); // for deposit form modal
  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositData({ ...depositData, [name]: value });
  };
  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    // Handle deposit submission here (you can replace this with actual deposit API)
    console.log(depositData);
    toast.success('Deposit submitted successfully!');
    setIsDepositOpen(false);
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/vendors', vendorData);
      toast.success('Vendor added successfully!');
      setIsVendorOpen(false);
      setVendorData({
        shopName: '',
        ownerName: '',
        shopNumber: '',
        shopAddress: '',
        registrationNumber: '',
        shopDetails: '',
        plan: 'standard',
      });
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Error adding vendor. Please try again.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/customers', newCustomer);
      const updatedCustomers = [...customers, response.data];
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      setNewCustomer({
        featureImage: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        fax: '',
        postalCode: '',
        password: '',
      });
      setIsOpen(false);
      toast.success('Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Error adding customer. Please try again.');
    }
  };
  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/customers/${id}`);
      const updatedCustomers = customers.filter((customer) => customer._id !== id);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      toast.success('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer. Please try again.');
    }
  };

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleStateStatusChange = async (customerId, newStatus) => {
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/customers/${customerId}/status`, { status: newStatus });
      console.log('Updated Customer:', response.data);

      // Update customers in state
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === customerId ? { ...customer, status: newStatus } : customer
        )
      );
      toast.success('Customer status updated successfully!');
    } catch (error) {
      toast.error('Error updating customer status. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Manage Customers</h4>

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
            + Add Customer
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentCustomers) && currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-100 text-center">
                  <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                      onClick={() => setIsDepositOpen(true)} // Open deposit form modal
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Manage Deposit
                    </button>
                    
                    <button
                      onClick={() => setIsVendorOpen(true)} // Open Make Vendor modal
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Make Vendor
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded"         onClick={handleDetailsClick}
                    >Details</button>
                    <button className="bg-indigo-500 text-white px-3 py-1 rounded">Edit</button>
                    <button className="bg-indigo-500 text-white px-3 py-1 rounded">send</button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
  <select
    value={customer.status}
    onChange={(e) => handleStateStatusChange(customer._id, e.target.value)}
    className="border text-white rounded px-2 py-1"
    style={{
      backgroundColor: customer.status === "UnBlock" ? "#1e7e34" : "#bd2130",
      color: "white",
    }}
  >
    <option value="Block">Block</option>
    <option value="UnBlock">UnBlock</option>
  </select>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(
            currentPage * itemsPerPage,
            filteredCustomers.length
          )} of ${filteredCustomers.length} entries`}</span>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded border"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} rounded border hover:bg-gray-200`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-2 px-4 py-1 rounded border"
            >
              Next
            </button>
          </div>
        </div>
        {isVendorOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6  max-w-full">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        <span>Make Vendor</span>
        <button
          onClick={() => setIsVendorOpen(false)}
          className="text-gray-600 hover:text-gray-800 font-bold"
        >
          ×
        </button>
      </h2>
      <form onSubmit={handleVendorSubmit} className="grid grid-cols-2 gap-4">
        {/* Shop Name */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Shop Name *</label>
          <input
            type="text"
            name="shopName"
            value={vendorData.shopName}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Owner Name */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Owner Name *</label>
          <input
            type="text"
            name="ownerName"
            value={vendorData.ownerName}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Shop Number */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Shop Number *</label>
          <input
            type="text"
            name="shopNumber"
            value={vendorData.shopNumber}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Shop Address */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Shop Address *</label>
          <input
            type="text"
            name="shopAddress"
            value={vendorData.shopAddress}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Registration Number */}
        <div className="flex flex-col mb-4 col-span-2">
          <label className="text-sm font-medium text-gray-700">Registration Number (Optional)</label>
          <input
            type="text"
            name="registrationNumber"
            value={vendorData.registrationNumber}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        {/* Shop Details */}
        <div className="flex flex-col mb-4 col-span-2">
          <label className="text-sm font-medium text-gray-700">Shop Details *</label>
          <textarea
            name="shopDetails"
            value={vendorData.shopDetails}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Plan Dropdown */}
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Choose Plan *</label>
          <select
            name="plan"
            value={vendorData.plan}
            onChange={handleVendorChange}
            className="border rounded px-4 py-2 w-full"
            required
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="basic">Basic</option>
            <option value="unlimited">Unlimited</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-4 col-span-2">
          <button
            type="button"
            onClick={() => setIsVendorOpen(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Vendor
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        {isDepositOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        <span>Manage Deposit</span>
        <button
          onClick={() => setIsDepositOpen(false)}
          className="text-gray-600 hover:text-gray-800 font-bold"
        >
          ×
        </button>
      </h2>
      <form onSubmit={handleDepositSubmit}>
        {/* Current Balance */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Balance</label>
          <input
            type="number"
            name="currentBalance"
            value={depositData.currentBalance}
            onChange={handleDepositChange}
            className="border rounded px-4 py-2 w-full"
            disabled
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount (in USD)</label>
          <input
            type="number"
            name="amount"
            value={depositData.amount}
            onChange={handleDepositChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={depositData.details}
            onChange={handleDepositChange}
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        {/* Action (Add/Subtract) Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Action</label>
          <select
            name="action"
            value={depositData.action}
            onChange={handleDepositChange}
            className="border rounded px-4 py-2 w-full"
            required
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </div>

        {/* Buttons (Submit & Cancel) */}
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => setIsDepositOpen(false)}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


        {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md w-1/3">
      <h2 className="text-xl font-bold mb-4 col-span-2">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="file"
          name="featureImage"
          className="col-span-2 mb-4"
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, featureImage: e.target.files[0] })
          }
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="fax"
          placeholder="Fax"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="col-span-2 flex justify-between gap-4 mt-4">
         
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Customer
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

export default CustomersList;
