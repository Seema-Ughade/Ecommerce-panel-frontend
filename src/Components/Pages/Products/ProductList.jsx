import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { EditOutlined } from '@ant-design/icons';

export default function ProductList() {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/products/');
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products. Please try again later.');
      console.error('Error fetching products:', error);
    }
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
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
      image: null, // Keep the image unchanged unless uploading a new one
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in newProductData) {
        formData.append(key, newProductData[key]);
      }
      if (editingProduct) {
        // Update existing product
        await axios.put(`https://ecommerce-panel-backend.onrender.com/api/products/${editingProduct._id}`, formData);
      } else {
        // Create new product
        await axios.post('https://ecommerce-panel-backend.onrender.com/api/products', formData);
      }
      fetchProducts();
      handleModalClose();
    } catch (error) {
      setError('Failed to save product. Please try again.');
      console.error('Error saving product:', error);
    }
  };

  // const handleStatusChange = async (productId, newStatus) => {
  //   try {
  //     await axios.put(`https://ecommerce-panel-backend.onrender.com/api/products/${productId}/status`, { status: newStatus });
  //     // await axios.put(`https://ecommerce-panel-backend.onrender.com/api/childcategories/${categoryId}/status`, { status: newStatus });

  //     fetchProducts();
  //   } catch (error) {
  //     // setError('Failed to update product status. Please try again.');
  //     console.error('Error updating product status:', error);
  //   }
  // };
  const handleStatusChange = async (productId, newStatus) => {
    try {
      // await axios.put(`https://ecommerce-panel-backend.onrender.com/api/categories/${categoryId}`, { status: newStatus });
      const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/products/${productId}/status`, { status: newStatus });
      console.log('Updated Subcategory:', response.data); // Log the updated subcategory

      // Update categories in the state
      setProducts(prev =>
        prev.map(cat => (cat._id === productId ? { ...cat, status: newStatus } : cat))
      );
      toast.success('Category status updated successfully!');

    } catch (error) {
      toast.error('Error updating category status. Please try again.');
    }
  };



  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content-area ">
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
            <tr key={product.id} className="hover:bg-gray-100 justify-center text-center">
              <td className="py-2 px-4 border">
                <img src={product.featureImage} alt={product.productName} className="w-16 h-16 justify-center ml-12 object-cover" />
              </td>
              <td className="py-2 text-center px-4 border">
                <div>{product.productName}</div>
                <div className='flex justify-center'>
                <div className="text-xs ml-2 text-gray-500">ID: {product.id}</div>
                <div className="text-xs ml-2 text-gray-500">SKU: {product.sku}</div>
                <div className="text-xs ml-2 text-gray-500">VENDOR: {product.vendor}</div></div>
              </td>
              {/* <td className="py-2 text-center px-4 border">{product.type}</td> */}
              <td className="py-2 text-center px-4 border">Physical</td>
              <td className="py-2 text-center px-4 border">{product.stock}</td>
              <td className="py-2 text-center px-4 border">${product.price}</td>
              <td className="py-2 text-center px-4 border">
                <select
                  value={product.status}
                  onChange={(e) => handleStatusChange(product._id, e.target.value)}
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
              <td className="py-2  px-4 flex ">
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

      {showModal && (
        <div className="modal">
          {/* Modal implementation here */}
          <form onSubmit={handleSubmit}>
            {/* Form fields based on newProductData state */}
            <input type="text" name="productName" value={newProductData.productName} onChange={handleChange} placeholder="Product Name" required />
            <input type="text" name="sku" value={newProductData.sku} onChange={handleChange} placeholder="SKU" required />
            <input type="text" name="vendor" value={newProductData.vendor} onChange={handleChange} placeholder="Vendor" />
            <input type="text" name="category" value={newProductData.category} onChange={handleChange} placeholder="Category" />
            <input type="text" name="subCategory" value={newProductData.subCategory} onChange={handleChange} placeholder="Sub Category" />
            <input type="text" name="childCategory" value={newProductData.childCategory} onChange={handleChange} placeholder="Child Category" />
            <input type="number" name="stock" value={newProductData.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="number" name="price" value={newProductData.price} onChange={handleChange} placeholder="Price" required />
            <input type="number" name="discountPrice" value={newProductData.discountPrice} onChange={handleChange} placeholder="Discount Price" />
            <textarea name="description" value={newProductData.description} onChange={handleChange} placeholder="Description"></textarea>
            <input type="text" name="buyReturnPolicy" value={newProductData.buyReturnPolicy} onChange={handleChange} placeholder="Buy Return Policy" />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={handleModalClose}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
