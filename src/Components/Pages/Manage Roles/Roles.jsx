import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: {} });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editRole, setEditRole] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const itemsPerPage = 10;

  // Permissions list
  const permissionsList = [
    'Manage Dashboard',
    'Orders',
    'Manage Categories',
    'Manage Country',
    'Tax Calculate',
    'Products',
    'Affiliate Products',
    'Bulk Product Upload',
    'Product Discussion',
    'riders',
    'Set Coupons',
    'Customers',
    'Customer Deposits',
    'Vendors',
    'Vendor Subscriptions',
    'Vendor Verifications',
    'Vendor Subscription Plans',
    'Messages',
    'Blog',
    'General Settings',
    'Home Page Settings',
    'Menu Page Settings',
    'Email Settings',
    'Payment Settings',
    'Social Settings',
    'Language Settings',
    'Font Option',
    'SEO Tools',
    'Manage Staffs',
    'Subscribers',
    'Manage Roles',
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/roles');
        setRoles(response.data);
        setFilteredRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const results = roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(results);
    setCurrentPage(1);
  }, [searchTerm, roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handlePermissionToggle = (permission) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/roles', newRole);
      setRoles([...roles, response.data]);
      setNewRole({ name: '', permissions: {} });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/roles/${id}`);
      setRoles(roles.filter((role) => role._id !== id));
      setFilteredRoles(filteredRoles.filter((role) => role._id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const openEditModal = (role) => {
    setEditRole(role);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRole({ ...editRole, [name]: value });
  };

  const handleEditPermissionToggle = (permission) => {
    setEditRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/roles/${editRole._id}`, editRole);
      setRoles(roles.map((role) => (role._id === editRole._id ? response.data : role)));
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const currentRoles = filteredRoles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Roles</h4>

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
            + Add New Role
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Permissions</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr key={role._id} className="hover:bg-gray-100 ">
                <td className="border border-gray-300 px-4 py-2">{role.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {Object.keys(role.permissions).filter((key) => role.permissions[key]).join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(role)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(role._id)}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredRoles.length)} of ${filteredRoles.length} entries`}</span>
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
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-2/3">
              <h2 className="text-xl font-bold mb-4">Add New Role</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Role Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newRole.name}
                    onChange={handleInputChange}
                    className="border rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Permissions</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {permissionsList.map((permission) => (
                      <button
                        key={permission}
                        type="button"
                        onClick={() => handlePermissionToggle(permission)}
                        className={`border rounded px-3 py-1 ${newRole.permissions[permission] ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                      >
                        {permission}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 rounded px-4 py-2 mr-2">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Add Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-2/3">
              <h2 className="text-xl font-bold mb-4">Edit Role</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Role Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editRole.name}
                    onChange={handleEditChange}
                    className="border rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Permissions</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {permissionsList.map((permission) => (
                      <button
                        key={permission}
                        type="button"
                        onClick={() => handleEditPermissionToggle(permission)}
                        className={`border rounded px-3 py-1 ${editRole.permissions[permission] ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                      >
                        {permission}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setIsEditOpen(false)} className="bg-gray-300 rounded px-4 py-2 mr-2">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Update Role
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

export default Roles;
