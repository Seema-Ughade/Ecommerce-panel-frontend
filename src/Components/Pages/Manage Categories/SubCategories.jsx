import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const SubCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategorySlug, setSubCategorySlug] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [attributesList, setAttributesList] = useState([]); // State for attributes list
  const [editingAttributeId, setEditingAttributeId] = useState(null); // State for tracking attribute being edited
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);
  const [error, setError] = useState('');
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false); // For attribute modal
  const [showAttributes, setShowAttributes] = useState(false); // State to toggle attributes display
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Define selectedCategoryId state
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    option: '',
    allowPriceField: false,
    showOnDetailsPage: false,
  });

  // Fetch main categories and subcategories from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainResponse, subResponse] = await Promise.all([
          axios.get('https://ecommerce-panel-backend.onrender.com/api/categories'),
          axios.get('https://ecommerce-panel-backend.onrender.com/api/subcategories'),
        ]);

        setMainCategories(mainResponse.data || []);
        setSubCategories(subResponse.data || []);
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


  const handleAttributeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://ecommerce-panel-backend.onrender.com/api/subcategories/${selectedCategoryId}/attributes`, newAttribute);
      // Assuming you have the selected category ID in state and an endpoint to handle adding attributes
      setSubCategories(prev =>
        prev.map(cat => (cat._id === selectedCategoryId ? { ...cat, attributes: [...cat.attributes, response.data] } : cat))
      );
      setNewAttribute({ name: '', option: '', allowPriceField: false, showOnDetailsPage: false });
      setIsAttributeModalOpen(false); // Close modal after submission

    } catch (error) {
      console.error('Error adding attribute:', error);
    }
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
      await fetchSubCategories(); // Refresh subcategories after adding or updating

      handleModalClose();
    } catch (error) {
      setError('Failed to submit subcategory. Please try again.');
      console.error('Error submitting subcategory:', error);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with '-'
      .replace(/^-|-$/g, '')       // Remove leading or trailing hyphens
      .trim();                     // Remove any extra spaces
  };

  const handleSubCategoryNameChange = (e) => {
    const name = e.target.value;
    setSubCategoryName(name);
    setSubCategorySlug(generateSlug(name)); // Generate the slug whenever the name changes
  };


  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/subcategories');
      // setSubCategories(response.data?.subCategories || []);
      setSubCategories(response.data); // Assuming setSubCategories updates the state correctly

    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
  };

  const handleAttributeChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewAttribute((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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


  const handleStatusChange = async (categoryId, newStatus) => {
    try {
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/subcategories/${categoryId}/status`, { status: newStatus });
      console.log('Updated Subcategory:', response.data); // Log the updated subcategory
      // Update categories in the state
      setSubCategories(prev =>
        prev.map(cat => (cat._id === categoryId ? { ...cat, status: newStatus } : cat))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const handleManageClick = (category) => {
    setSelectedCategoryId(category._id);
    setAttributesList(category.attributes || []); // Set the selected category's attributes
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


  const filteredsubCategories = subCategories.filter(subcategory =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredsubCategories.length / itemsPerPage);

  // Get the subcategories for the current page
  const subCategoriesnew = filteredsubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    // <div className="content-area p-6">
    //   <div className="mr-breadcrumb mb-4 flex justify-between items-center">
    //     <h4 className="heading text-2xl font-semibold">Sub Categories</h4>
    //     <button 
    //       onClick={handleAddNewClick} 
    //       className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
    //       + Add New
    //     </button>
    //   </div>


    <div className="content-area ">
      <h4 className="heading text-violet-600  text-2xl font-semibold mb-4">Sub Categories</h4>

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
          {subCategoriesnew.length > 0 ? (
            subCategoriesnew.map((subCategory) => (
              <tr key={subCategory._id} className="hover:bg-gray-100 text-center ">
                <td className="py-2 px-4 border">{subCategory.mainCategory}</td>
                <td className="py-2 px-4 border">{subCategory.name}</td>
                <td className="py-2 px-4 border">{subCategory.slug}</td>
                <td className="py-2  flex px-4 border">
                  <button
                    onClick={() => {
                      handleCategorySelect(subCategory._id); // Set the selected category ID
                      setIsAttributeModalOpen(true);
                    }}
                    className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-200"
                  >
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Create
                  </button>
                  {/* Show Manage button only if there are attributes */}
                  {subCategory.attributes && subCategory.attributes.length > 0 && (
                    <button
                      onClick={() => handleManageClick(subCategory)}

                      className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 ml-2 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-200">
                      <EditOutlined className="h-5 w-5 mr-1" />
                      Manage
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <select
                    value={subCategory.status}
                    onChange={(e) => handleStatusChange(subCategory._id, e.target.value)}
                    className="border bg-sky-300 text-white rounded px-2 py-1"
                    style={{
                      backgroundColor: subCategory.status === "active" ? "#1e7e34" : "#bd2130",
                      color: "white", // Text color for visibility
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

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
          ) : null}

        </tbody>
      </table>

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

                      onClick={() => handleEditAttribute(attribute._id)}
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

      <div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredsubCategories.length)} of ${filteredsubCategories.length} entries`}</span>
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
                  onChange={handleSubCategoryNameChange} // Update this line

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
                  readOnly // Make the slug read-only
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
