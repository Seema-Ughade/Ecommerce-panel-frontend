import React from 'react';
import { Link } from 'react-router-dom';

const AddNewProduct = () => {
  return (
    <div className="content-area p-6">
      <div className=" mb-4">
        <h4 className="heading text-2xl font-semibold">Add Product</h4>
      </div>

      <div className="add-product-content">
        <div className="product-description mb-6">
          <h2 className="title text-xl font-bold">Product Types</h2>
        </div>

        <div className="ap-product-categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="cat-box box1 bg-gray-100 rounded-lg p-4 shadow hover:bg-gray-200">
              <Link to="/admin/products/physical/create" className="flex flex-col items-center">
                <i className="fas fa-tshirt text-3xl mb-2"></i>
                <h5 className="title text-lg font-semibold">Physical</h5>
              </Link>
            </div>

            <div className="cat-box box2 bg-gray-100 rounded-lg p-4 shadow hover:bg-gray-200">
              <Link to="/admin/products/digital/create" className="flex flex-col items-center">
                <i className="fas fa-camera-retro text-3xl mb-2"></i>
                <h5 className="title text-lg font-semibold">Digital</h5>
              </Link>
            </div>

            <div className="cat-box box3 bg-gray-100 rounded-lg p-4 shadow hover:bg-gray-200">
              <Link to="/admin/products/license/create" className="flex flex-col items-center">
                <i className="fas fa-award text-3xl mb-2"></i>
                <h5 className="title text-lg font-semibold">License</h5>
              </Link>
            </div>

            <div className="col-span-full my-4 flex justify-center">
              <div className="cat-box box3 bg-gray-100 rounded-lg p-4 shadow hover:bg-gray-200">
                <Link to="/admin/products/listing/create" className="flex flex-col items-center">
                  <i className="fas fa-th-list text-3xl mb-2"></i>
                  <h5 className="title text-lg font-semibold">Classified Listing</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
