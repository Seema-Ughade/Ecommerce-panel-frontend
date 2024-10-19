import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [newProductData, setNewProductData] = useState({
    name: '',
    sku: '',
    vendor: '',
    type: '',
    stock: '',
    price: '',
    status: 'active',
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.example.com/products');
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products. Please try again later.');
      console.error('Error fetching products:', error);
    }
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setNewProductData({
      name: '',
      sku: '',
      vendor: '',
      type: '',
      stock: '',
      price: '',
      status: 'active',
      image: null,
    });
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProductData(product);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://api.example.com/products/${id}`);
        fetchProducts();
      } catch (error) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`https://api.example.com/products/${editingProduct.id}`, newProductData);
      } else {
        // Create new product
        await axios.post('https://api.example.com/products', newProductData);
      }
      fetchProducts();
      handleModalClose();
    } catch (error) {
      setError('Failed to save product. Please try again.');
      console.error('Error saving product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content-area px-6">
      <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">Products</h4>

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
        <button
          onClick={handleAddNewClick}
          className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
        >
          + Add Product
        </button>
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
            <tr key={product.id} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4 border">
                <div>{product.name}</div>
                <div className="text-xs text-gray-500">ID: {product.id}</div>
                <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                <div className="text-xs text-gray-500">VENDOR: {product.vendor}</div>
              </td>
              <td className="py-2 px-4 border">{product.type}</td>
              <td className="py-2 px-4 border">{product.stock}</td>
              <td className="py-2 px-4 border">${product.price}</td>
              <td className="py-2 px-4 border">
                <select
                  value={product.status}
                  onChange={(e) => {
                    // Handle status change
                  }}
                  className="border rounded px-2 py-1"
                  style={{
                    backgroundColor: product.status === "active" ? "#1e7e34" : "#bd2130",
                    color: "white",
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEditClick(product)}
                  className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none focus:ring-2 transition ease-in-out duration-200 mr-2"
                >
                  <EditOutlined className="h-5 w-5 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 px-3 py-1 focus:outline-none transition ease-in-out duration-200"
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
}
