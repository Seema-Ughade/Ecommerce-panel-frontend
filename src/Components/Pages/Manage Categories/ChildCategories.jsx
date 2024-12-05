import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {  TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling

const ChildCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [attributesList, setAttributesList] = useState([]); // State for attributes list

  const [childCategoryName, setChildCategoryName] = useState('');
  const [childCategorySlug, setChildCategorySlug] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAttributes, setShowAttributes] = useState(false); // State to toggle attributes display
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false); // For attribute modal
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null); // Define currentSubCategoryId state

  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Define selectedCategoryId state
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    option: '',
    allowPriceField: false,
    showOnDetailsPage: false,
  });

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

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/subcategories');
        setSubCategories(response.data); // Use the correct property to access subcategories
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, []);

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

  const handleAttributeChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewAttribute((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value })
  );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChildCategory = {
      category: selectedCategory,
      subCategory: selectedSubCategory,
      name: childCategoryName,
      slug: childCategorySlug,
      attributes: [], // You may modify this if you have attributes
      status: 'active', // Default status, modify as needed
    };

    try {
      await axios.post('https://ecommerce-panel-backend.onrender.com/api/childcategories', newChildCategory);
      alert('Child category added successfully!');
      handleModalClose();
      // Re-fetch child categories to update the table
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/childcategories');
      setChildCategories(response.data);
    } catch (error) {
      console.error('Error adding child category:', error);
    }
  };

  const filteredChildCategories = childCategories.filter(childCategory =>
    childCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredChildCategories.length / itemsPerPage);
  const ChildcurrentCategoriesnew = filteredChildCategories.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const handleAttributeSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Selected Category ID:", selectedCategoryId); // Log the selected ID
    console.log("New Attribute Data:", newAttribute); // Log the new attribute data
  
    try {
      const response = await axios.post(`https://ecommerce-panel-backend.onrender.com/api/childcategories/${selectedCategoryId}/attributes`, newAttribute);
  
      // Update the child categories state with the new attribute
      setChildCategories(prev =>
        prev.map(cat => (cat._id === selectedCategoryId ? { ...cat, attributes: [...cat.attributes, response.data] } : cat))
      );
      setNewAttribute({ name: '', option: '', allowPriceField: false, showOnDetailsPage: false });
      setIsAttributeModalOpen(false); // Close modal after submission
  
    } catch (error) {
      console.error('Error adding attribute:', error.response ? error.response.data : error.message); // Log the full error response
    }
  };
    const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
  };

  const handleEditClick = (childCategory) => {
    setSelectedCategory(childCategory.mainCategory);
    setChildCategoryName(childCategory.name);
    setChildCategorySlug(childCategory.slug);
    setCurrentSubCategoryId(childCategory._id);
    setEditMode(true);
    setShowModal(true);
  };


  const handleManageClick = (childCategory) => {
    setSelectedCategoryId(childCategory._id);
    
    setAttributesList(childCategory.attributes || []); // Set the selected category's attributes
    setShowAttributes(true); // Show the attributes list
  };

  const handleEditAttribute = (attribute) => {
    setNewAttribute({
      name: attribute.name,
      option: attribute.option,
      allowPriceField: attribute.allowPriceField,
      showOnDetailsPage: attribute.showOnDetailsPage,
    });
    setEditingAttributeId(attribute._id); // Store the ID for updating
    setIsAttributeModalOpen(true); // Close modal after submission
    setShowAttributes(false); // Show the attributes list

  };

  // Function to handle delete - send request to backend to remove the attribute
  const handleDeleteAttribute = async (attributeId) => {
    try {
      await deleteAttributeFromCategory(selectedCategoryId, attributeId); // API request to delete
      await fetchAttributes(); // Refresh the list of attributes
    } catch (error) {
      console.error("Error deleting attribute:", error);
    }
  };


  const handleStatusChange = async (categoryId, newStatus) => {
    try {
      await axios.put(`https://ecommerce-panel-backend.onrender.com/api/childcategories/${categoryId}/status`, { status: newStatus });
      setChildCategories(prev =>
        prev.map(cat => (cat._id === categoryId ? { ...cat, status: newStatus } : cat))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };




  return (
    <>
    <div className="content-area ">
        <h4 className="heading text-violet-600  text-2xl font-semibold mb-4">
          Child Categories</h4>
      <div className="flex  justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddNewClick}
          className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
          + Add New
        </button>
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
                  {subcategories && subcategories.length > 0 && subcategories.map((subCategory) => (
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

      {showAttributes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h5 className="font-semibold text-lg mb-4">Attributes {selectedCategoryId.name}</h5>

            <ul className="list-disc pl-5">
              {attributesList.map((attribute) => (
                <li key={attribute._id} className="flex justify-between items-center py-2 border-b">
                  <div className="flex flex-col">
                    <span><strong>Name:</strong> {attribute.name}</span>
                    <span><strong>Option:</strong> {attribute.option}</span>
                    <span><strong>Allow Price Field:</strong> {attribute.allowPriceField ? 'Yes' : 'No'}</span>
                    <span><strong>Show on Details Page:</strong> {attribute.showOnDetailsPage ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => handleEditAttribute(attribute)}

                      className="text-blue-500  hover:text-blue-700 mr-2"
                      aria-label="Edit attribute">
                      <FontAwesomeIcon className='h-6' icon={faEdit} />
                    </button>
                    <button

                      onClick={() => handleDeleteAttribute(attribute._id)}
                      className="text-red-500 p-3 hover:text-red-700"
                      aria-label="Delete attribute"
                    >
                      <FontAwesomeIcon className='h-6' icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Close button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAttributes(false)}
                className="text-white bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isAttributeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Attribute</h2>
            <form onSubmit={handleAttributeSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newAttribute.name}
                  onChange={handleAttributeChange}
                  required
                  className="w-full border px-4 py-2 rounded focus:outline-none"
                  placeholder="In any language"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Option *</label>
                <input
                  type="text"
                  name="option"
                  value={newAttribute.option}
                  onChange={handleAttributeChange}
                  required
                  className="w-full border px-4 py-2 rounded focus:outline-none"
                  placeholder="Option label in English"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  <input
                    type="checkbox"
                    name="allowPriceField"
                    checked={newAttribute.allowPriceField}
                    onChange={handleAttributeChange}
                    className="mr-2"
                  />Allow Price Field</label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  <input
                    type="checkbox"
                    name="showOnDetailsPage"
                    checked={newAttribute.showOnDetailsPage}
                    onChange={handleAttributeChange}
                    className="mr-2"
                  />Show on Details Page</label>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAttributeModalOpen(false)}
                  className="btn px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                >
                  Create Attribute
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

          {ChildcurrentCategoriesnew.length > 0 ? (
            ChildcurrentCategoriesnew.map((childCategory) => (
              <tr key={childCategory._id} className="hover:bg-gray-100 text-center ">
                <td className="border px-4 py-2">{childCategory.category}</td>
                <td className="border px-4 py-2">{childCategory.subCategory}</td>
                <td className="border px-4 py-2">{childCategory.name}</td>
                <td className="border px-4 py-2">{childCategory.slug}</td>
                <td className="py-2 flex  px-4 border">
                  <button
                    onClick={() => {
                      
                      handleCategorySelect(childCategory._id); // Set the selected category ID
                      setIsAttributeModalOpen(true);
                    }}
                    className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Create
                  </button>
                  {/* Show Manage button only if there are attributes */}
                  {childCategory.attributes && childCategory.attributes.length > 0 && (
                    <button
                      onClick={() => handleManageClick(childCategory)}

                      className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 ml-2 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-200">
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Manage
                    </button>
                  )}
                </td>

                <td className="py-2 px-4 border">
                  <select
                    value={childCategory.status}
                    onChange={(e) => handleStatusChange(childCategory._id, e.target.value)}
                    className="border bg-sky-300 text-white rounded px-2 py-1"
                    style={{
                      backgroundColor: childCategory.status === "active" ? "#1e7e34" : "#bd2130",
                      color: "white", // Text color for visibility
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

                <td className="py-2 flex justify-center px-4 border">
                  <button
                                      onClick={() => handleEditClick(childCategory)}

                  className="flex items-center rounded-2xl text-white bg-blue-900 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(childCategory._id)}

                    className="flex items-center rounded-2xl text-white bg-red-900 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none transition ease-in-out duration-200">
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : null}

          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div>
            <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredChildCategories.length)} of ${filteredChildCategories.length} entries`}</span>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn px-4 py-1  rounded border focus:outline-none disabled:opacity-50"
            >
              Previous
            </button>
            {/* Page Number Indicators */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ml-2 px-4 py-1 ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-white'} border rounded hover:bg-gray-200 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn ml-2 px-4 py-1  rounded hover:bg-gray-200 border focus:outline-none disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

    </>
  );
};

export default ChildCategories;
