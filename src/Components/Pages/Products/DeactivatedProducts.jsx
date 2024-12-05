import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const DeactivatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [newProductData, setNewProductData] = useState({
    productName: '',
    sku: '',
    vendor: '',
    category: '',
    subCategory: '',
    childCategory: '',
    stock: '',
    price: '',
    discountPrice: '',
    description: '',
    buyReturnPolicy: '',
    allowProductSEO: true,
    image: null,
    status: 'active',
  });
  const [dropdownOpen, setDropdownOpen] = useState(null); // Manage which dropdown is open

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/products/');
      const inactiveProducts = response.data.filter(product => product.status === 'inactive');
      setProducts(inactiveProducts);
    } catch (error) {
      setError('Error fetching products. Please try again later.');
      console.error('Error fetching products:', error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProductData({
      productName: product.productName,
      sku: product.sku,
      vendor: product.vendor,
      category: product.category,
      subCategory: product.subCategory,
      childCategory: product.childCategory,
      stock: product.stock,
      price: product.price,
      discountPrice: product.discountPrice,
      description: product.description,
      buyReturnPolicy: product.buyReturnPolicy,
      allowProductSEO: product.allowProductSEO,
      image: null,
      status: product.status,
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', error);
      }
    }
  };

  const resetForm = () => {
    setNewProductData({
      productName: '',
      sku: '',
      vendor: '',
      category: '',
      subCategory: '',
      childCategory: '',
      stock: '',
      price: '',
      discountPrice: '',
      description: '',
      buyReturnPolicy: '',
      allowProductSEO: true,
      image: null,
      status: 'active',
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProductData(prevState => ({
      ...prevState,
      image: file,
    }));
  };

  

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await axios.put(`https://ecommerce-panel-backend.onrender.com/api/products/${productId}/status`, { status: newStatus });
      setProducts(prev => prev.filter(product => product._id !== productId || product.status === 'inactive'));
    } catch (error) {
      setError('Error updating product status. Please try again.');
    }
  };

  const handleViewGallery = (productId) => {
    // Logic to view product gallery
    console.log(`View gallery for product ID: ${productId}`);
  };

  const handleHighlight = (productId) => {
    // Logic to highlight the product
    console.log(`Highlight product ID: ${productId}`);
  };

  const handleRemoveCatalog = (productId) => {
    // Logic to remove from catalog
    console.log(`Remove from catalog for product ID: ${productId}`);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdown = (productId) => {
    setDropdownOpen(prev => (prev === productId ? null : productId)); // Toggle dropdown for the clicked product
  };

  return (
    <div className="content-area ">
      <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">
        Deactivated Products</h4>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-teal-400 text-white font-mono">
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Options</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border">
                <img src={product.featureImage} alt={product.productName} className="w-16 h-16 object-cover mx-auto" />
              </td>
              <td className="py-2 px-4 border">
                <div>{product.productName}</div>
                <div className="flex justify-center">
                  <div className="text-xs text-gray-500">ID: {product._id}</div>
                  <div className="text-xs text-gray-500 ml-2">SKU: {product.sku}</div>
                  <div className="text-xs text-gray-500 ml-2">VENDOR: {product.vendor}</div>
                </div>
              </td>
              <td className="py-2 px-4 border">Physical</td>
              <td className="py-2 px-4 border">{product.stock}</td>
              <td className="py-2 px-4 border">${product.price}</td>
              <td className="py-2 px-4 border">
                <select
                  value={product.status}
                  onChange={(e) => handleStatusChange(product._id, e.target.value)}
                  className="border rounded px-2 py-1 mx-auto"
                  style={{
                    backgroundColor: product.status === "active" ? "#1e7e34" : "#bd2130",
                    color: "white",
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
              <td className="py-2 px-4 border relative">
                <button
                  onClick={() => toggleDropdown(product._id)}
                  className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
                >
                  Actions <i className="fas fa-chevron-down ml-2"></i>
                </button>
                {dropdownOpen === product._id && (
                  <div className="absolute right-0 z-10 bg-white border rounded shadow-md mt-1 w-48">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <PencilIcon className="h-5 w-5 inline" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <TrashIcon className="h-5 w-5 inline" /> Delete
                    </button>
                    <button
                      onClick={() => handleViewGallery(product._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      View Gallery
                    </button>
                    <button
                      onClick={() => handleHighlight(product._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Highlight
                    </button>
                    <button
                      onClick={() => handleRemoveCatalog(product._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Remove from Catalog
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <div>
          <span>{`Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, filteredProducts.length)} of ${filteredProducts.length} entries`}</span>
        </div>
        <div>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn px-4 py-1 rounded border focus:outline-none disabled:opacity-50 mr-2"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`btn ml-2 px-4 py-1 ${currentPage === i + 1 ? 'bg-blue-900 text-white' : 'bg-white'} border rounded hover:bg-gray-200 focus:outline-none`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
            className="btn px-4 py-1 rounded border focus:outline-none disabled:opacity-50 ml-2"
          >
            Next
          </button>
        </div>
      </div>


    </div>
  );
};

export default DeactivatedProducts;
