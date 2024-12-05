import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const ManageStaffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]); // State for roles

  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    image: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust items per page as needed

    // Fetch roles
    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/roles'); // Your API endpoint for roles
          setRoles(response.data); // Assuming response.data is an array of roles
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      };
  
      fetchRoles();
    }, []);
  
    
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/staffs'); // Replace with your API endpoint
        setStaffs(response.data);
        setFilteredStaffs(response.data);
      } catch (error) {
        console.error('Error fetching staffs:', error);
      }
    };

    fetchStaffs();
  }, []);

  useEffect(() => {
    const results = staffs.filter((staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaffs(results);
    setCurrentPage(1);
  }, [searchTerm, staffs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewStaff({ ...newStaff, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newStaff.name);
    formData.append('email', newStaff.email);
    formData.append('phone', newStaff.phone);
    formData.append('role', newStaff.role);
    formData.append('password', newStaff.password);
    formData.append('image', newStaff.image);

    try {
      await axios.post('https://ecommerce-panel-backend.onrender.com/api/staffs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStaffs([...staffs, newStaff]);
      setNewStaff({ name: '', email: '', phone: '', role: '', password: '', image: null });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);
  const currentStaffs = filteredStaffs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (staff) => {
    setNewStaff({ name: staff.name, email: staff.email, phone: staff.phone, role: staff.role, password: '', image: null });
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/staffs/${id}`); // Replace with your actual API endpoint
      setStaffs(staffs.filter(staff => staff._id !== id));
      setFilteredStaffs(filteredStaffs.filter(staff => staff._id !== id));
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-area ">
        <h4 className="heading text-2xl font-semibold mb-4">Manage Staffs</h4>

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
            + Add New Staff
          </button>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-teal-400 text-white font-mono">
              <th className="py-2 px-4 border border-gray-300 ">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentStaffs.map((staff, index) => (
              <tr key={index} className="hover:bg-gray-100 text-center">
                <td className="px-6 py-4 border flex justify-center items-center ">
                  {staff.profileImage ? <img src={staff.profileImage} alt={staff.name} className="w-12 h-12 rounded" /> : '-'}

                    {/* <img src={slider.imageUrl} alt={slider.name} className="h-16 w-32 object-cover" /> */}
                  </td>

                <td className="border border-gray-300 px-4 py-2">{staff.name}</td>
                <td className="border border-gray-300 px-4 py-2">{staff.email}</td>
                <td className="border border-gray-300 px-4 py-2">{staff.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{staff.role.name}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)} // Use staff._id for deletion
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
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredStaffs.length)} of ${filteredStaffs.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1 rounded border focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Add New Staff</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="image">Staff Profile Image *</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newStaff.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter staff name"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="email">Email *</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={newStaff.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter staff email"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="phone">Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={newStaff.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter staff phone number"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="role">Role *</label>
                  <select
                    name="role"
                    id="role"
                    value={newStaff.role}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
      <option value="" disabled>Select Role</option>
      {roles.map((role) => (
        <option key={role._id} value={role._id}>{role.name}</option>
      ))}
    </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="password">Password *</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={newStaff.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter staff password"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-1/3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
                  >
                    Create Staff
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

export default ManageStaffs;














// const [attributes, setAttributes] = useState([{ option: '' }]); // Start with one input field
  
// const handleAttributeChangeone = (index, e) => {
//   const updatedAttributes = [...attributes];
//   updatedAttributes[index].option = e.target.value;
//   setAttributes(updatedAttributes);
// };

// const addNewAttributeField = () => {
//   setAttributes([...attributes, { option: '' }]); // Add a new input field
// };
// <div className="mb-4">
// <button
//   onClick={addNewAttributeField}
//   className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// >
//   Add Option
// </button>

// {attributes.map((attr, index) => (
//   <div key={index} className="mb-2">
//     <label className="block text-sm font-medium">Option {index + 1} *</label>
//     <input
//       type="text"
//       name="option"
//       value={attr.option}
//       onChange={(e) => handleAttributeChangeone(index, e)}
//       required
//       className="w-full border px-4 py-2 rounded focus:outline-none"
//       placeholder="Option label in English"
//     />
//   </div>
// ))}
// </div>
