import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUserDetail = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]); // State to store added products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // For product quantity

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/products/');
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true); // Open modal when "+" is clicked
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const existingProduct = cart.find(item => item.id === selectedProduct.id);
      if (existingProduct) {
        existingProduct.quantity += quantity; // Update quantity if already in cart
      } else {
        setCart([...cart, { ...selectedProduct, quantity }]);
      }
      setQuantity(1); // Reset quantity
      setIsModalOpen(false); // Close modal after adding
      setSelectedProduct(null); // Reset selected product
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId)); // Remove product from cart
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0); // Calculate total price

  return (
    <div className="flex gap-5 p-5">
      {/* Left Side: Product List */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={product.featureImage} 
                  alt={product.title} 
                  className="w-16 h-16 mr-4 object-cover" 
                />
                <div>
                  <h3 className="font-bold">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="py-2 border">${product.price}</p>
                </div>
              </div>
              <button 
                onClick={() => handleAddProduct(product)} 
                className="bg-blue-500 text-white p-2 rounded"
              >
                +
              </button>
            </div>
          ))
        )}
      </div>

      {/* Right Side: User Details Form */}
      <div className="flex-1 p-6 border border-gray-300">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium">Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Phone *</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Country *</label>
            <select
              name="country"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Country</option>
              {/* Add more countries as options here */}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Added Products Section */}
        <h2 className="text-xl font-semibold mt-6">Added Products</h2>
        {cart.length > 0 ? (
          <table className="min-w-full border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Product ID#</th>
                <th className="border border-gray-300 p-2">Product Title</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Details</th>
                <th className="border border-gray-300 p-2">Subtotal</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.sku}</td>
                  <td className="border border-gray-300 p-2">
                  <span className="border border-gray-300 p-2 flex items-center">
        <img 
          src={item.featureImage} 
          alt={item.title} 
          className="   object-cover" 
        />
        {item.title}

      </span>{item.productName}</td>

                  <td className="border border-gray-300 p-2">${item.price}</td>
                  <td className="border border-gray-300 p-2">
                    Size: {item.size} <br /> Color: {item.color} <br /> Qty: {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white p-1 rounded">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">No products added.</p>
        )}
        <div className="mt-4">
          <h3 className="font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
          <button className="mt-2 bg-green-500 text-white p-2 rounded">
            View & Continue
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <p>{selectedProduct?.title}</p>
            <p className="py-2 border">${selectedProduct?.price}</p>
            <div className="flex flex-col mb-4">
              <label className="font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border  border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div className="flex justify-between">
  <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black p-2 rounded">
    Cancel
  </button>
  <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 rounded">
    Add to Cart
  </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUserDetail;
