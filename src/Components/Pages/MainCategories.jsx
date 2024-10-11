import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const MainCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    image: null,
  });

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/categories'); // Adjust this path based on your API
        console.log('Fetched categories:', response.data); // Log the response
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewCategory((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the new category
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('slug', newCategory.slug);
    if (newCategory.image) {
      formData.append('image', newCategory.image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update categories with the newly created category
      setCategories((prev) => [...prev, response.data]);
      setNewCategory({ name: '', slug: '', image: null });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="content-area px-6">
      <h4 className="heading text-2xl font-semibold mb-4">Main Categories</h4>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white  hover:bg-violet-700 focus:outline-none">
          + Add New
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead>
          <tr className="bg-teal-400 text-white font-mono">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Slug</th>
            <th className="py-2 px-4 border">Attribute</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Featured</th>
            <th className="py-2 px-4 border">Options</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category, index) => (
            <tr  key={index} className="hover:bg-gray-100 ">
              <td className="py-2 px-4 border">{category.name}</td>
              <td className="py-2 px-4 border">{category.slug}</td>
              <td className="py-2 flex justify-center px-4 border">
  <button className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-200">
    <EditOutlined className="h-5 w-5 mr-1" />
    Create
  </button>
  <button className="flex items-center rounded-2xl text-white  bg-violet-400 hover:bg-violet-700 ml-2 px-3 py-1  focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-200">
    <EditOutlined className="h-5 w-5 mr-1" />
    Manage
  </button>
</td>

              <td className="py-2 px-4 border">
                {category.image ? <img src={category.image} alt={category.name} className="w-12 h-12 rounded" /> : '-'}
              </td>
              <td className="py-2 px-4 border">{category.status}</td>
              <td className="py-2 px-4 border">{category.featured ? 'Yes' : 'No'}</td>
              {/* <td className="py-2 px-4 border">
                <button className="text-blue-500 hover:text-blue-700">Manage</button>
                <button className="text-blue-500 hover:text-blue-700 ml-2">Edit</button>
              </td> */}
              <td className="py-2 flex justify-center px-4 border">
  <button className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2  transition ease-in-out duration-200">
    <EditOutlined className="h-5 w-5 mr-1" />
    Edit
  </button>
  <button className="flex items-center rounded-2xl text-white  bg-red-600 hover:bg-red-700 ml-2 px-3 py-1  focus:outline-none focus:ring-2   transition ease-in-out duration-200">
    <TrashIcon className="h-5 w-5 mr-1" />
    delet
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCategories.length)} of ${filteredCategories.length} entries`}</span>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for adding a new category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Name"
                  className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="slug">Slug *</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={newCategory.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Slug"
                  className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Set Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border rounded px-4 py-2 w-full focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Preferred Size: (1230x267) or Square Sized Image</p>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">Create Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCategories;
