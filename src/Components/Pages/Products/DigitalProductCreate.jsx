import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const DigitalProductCreate = () => {
    const [product, setProduct] = useState({
        productName: '',
        category: '',
        subCategory: '',
        childCategory: '',
        description: '',
        buyReturnPolicy: '',
        price: '',
        discountPrice: '',
        youtubeUrl: '',
        tags: '',
        featureImage: null,
        galleryImages: [],
        featureTags: [{ tag: '', color: '#000000' }],
        allowProductSEO: false,
        allowProductCondition: false,
        allowProductPreorder: false,
        manageStock: false,
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [uploadType, setUploadType] = useState('file'); // Default to 'file' option
    const [showImageInput, setShowImageInput] = useState(false);
    const [featureTags, setFeatureTags] = useState([{ tag: '', color: '#ffffff' }]);

    const handleUploadTypeChange = (event) => {
      setUploadType(event.target.value);
    };

    const handleFeatureImageChange = (e) => {
        setFeatureImage(e.target.files[0]); // Set the feature image file
    };


  
    // Fetch categories, subcategories, and childcategories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "https://ecommerce-panel-backend.onrender.com/api/categories"
                );
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (product.category) {
            const fetchSubCategories = async () => {
                try {
                    const response = await axios.get(
                        'https://ecommerce-panel-backend.onrender.com/api/subcategories'
                    );
                    setSubCategories(response.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }
            };

            fetchSubCategories();
        } else {
            setSubCategories([]);
            setChildCategories([]);
        }
    }, [product.category]);

    useEffect(() => {
        if (product.subCategory) {
            const fetchChildCategories = async () => {
                try {
                    const response = await axios.get(
                        'https://ecommerce-panel-backend.onrender.com/api/childcategories'
                    );
                    setChildCategories(response.data);
                } catch (error) {
                    console.error('Error fetching child categories:', error);
                }
            };

            fetchChildCategories();
        } else {
            setChildCategories([]);
        }
    }, [product.subCategory]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'featureImage') {
            setProduct((prev) => ({ ...prev, featureImage: files[0] }));
        } else if (name === 'galleryImages') {
            setProduct((prev) => ({ ...prev, galleryImages: [...files] }));
        }
    };

    const handleTagChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTags = [...product.featureTags];
        updatedTags[index][name] = value;
        setProduct((prev) => ({ ...prev, featureTags: updatedTags }));
    };

    const handleColorChange = (index, e) => {
        const updatedTags = [...product.featureTags];
        updatedTags[index].color = e.target.value;
        setProduct((prev) => ({ ...prev, featureTags: updatedTags }));
    };

    const addNewField = () => {
        setProduct((prev) => ({
            ...prev,
            featureTags: [...prev.featureTags, { tag: '', color: '#000000' }],
        }));
    };

    const removeField = (index) => {
        const updatedTags = product.featureTags.filter((_, i) => i !== index);
        setProduct((prev) => ({ ...prev, featureTags: updatedTags }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create form data to handle files and text inputs
        const formData = new FormData();
        
        // Append text fields to formData
        formData.append('productName', product.productName);
        formData.append('category', product.category);
        formData.append('subCategory', product.subCategory);
        formData.append('childCategory', product.childCategory);
        formData.append('description', product.description);
        formData.append('buyReturnPolicy', product.buyReturnPolicy);
        formData.append('allowProductSEO', product.allowProductSEO);
        formData.append('price', product.price);
        formData.append('discountPrice', product.discountPrice);
        formData.append('youtubeUrl', product.youtubeUrl);
    
        // Append feature image if provided
        if (product.featureImage) {
            formData.append('featureImage', product.featureImage); // Assuming featureImage is a single file
        }
        
        // Append gallery images if provided
        if (product.galleryImages && product.galleryImages.length > 0) {
            product.galleryImages.forEach((image) => {
                formData.append('galleryImages', image); // Append each image to galleryImages
            });
        }
    
        // Append feature tags
        product.featureTags.forEach((tag) => {
            formData.append('featureTags[]', tag.tag); // Append tag strings
            formData.append('featureTags[]', tag.color); // If your API needs color separately, otherwise skip this
        });
        
        try {
            const response = await fetch('https://ecommerce-panel-backend.onrender.com/api/DigitalProducts', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                const result = await response.json();
                alert('Product created successfully!');
                console.log(result.message); // Adjust this to match your API's response structure
    
                // Reset the form
                setProduct({
                    productName: '',
                    category: '',
                    subCategory: '',
                    childCategory: '',
                    description: '',
                    buyReturnPolicy: '',
                    allowProductSEO: false,
                    price: '',
                    discountPrice: '',
                    youtubeUrl: '',
                    featureTags: [{ tag: '', color: '' }], // Reset to one empty tag
                    featureImage: null,
                    galleryImages: [],
                });
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('An error occurred while creating the product.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="flex gap-8 p-8 font-sans text-gray-700">
            
            {/* Left Section */}
            <div className="w-2/3 space-y-4">
                <div>
                    <label className="block font-semibold mb-2">Product Name* (In Any Language)</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        placeholder="Enter Product Name"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                
                {/* Category, Sub Category, Child Category */}
                <div>
                    <label className="block font-semibold mb-2">Category*</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option>Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-2">Sub Category*</label>
                    <select
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option>Select Sub Category</option>
                        {subCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-2">Child Category*</label>
                    <select
                        name="childCategory"
                        value={product.childCategory}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option>Select Child Category</option>
                        {childCategories.map((childCategory) => (
                            <option key={childCategory._id} value={childCategory._id}>
                                {childCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-2"> {/* Flex container for label and select */}
        <label htmlFor="uploadType" className="font-semibold">Select Upload Type*</label>
        <select
          id="uploadType"
          value={uploadType}
          onChange={handleUploadTypeChange}
          className="border rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-blue-300" // Tailwind CSS classes for styling
        >
          <option value="file">Upload by File</option>
          <option value="link">Upload by Link</option>
        </select>
      </div>

      {/* Conditional rendering based on upload type */}
      {uploadType === 'file' ? (
        <div className="flex flex-col">
          <input type="file" multiple className="border rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-blue-300" /> {/* Input for file upload */}
        </div>
      ) : (
        <div className="flex flex-col">
          <input
            type="url"
            placeholder="Enter image URL"
            className="border rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-blue-300" // Tailwind CSS classes for styling
          /> {/* Input for link upload */}
        </div>
      )}
                {/* Text Areas */}
                <div>
                    <label className="block font-semibold mb-2">Product Description*</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter Product Description"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Product Buy/Return Policy*</label>
                    <textarea
                        name="buyReturnPolicy"
                        value={product.buyReturnPolicy}
                        onChange={handleChange}
                        placeholder="Enter Product Buy/Return Policy "
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                    />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2">
                    <label className="flex font-semibold items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowProductSEO"
                            checked={product.allowProductSEO}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <span>Allow Product SEO</span>
                    </label>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <div className="mb-4">
                            <h4 className=" font-semibold">Feature Image *</h4>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="border border-gray-300 rounded-md p-4 flex justify-center items-center">

                            <div>
                                <label className="block text-sm font-medium text-gray-600">Upload Feature Image:</label>
                                <input
                                    type="file"
                                    name="featureImage"
                                    accept="image/*"
                                    onChange={handleFeatureImageChange}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    required
                                />
                            </div>


                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-600">Product Gallery Images*</label>

                    <button
                        type="button"
                        onClick={() => setShowImageInput(!showImageInput)}
                        className="w-56 bg-purple-600 text-white py-3 rounded-md mt-4 hover:bg-purple-700 transition-colors duration-300"
                    >
                        {showImageInput ? 'Hide Gallery Image Inputs' : '+ Set Gallery '}
                    </button>
                </div>

                {showImageInput && (
                    <>
                        {imageInputs.map((input, index) => (
                            <div key={index} className="flex items-center space-x-2 mt-4">
                                <input
                                    type="file"
                                    name="galleryImages"
                                    accept="image/*"
                                    onChange={(e) => handleGalleryImageChange(index, e)}
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImageInput(index)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImageInput}
                            className="w-full bg-green-600 text-white py-2 rounded-md mt-2 hover:bg-green-700 transition-colors duration-300"
                        >
                            Add Another Image
                        </button>
                    </>
                )}

                <div>
                    <label className="block font-semibold  mb-2">Product Current Price* (In USD)</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="e.g 20"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Product Discount Price* (Optional)</label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={product.discountPrice}
                        onChange={handleChange}
                        placeholder="e.g 20"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Youtube Video URL* (Optional)</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={product.youtubeUrl}
                        onChange={handleChange}
                        placeholder="Enter Youtube Video URL"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="col-lg-12">
                    <div className="featured-keyword-area p-4 ">
                        <div className="heading-area mb-4">
                            <h4 className="title font-semibold text-xl">Feature Tags</h4>
                        </div>
                        <div className="feature-tag-top-fields" id="feature-section">
                            {featureTags.map((feature, index) => (
                                <div key={index} className="feature-area flex items-center justify-between mb-4 border p-4 rounded-md bg-white shadow-sm">
                                    <span
                                        className="remove feature-remove cursor-pointer text-red-500 hover:text-red-700"
                                        onClick={() => removeField(index)}
                                    >
                                        <i className="fas fa-times"></i>
                                    </span>
                                    <div className="w-full flex space-x-4">
                                        <div className="w-2/3">
                                            <input
                                                type="text"
                                                name="featureTags[]"
                                                value={feature.tag}
                                                onChange={(e) => handleTagChange(index, e)}
                                                placeholder="Enter Your Keyword"
                                                className="w-full p-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                style={{
                                                    WebkitTapHighlightColor: 'transparent',
                                                    WebkitTextSizeAdjust: '100%',
                                                    fontFamily: '"Open Sans", sans-serif',
                                                    fontSize: '14px',
                                                    lineHeight: '1.5',
                                                    color: '#465541',
                                                }}
                                            />
                                        </div>
                                        <div className="w-1/3 flex items-center space-x-2">
                                            <input
                                                type="color"
                                                value={feature.color}
                                                onChange={(e) => handleColorChange(index, e)}
                                                className="w-12 h-10 border rounded-md"
                                            />
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700 font-medium"
                                                onClick={() => removeField(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <a
                                href="javascript:;"
                                id="feature-btn"
                                onClick={addNewField}
                                className="add-field-btn border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium flex items-center px-4 py-2 rounded transition duration-200"
                            >
                                <i className="icofont-plus mr-2"></i>
                                Add More Field
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block font-semibold mb-2">Tags*</label>
                    <input
                        type="text"
                        name="tags"
                        value={product.tags}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                >
                    Create Product
                </button>
            </div>
        </form>
    );
};

export default DigitalProductCreate;



