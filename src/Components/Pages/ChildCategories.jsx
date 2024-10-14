import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChildCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [childCategoryName, setChildCategoryName] = useState('');
  const [childCategorySlug, setChildCategorySlug] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(`https://ecommerce-panel-backend.onrender.com/api/subcategories?category=${selectedCategory}`);
          setSubCategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      fetchSubCategories();
    }
  }, [selectedCategory]);

  // Fetch child categories
  useEffect(() => {
    const fetchChildCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/childcategories');
        setChildCategories(response.data);
      } catch (error) {
        console.error('Error fetching child categories:', error);
      }
    };

    fetchChildCategories();
  }, []);

  const handleAddNewClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCategory('');
    setSelectedSubCategory('');
    setChildCategoryName('');
    setChildCategorySlug('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChildCategory = {
      category: selectedCategory,
      subCategory: selectedSubCategory,
      name: childCategoryName,
      slug: childCategorySlug,
      attributes: [], // You may modify this if you have attributes
      status: 'active' // Default status, modify as needed
    };

    try {
      await axios.post('https://ecommerce-panel-backend.onrender.com/api/childcategories', newChildCategory);
      alert('Child category added successfully!');
      handleModalClose();
      // Re-fetch child categories to update the table
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/childcategories');
      setChildCategories(response.data.childCategories);
    } catch (error) {
      console.error('Error adding child category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/childcategories/${id}`);
      alert('Child category deleted successfully!');
      // Re-fetch child categories to update the table
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/childcategories');
      setChildCategories(response.data.childCategories);
    } catch (error) {
      console.error('Error deleting child category:', error);
    }
  };

  return (
    <div className="content-area p-6">
      <div className="mr-breadcrumb mb-4 flex justify-between items-center">
        <h4 className="heading text-2xl font-semibold">Child Categories</h4>
        <button 
          onClick={handleAddNewClick} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            + Add New        </button>
      </div>

      {/* Modal for adding new child category */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add New Child Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Category*</label>
                <select 
                  className="border px-4 py-2 w-full rounded" 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories && categories.length > 0 && categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Sub Category*</label>
                <select 
                  className="border px-4 py-2 w-full rounded" 
                  value={selectedSubCategory} 
                  onChange={(e) => setSelectedSubCategory(e.target.value)} 
                  required
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory.name}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Name*</label>
                <input 
                  type="text" 
                  className="border px-4 py-2 w-full rounded" 
                  value={childCategoryName}
                  onChange={(e) => setChildCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Slug*</label>
                <input 
                  type="text" 
                  className="border px-4 py-2 w-full rounded" 
                  value={childCategorySlug}
                  onChange={(e) => setChildCategorySlug(e.target.value)}
                  required
                />
              </div>

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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table for displaying child categories */}
      <div className="mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
          <tr className="bg-teal-400 text-white font-mono">
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Sub Category</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Slug</th>
              <th className="border px-4 py-2">Attributes</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {childCategories.map((childCategory) => (
              <tr key={childCategory._id}>
                <td className="border px-4 py-2">{childCategory.category}</td>
                <td className="border px-4 py-2">{childCategory.subCategory}</td>
                <td className="border px-4 py-2">{childCategory.name}</td>
                <td className="border px-4 py-2">{childCategory.slug}</td>
                <td className="border px-4 py-2">{childCategory.attributes.join(', ') || 'N/A'}</td>
                <td className="border px-4 py-2">{childCategory.status || 'Active'}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleDelete(childCategory._id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildCategories;
