import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

const SubCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategorySlug, setSubCategorySlug] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);
  const [error, setError] = useState('');

  // Fetch main categories and subcategories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainResponse, subResponse] = await Promise.all([
          axios.get('https://ecommerce-panel-backend.onrender.com/api/categories'),
          axios.get('https://ecommerce-panel-backend.onrender.com/api/subcategories'),
        ]);

        setMainCategories(mainResponse.data || []);
        setSubCategories(subResponse.data?.subCategories || []);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddNewClick = () => {
    setShowModal(true);
    setEditMode(false);
    resetForm();
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setMainCategory('');
    setSubCategoryName('');
    setSubCategorySlug('');
    setCurrentSubCategoryId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error message
    const subCategoryData = {
      mainCategory,
      name: subCategoryName,
      slug: subCategorySlug,
    };

    try {
      if (editMode) {
        await axios.put(`https://ecommerce-panel-backend.onrender.com/api/subcategories/${currentSubCategoryId}`, subCategoryData);
      } else {
        await axios.post('https://ecommerce-panel-backend.onrender.com/api/subcategories', subCategoryData);
      }

      alert('Subcategory successfully submitted.');
      await fetchSubCategories(); // Refresh subcategories after adding or updating
      handleModalClose();
    } catch (error) {
      setError('Failed to submit subcategory. Please try again.');
      console.error('Error submitting subcategory:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/subcategories');
      setSubCategories(response.data?.subCategories || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Edit a subcategory
  const handleEditClick = (subCategory) => {
    setMainCategory(subCategory.mainCategory);
    setSubCategoryName(subCategory.name);
    setSubCategorySlug(subCategory.slug);
    setCurrentSubCategoryId(subCategory._id);
    setEditMode(true);
    setShowModal(true);
  };

  // Delete a subcategory
  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/subcategories/${id}`);
        alert('Subcategory deleted successfully.');
        await fetchSubCategories(); // Refresh subcategories after deletion
      } catch (error) {
        setError('Failed to delete subcategory. Please try again.');
        console.error('Error deleting subcategory:', error);
      }
    }
  };

  return (
    <div className="content-area p-6">
      <div className="mr-breadcrumb mb-4 flex justify-between items-center">
        <h4 className="heading text-2xl font-semibold">Sub Categories</h4>
        <button 
          onClick={handleAddNewClick} 
          className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
          + Add New
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {/* List of subcategories */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-teal-400 text-white font-mono">
            <th className="py-2 px-4 border">Main Category</th>
            <th className="py-2 px-4 border">Sub Category</th>
            <th className="py-2 px-4 border">Slug</th>
            <th className="py-2 px-4 border">Attributes</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Options</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <tr key={subCategory._id}>
                <td className="py-2 px-4 border">{subCategory.mainCategory}</td>
                <td className="py-2 px-4 border">{subCategory.name}</td>
                <td className="py-2 px-4 border">{subCategory.slug}</td>
                <td className="py-2 px-4 border">{subCategory.Attributes}</td>
                <td className="py-2 px-4 border">{subCategory.status}</td>
                <td className="py-2 flex justify-center px-4 border">
                  <button
                    onClick={() => handleEditClick(subCategory)}
                    className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(subCategory._id)}
                    className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none transition ease-in-out duration-200"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 border text-center">
                No subcategories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for adding new subcategory */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Sub Category' : 'Add New Sub Category'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Main Category Selection */}
              <div className="mb-4">
                <label className="block text-gray-700">Main Category*</label>
                <select
                  className="border px-4 py-2 w-full rounded"
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  required
                >
                  <option value="">Select Main Category</option>
                  {mainCategories.map((category) => (
                    <option key={category._id} value={category.name.trim()}>
                      {category.name.trim()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Sub Category Name*</label>
                <input
                  type="text"
                  className="border px-4 py-2 w-full rounded"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  required
                />
              </div>

              {/* Sub Category Slug Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Slug*</label>
                <input
                  type="text"
                  className="border px-4 py-2 w-full rounded"
                  value={subCategorySlug}
                  onChange={(e) => setSubCategorySlug(e.target.value)}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
