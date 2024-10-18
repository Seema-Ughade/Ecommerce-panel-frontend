
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling


const MainCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Define selectedCategoryId state
  const [attributesList, setAttributesList] = useState([]); // State for attributes list
  const [showAttributes, setShowAttributes] = useState(false); // State to toggle attributes display
  const [editingAttributeId, setEditingAttributeId] = useState(null); // State for tracking attribute being edited
  
  const itemsPerPage = 6;
  const [isModalOpen,  setIsModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null); // Make sure this is defined
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false); // For attribute modal
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    image: null
  });
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    option: '',
    allowPriceField: false,
    showOnDetailsPage: false,
  });


  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/categories'); 
        console.log('Fetched categories:', response.data); 
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewCategory((prev) => ({ ...prev, [name]: value }));
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
      slug: name === 'name' ? generateSlug(value) : prev.slug, // Auto-generate slug if the name field changes
    }));
  };
  
  const handleAttributeChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewAttribute((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    setNewCategory((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (categoryId, newStatus) => {
    try {
      await axios.put(`https://ecommerce-panel-backend.onrender.com/api/categories/${categoryId}`, { status: newStatus });
      // Update categories in the state
      setCategories(prev =>
        prev.map(cat => (cat._id === categoryId ? { ...cat, status: newStatus } : cat))
      );
      toast.success('Category status updated successfully!');

    } catch (error) {
      toast.error('Error updating category status. Please try again.');
    }
  };








  
  const handleFeaturedChange = async (categoryId, newFeatured) => {
    try {
      await axios.put(`https://ecommerce-panel-backend.onrender.com/api/categories/${categoryId}/featured`, { featured: newFeatured });
      setCategories(prev =>
        prev.map(cat => (cat._id === categoryId ? { ...cat, featured: newFeatured } : cat))
      );
      toast.success('Category featured status updated successfully!');

    } catch (error) {
      toast.error('Error updating category featured status. Please try again.');

      console.error('Error updating featured:', error);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Create a FormData object to send the new category
  //   const formData = new FormData();
  //   formData.append('name', newCategory.name);
  //   formData.append('slug', newCategory.slug);
  //   if (newCategory.image) {
  //     formData.append('image', newCategory.image);
  //   }

  //   try {
  //     const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/categories', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     // Update categories with the newly created category
  //     setCategories((prev) => [...prev, response.data]);
  //     setNewCategory({ name: '', slug: '', image: null });
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error('Error creating category:', error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // If editing an existing category, update it
    if (editingCategoryId) {
      await handleUpdateCategory();
      toast.success('Category updated successfully!'); // Notify success

    } else {
      // Create a FormData object to send the new category
      const formData = new FormData();
      formData.append('name', newCategory.name);
      formData.append('slug', newCategory.slug);
      if (newCategory.image) {
        formData.append('image', newCategory.image);
      }
  
      try {
        const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/categories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Update categories with the newly created category
        setCategories((prev) => [...prev, response.data]);
        setNewCategory({ name: '', slug: '', image: null }); // Reset fields
        setIsModalOpen(false); // Close modal
        toast.success('Category created successfully!'); // Notify success

      } catch (error) {
        toast.error('Error creating category. Please try again.');

        console.error('Error creating category:', error);
      }
    }
  };


  const handleAttributeSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(`https://ecommerce-panel-backend.onrender.com/api/categories/${selectedCategoryId}/attributes`, newAttribute);
        // Assuming you have the selected category ID in state and an endpoint to handle adding attributes
        setCategories(prev =>
            prev.map(cat => (cat._id === selectedCategoryId ? { ...cat, attributes: [...cat.attributes, response.data] } : cat))
        );
        setNewAttribute({ name: '', option: '', allowPriceField: false, showOnDetailsPage: false });
        setIsAttributeModalOpen(false); // Close modal after submission
        
    } catch (error) {
        console.error('Error adding attribute:', error);
    }
};
  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
  };


  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/categories/${categoryId}`);
        setCategories(prev => prev.filter(cat => cat._id !== categoryId)); // Update state
        toast.success('Category deleted successfully!'); // Success toast

      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Error deleting category. Please try again.'); // Error toast

      }
    }
  };
  const generateSlug = (name) => {
    return name
      .toLowerCase()                     
      .replace(/[^a-z0-9 -]/g, '')     
      .replace(/\s+/g, '-')               
      .replace(/-+/g, '-');              
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

// Function to handle delete - send request to backend to remove the attribute
const handleDeleteAttribute = async (attributeId) => {
  try {
    await deleteAttributeFromCategory(selectedCategoryId, attributeId); // API request to delete
    await fetchAttributes(); // Refresh the list of attributes
  } catch (error) {
    console.error("Error deleting attribute:", error);
  }
};

  // Function to open the edit modal
  const handleEditCategory = (category) => {
    setEditingCategoryId(category._id); // Set the ID of the category to be edited
    setNewCategory({
      name: category.name,
      slug: category.slug,
      image: null, // Reset the image to allow new upload
    });
    setIsModalOpen(true); // Open modal for editing
  };

  // Function to handle the update of the category, including name, slug, and optional image
  const handleUpdateCategory = async () => {
    // Log the category to be updated
    console.log('Editing category ID:', editingCategoryId);
    console.log('Updated category:', newCategory); // Check this log
    
    // Ensure the required fields are filled
    if (!editingCategoryId || !newCategory.name || !newCategory.slug) {
      console.error('Category ID or required fields are missing');
      return; // Early return if any required fields are missing
    }
  
    // Use FormData to send category data including image if available
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('slug', newCategory.slug);
  
    if (newCategory.image) {
      formData.append('image', newCategory.image); // Append the new image if it exists
    }
  
    // Log FormData entries
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await axios.put(
        `https://ecommerce-panel-backend.onrender.com/api/categories/${editingCategoryId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      const updatedData = response.data;
  
      // Update the categories state with the newly updated category
      setCategories(prev =>
        prev.map(cat => (cat._id === updatedData._id ? updatedData : cat))
      );
  
      setIsModalOpen(false); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating category:', error.response?.data?.message || error.message);
    }
  };
  
  // Function to delete a category


  return (
    <>
    
    <div className="content-area px-6">
      <h4 className="heading text-violet-600  text-2xl font-semibold mb-4">Main Categories</h4>

      <div className="flex  justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={() => setIsModalOpen(true)} 
          className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none">
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
            <th className="py-2 px-4 border">Featured</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Options</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-100 ">
              <td className="py-2 px-4 border">{category.name}</td>
              <td className="py-2 px-4 border">{category.slug}</td>
              <td className="py-2 flex  px-4 border">
                <button
                  onClick={() => {
                    handleCategorySelect(category._id); // Set the selected category ID
                    setIsAttributeModalOpen(true);
                  }}
                  className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-200"
                >
                  <EditOutlined className="h-5 w-5 mr-1" />
                  Create
                </button>
                {/* Show Manage button only if there are attributes */}
                {category.attributes && category.attributes.length > 0 && (
                  <button 
                  onClick={() => handleManageClick(category)}

                  className="flex items-center rounded-2xl text-white bg-violet-400 hover:bg-violet-700 ml-2 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-200">
                    <EditOutlined className="h-5 w-5 mr-1" />
                    Manage
                  </button>
                )}
              </td>
              <td className="py-2 px-4   border">
                {category.image ? <img src={category.image} alt={category.name} className="w-12 h-12 rounded" /> : '-'}
              </td>
              <td className="py-2 px-4 border">
                <select
                  value={category.featured}
                  onChange={(e) => handleFeaturedChange (category._id, e.target.value)}
                  className="border bg-pink-300 text-white rounded px-2 py-1"
                  style={{
                    backgroundColor: category.featured === "active" ? "#1e7e34" : "#bd2130",
                    color: "white", // Text color for visibility
                  }}
                
                >


                  
                   <option value="active" >Active</option>
                  <option value="inactive">Inactive</option> 

                </select>
                </td>

              <td className="py-2 px-4 border">
                <select
                  value={category.status}
                  onChange={(e) => handleStatusChange(category._id, e.target.value)}
                  className="border  text-white rounded px-2 py-1"
                  style={{
                    backgroundColor: category.status === "active" ? "#1e7e34" : "#bd2130",
                    color: "white", // Text color for visibility
                  }}

                >
                  <option value="active" >Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
              <td className="py-2 flex justify-center px-4 border">
                <button
                   onClick={() => handleEditCategory(category)}

                className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200">
                  <EditOutlined className="h-5 w-5 mr-1" />
                  Edit
                </button>
                <button
                    onClick={() => handleDeleteCategory(category._id)} // Pass the category ID

                 className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none transition ease-in-out duration-200">
                  <TrashIcon className="h-5 w-5 mr-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

            {/* Add New Attribute Modal */}
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
          <span>{`Showing ${currentPage * itemsPerPage - itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCategories.length)} of ${filteredCategories.length} entries`}</span>
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
      {/* Render attributes list if the Manage button is clicked */}

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
          onChange={handleInputChange} // Keep it controlled but avoid manual input if desired
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
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
</>
  );
};

export default MainCategories;
