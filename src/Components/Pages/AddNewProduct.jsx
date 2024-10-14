import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTshirt, FaLaptop, FaCertificate, FaListAlt } from 'react-icons/fa';

const AddNewProduct = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="content-area p-6">
      <div className="mb-4">
        <h4 className="heading text-2xl font-semibold">Add Product</h4>
      </div>

      <div className="add-product-content">
        <div className="product-description mb-6">
          <h2 className="title text-xl font-bold">Product Types</h2>
        </div>

        <div className="ap-product-categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Physical Product Category */}
            <div 
              className="cat-box box1 bg-blue-100 rounded-lg p-6 shadow hover:bg-blue-200 transition duration-200 flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/physical/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-blue-600 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 0 ? 'transform rotate-y-180' : ''}`}>
                  <FaTshirt className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-blue-800 mt-4">Physical</h5>
              </Link>
            </div>

            {/* Digital Product Category */}
            <div 
              className="cat-box box2 bg-green-100 rounded-lg p-6 shadow hover:bg-green-200 transition duration-200 flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/digital/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-green-600 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 1 ? 'transform rotate-y-180' : ''}`}>
                  <FaLaptop className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-green-800 mt-4">Digital</h5>
              </Link>
            </div>

            {/* License Product Category */}
            <div 
              className="cat-box box3 bg-yellow-100 rounded-lg p-6 shadow hover:bg-yellow-200 transition duration-200 flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/license/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-yellow-600 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 2 ? 'transform rotate-y-180' : ''}`}>
                  <FaCertificate className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-yellow-800 mt-4">License</h5>
              </Link>
            </div>

            {/* Classified Listing Category */}
            <div 
              className="cat-box box4 bg-purple-100 rounded-lg p-6 shadow hover:bg-purple-200 transition duration-200 flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(3)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/listing/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-purple-600 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 3 ? 'transform rotate-y-180' : ''}`}>
                  <FaListAlt className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-purple-800 mt-4">Classified Listing</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
