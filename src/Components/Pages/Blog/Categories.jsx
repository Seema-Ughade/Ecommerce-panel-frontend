import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/Blogcategories'); // Replace with your API endpoint
        setCategories(response.data);
        setFilteredCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    const results = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(results);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post new category to the backend
      await axios.post('https://ecommerce-panel-backend.onrender.com/api/Blogcategories', newCategory); // Replace with your API endpoint
      setCategories([...categories, newCategory]);
      setNewCategory({ name: '', slug: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  
  

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleEdit = (category) => {
    setNewCategory({ name: category.name, slug: category.slug });
    setIsOpen(true);
    setIsEdit(true);
    setEditCategorySlug(category.slug);
  };

  const handleDelete = async (id) => {
    try {
      // Make sure to use the correct _id parameter for deletion
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/Blogcategories/${id}`); // Replace with your actual API endpoint
      // Update the categories state to remove the deleted category
      setCategories(categories.filter(category => category._id !== id)); // Use _id for filtering
      setFilteredCategories(filteredCategories.filter(category => category._id !== id)); // Update filtered categories too
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  


  return (
    <div className="container  ">

      <div className="content-area ">
      <h4 className="heading text-2xl font-semibold mb-4">Categories</h4>

      <div className="flex  justify-between mb-4">
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
          + Add New Category
          </button>
      </div>
      

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>

        <tr className="bg-teal-400 text-white font-mono">
        <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Slug</th>
            <th className="border border-gray-300 px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {currentCategories.map((category, index) => (
            <tr key={index} className="hover:bg-gray-100 ">

              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2">{category.slug}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
        <button
          onClick={() => handleEdit(category)}
          className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
        <EditOutlined className="h-5 w-5 mr-1" />

          Edit
        </button>
        <button
    onClick={() => handleDelete(category._id)} // Use category._id for deletion
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCategories.length)} of ${filteredCategories.length} entries`}</span>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn px-4 py-1  rounded border  focus:outline-none "
          >
            Previous
          </button>
                  {/* Page Number Indicators */}
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
            // className="btn ml-2 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none disabled:opacity-50"
            className="btn  ml-2 px-4 py-1  rounded border  focus:outline-none "

          >
            Next
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="name">Name *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category name (in English)"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="slug">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  value={newCategory.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category slug (in English)"
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
                  Create Category
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

export default Categories;
