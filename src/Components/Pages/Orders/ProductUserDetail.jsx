import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUserDetailPOS = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]); // State to store added products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // For product quantity
  const [loading, setLoading] = useState(true);  // To manage loading state

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/customers');
        setUsers(response.data);  // Assuming the API returns a list of users in 'data'
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
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
    <div className="w-1/3 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">

      {/* <div className="w-1/3 p-4 border"> */}
      <h2 className="text-xl font-semibold mb-4">PRODUCTS</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="h-[700px] overflow-y-scroll">
          {products.map((product, index) => (
                            <div key={index} className="border border-gray-300 p-4 mb-3 flex items-center justify-between rounded-lg shadow-md">

             {/* <div key={index} className="border border-gray-300 p-4 mb-3 flex items-center justify-between"> */}
              <div className="flex items-center">
                <img 
                  src={product.featureImage} 
                  alt={product.title} 
                  className="w-20 border rounded-md p-1 m-3 h-20 mb-2 object-cover" 
                  />
                <div>
                  {/* <h3 className="font-bold">{product.title}</h3> */}
                  
                  <p className="text-sm text-gray-600">{product.productName}</p>
                  <p className="py-2 ">{product.price}</p>
                </div>
              </div>
              <button 
                onClick={() => handleAddProduct(product)} 
                                className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"

                // className="bg-purple-500 text-white p-2 rounded"
              >
                +
                </button>
        </div>
      ))}
    </div>
  )}
</div>
      {/* Right Side: User Details Form */}
      {/* <div className="flex-1 p-6 border border-gray-300"> */}
            <div className="flex-1 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">

  <h2 className="text-xl font-semibold mb-4">User Details</h2>
  <form className="space-y-4">
            {/* User Dropdown */}
            <div className="flex flex-col">
          <label htmlFor="user" className="font-medium">User *</label>
          {loading ? (
            <p>Loading users...</p>  // Show loading text while fetching users
          ) : error ? (
            <p className="text-red-500">{error}</p>  // Show error message if there's an error
          ) : (
            <select
              id="user"
              name="user"
              required
              className="border w-72 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}  {/* Assuming user object has 'id' and 'name' properties */}
                </option>
              ))}
            </select>
          )}
        </div>


    {/* First Row: Name, Email, Phone in 3 columns */}
    <div className="grid grid-cols-3 gap-4">
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
    </div>

    {/* Second Row: Address in 1 column */}
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

    {/* Third Row: Country and City in 2 columns */}
    <div className="grid grid-cols-2 gap-4">
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
    </div>

    {/* Fourth Row: State and Postal Code in 2 columns */}
    <div className="grid grid-cols-2 gap-4">
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
            <td className="border w-40 border-gray-300 p-2">
              <span className="border border-gray-300 p-2 flex items-center">
                <img 
                  src={item.featureImage} 
                  alt={item.title} 
                  className="object-cover" 
                />
                {item.title}
              </span>
              {item.productName}
            </td>
            <td className="border border-gray-300 p-2">{item.price}</td>
            <td className="border border-gray-300 p-2">
              Size: {item.size} <br /> Color: {item.color} <br /> Qty: {item.quantity}
            </td>
            <td className="border border-gray-300 p-2">{(item.price * item.quantity).toFixed(2)}</td>
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
    <h3 className="font-semibold">Total: {totalPrice.toFixed(2)}</h3>
    <button className="mt-2 bg-purple-500 text-white p-2 rounded">
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
            <p className="py-2 border">{selectedProduct?.price}</p>
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

export default ProductUserDetailPOS;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductUserDetail = () => {
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cart, setCart] = useState([]); // State to store added products
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [quantity, setQuantity] = useState(1); // For product quantity
//   const [loading, setLoading] = useState(true);  // To manage loading state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/products/');
//         setProducts(response.data);
//       } catch (error) {
//         setError('Error fetching products. Please try again later.');
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/customers');
//         setUsers(response.data);  // Assuming the API returns a list of users in 'data'
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch users');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleAddProduct = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true); // Open modal when "+" is clicked
//   };

//   const handleAddToCart = () => {
//     if (selectedProduct) {
//       const existingProduct = cart.find(item => item.id === selectedProduct.id);
//       if (existingProduct) {
//         existingProduct.quantity += quantity; // Update quantity if already in cart
//       } else {
//         setCart([...cart, { ...selectedProduct, quantity }]);
//       }
//       setQuantity(1); // Reset quantity
//       setIsModalOpen(false); // Close modal after adding
//       setSelectedProduct(null); // Reset selected product
//     }
//   };

//   const handleRemoveFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId)); // Remove product from cart
//   };

//   const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0); // Calculate total price

//   return (
//     <div className="flex gap-5 p-5 bg-gray-50">
//       {/* Left Side: Product List */}
//       <div className="w-1/3 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">PRODUCTS</h2>
//         {error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           products.map((product, index) => (
//             <div key={index} className="border border-gray-300 p-4 mb-3 flex items-center justify-between rounded-lg shadow-md">
//               <div className="flex items-center">
//                 <img
//                   src={product.featureImage}
//                   alt={product.title}
//                   className="w-20 h-20 mb-2 object-cover rounded-md"
//                 />
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-600">{product.productName}</p>
//                   <p className="py-2 text-lg font-semibold">{product.price}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleAddProduct(product)}
//                 className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
//               >
//                 +
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Right Side: User Details Form */}
//       <div className="flex-1 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">User Details</h2>
//         <form className="space-y-4">
//           {/* User Dropdown */}
//           <div className="flex flex-col">
//             <label htmlFor="user" className="font-medium">User *</label>
//             {loading ? (
//               <p className="text-gray-500">Loading users...</p>  // Show loading text while fetching users
//             ) : error ? (
//               <p className="text-red-500">{error}</p>  // Show error message if there's an error
//             ) : (
//               <select
//                 id="user"
//                 name="user"
//                 required
//                 className="border w-72 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select User</option>
//                 {users.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name} {/* Assuming user object has 'id' and 'name' properties */}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* First Row: Name, Email, Phone in 3 columns */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="flex flex-col">
//               <label className="font-medium">Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 required
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="font-medium">Email *</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="font-medium">Phone *</label>
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 required
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Second Row: Address in 1 column */}
//           <div className="flex flex-col">
//             <label className="font-medium">Address *</label>
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               required
//               className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Third Row: Country and City in 2 columns */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex flex-col">
//               <label className="font-medium">Country *</label>
//               <select
//                 name="country"
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>Select Country</option>
//                 {/* Add more countries as options here */}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <label className="font-medium">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Fourth Row: State and Postal Code in 2 columns */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex flex-col">
//               <label className="font-medium">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="font-medium">Postal Code</label>
//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </form>

//         {/* Added Products Section */}
//         <h2 className="text-xl font-semibold mt-6">Added Products</h2>
//         {cart.length > 0 ? (
//           <table className="min-w-full border border-gray-300 mt-4">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">Product ID#</th>
//                 <th className="border border-gray-300 p-2">Product Title</th>
//                 <th className="border border-gray-300 p-2">Price</th>
//                 <th className="border border-gray-300 p-2">Details</th>
//                 <th className="border border-gray-300 p-2">Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((product, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2">{product.id}</td>
//                   <td className="border border-gray-300 p-2">{product.productName}</td>
//                   <td className="border border-gray-300 p-2">{product.price}</td>
//                   <td className="border border-gray-300 p-2">{product.quantity}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       onClick={() => handleRemoveFromCart(product.id)}
//                       className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               <tr>
//                 <td className="border border-gray-300 p-2" colSpan="3">Total</td>
//                 <td className="border border-gray-300 p-2" colSpan="2">{totalPrice}</td>
//               </tr>
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-500 mt-2">No products added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductUserDetail;
