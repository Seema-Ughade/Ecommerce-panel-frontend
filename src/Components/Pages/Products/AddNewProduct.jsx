
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTshirt, FaLaptop, FaCertificate, FaListAlt } from 'react-icons/fa';

const AddNewProduct = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fade-in effect when the component mounts
    setFadeIn(true);
  }, []);

  return (
    <div className={`content-area  transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-2">
        <h4 className="heading text-purple-600 text-2xl font-semibold">Add Product</h4>
      </div>

      <div className="add-product-content h-auto">
        <div className="product-description mb-6">
          <h2 className="title text-center text-xl font-bold">PRODUCT TYPES</h2>
        </div>

        <div className="ap-product-categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Physical Product Category */}
            <div 
              className="cat-box box1 p-6 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to right, #464de4 0%, #814eff 100%)', // Background Gradient
                color: '#ffffff'
              }}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/physical/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-blue-900 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 0 ? 'transform rotate-[360deg]' : ''}`}>
                  <FaTshirt className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-white mt-4">Physical</h5>
              </Link>
            </div>

            {/* Digital Product Category */}
            <div 
              className="cat-box box2 p-6 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to right, #fd4e75 0%, #fc7858 100%)', // Background Gradient
                color: '#ffffff'
              }}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/digital/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-pink-600 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 1 ? 'transform rotate-[360deg]' : ''}`}>
                  <FaLaptop className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-white mt-4">Digital</h5>
              </Link>
            </div>

            {/* License Product Category */}
            <div 
              className="cat-box box3 p-6 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to right, #464de4 0%, #814eff 100%)', // Background Gradient
                color: '#ffffff'
              }}
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/license/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-blue-900 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 2 ? 'transform rotate-[360deg]' : ''}`}>
                  <FaCertificate className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-white mt-4">License</h5>
              </Link>
            </div>
          </div>

          {/* Second Row - Classified Listing Category in the second column */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Empty div for first column */}
            <div className="hidden md:block"></div>

            {/* Classified Listing Category */}
            <div 
              className="cat-box box4 p-6 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to right, #464de4 0%, #814eff 100%)', // Background Gradient
                color: '#ffffff'
              }}
              onMouseEnter={() => setHoveredIndex(3)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to="/admin/products/listing/create" className="flex flex-col items-center text-center">
                <div className={`icon-circle bg-blue-900 rounded-full p-4 flex items-center justify-center h-24 w-24 transition-transform duration-300 ${hoveredIndex === 3 ? 'transform rotate-[360deg]' : ''}`}>
                  <FaListAlt className="text-white text-4xl" />
                </div>
                <h5 className="title text-lg font-semibold text-white mt-4">Classified Listing</h5>
              </Link>
            </div>

            {/* Empty div for third column */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
