import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LicenseProductCreate = () => {
    const [product, setProduct] = useState({
        productName: '',
        category: '',
        subCategory: '',
        childCategory: '',
        imageUploadMethod: '',
        licenseKey: '',
        description: '',
        buyReturnPolicy: '',
        platform: '',
        region: '',
        licenseType: '',
        featureImage: null,
        galleryImages: [],
        featureTags: [{ tag: '', color: '#000000' }],
        price: '',
        discountPrice: '',
        youtubeUrl: '',
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [showImageInput, setShowImageInput] = useState(false);
    const [featureTags, setFeatureTags] = useState([{ tag: '', color: '#000000' }]);
    const [imageInputs, setImageInputs] = useState([]);
    const [imageUploadMethod, setimageUploadMethod] = useState('file'); // Default to 'file' option
    const [platform, setPlatform] = useState("");
    const [region, setRegion] = useState("");
    const [licenseType, setLicenseType] = useState("");
  
    // Fetch child categories based on selected subcategory

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get(
                "https://ecommerce-panel-backend.onrender.com/api/categories"
            );
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (product.category) {
            const fetchSubCategories = async () => {
                const response = await axios.get(
                    'https://ecommerce-panel-backend.onrender.com/api/subcategories'
                );
                setSubCategories(response.data);
            };
            fetchSubCategories();
        }
    }, [product.category]);

    useEffect(() => {
        if (product.subCategory) {
            const fetchChildCategories = async () => {
                const response = await axios.get(
                    'https://ecommerce-panel-backend.onrender.com/api/childcategories'
                );
                setChildCategories(response.data);
            };
            fetchChildCategories();
        }
    }, [product.subCategory]);











    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddImageInput = () => {
        setImageInputs([...imageInputs, null]);
    };

    const handleRemoveImageInput = (index) => {
        const newImageInputs = imageInputs.filter((_, i) => i !== index);
        setImageInputs(newImageInputs);
    };

    const handleGalleryImageChange = (index, e) => {
        const newGalleryImages = [...imageInputs];
        newGalleryImages[index] = e.target.files[0];
        setImageInputs(newGalleryImages);
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'featureImage') {
            setProduct((prev) => ({ ...prev, featureImage: files[0] }));
        } else if (name === 'galleryImages') {
            setProduct((prev) => ({ ...prev, galleryImages: Array.from(files) })); // Convert FileList to Array
        }
    };
    const handleFeatureImageChange = (e) => {
        setFeatureImage(e.target.files[0]); // Set the feature image file
    };
    const handleimageUploadMethodChange = (event) => {
        setimageUploadMethod(event.target.value);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle product submission logic
        console.log('Submitted product data:', product);
    };
    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate('/admin/products/types');
    };







    const [licenseFields, setLicenseFields] = useState([{ licenseKey: "", licenseQuantity: "" }]);

    const handleFieldChange = (index, fieldName, value) => {
      const updatedFields = [...licenseFields];
      updatedFields[index][fieldName] = value;
      setLicenseFields(updatedFields);
    };
  
    const handleAddField = () => {
      setLicenseFields([...licenseFields, { licenseKey: "", licenseQuantity: "" }]);
    };
  
    const handleRemoveField = (index) => {
      const updatedFields = licenseFields.filter((_, i) => i !== index);
      setLicenseFields(updatedFields);
    };
      return (
        <>
        {/* <div className="flex justify-between px-8 items-center "> */}
        <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 items-center">


          <h4 className="heading text-2xl text-purple-600 font-semibold">Add license Product</h4>
          <button
            onClick={handleBackClick}
            className="flex items-center border bg-purple-600 p-2 text-white  "
          >
            <ArrowLeftOutlined className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>
    
        <form onSubmit={handleSubmit} className="flex gap-8 pl-8 pr-8 pt-4 pb-8 font-sans text-gray-700">
        {/* Left Section */}
            <div className="w-2/3 space-y-4">
                <div>
                    <label className="block mb-2">Product Name* (In Any Language)</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        placeholder="Enter Product Name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

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
                        <label htmlFor="imageUploadMethod" className="font-semibold">Select Upload Type*</label>
                        <select
                            name='imageUploadMethod'
                            id="imageUploadMethod"
                            value={imageUploadMethod}
                            onChange={handleimageUploadMethodChange}
                            className="border rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-blue-300" // Tailwind CSS classes for styling
                        >
                            <option value="file">Upload by File</option>
                            <option value="link">Upload by Link</option>
                        </select>
                    </div>

                    {/* Conditional rendering based on upload type */}
                    {imageUploadMethod === 'file' ? (
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
 <div>
      <h2 className="text-lg font-semibold mb-4">Product Licenses</h2>
      {licenseFields.map((field, index) => (
        <div key={index} className="flex gap-4 mb-4 items-center">
          <div className="w-1/2">
            <label className="block mb-2">License Key *</label>
            <input
              type="text"
              name={`licenseKey-${index}`}
              value={field.licenseKey}
              onChange={(e) => handleFieldChange(index, "licenseKey", e.target.value)}
              placeholder="Enter License Key"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2">License Quantity *</label>
            <input
              type="number"
              name={`licenseQuantity-${index}`}
              value={field.licenseQuantity}
              onChange={(e) => handleFieldChange(index, "licenseQuantity", e.target.value)}
              placeholder="Enter License Quantity"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddField}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add More Fields
      </button>
    </div>  
                <div>
                    <label className="block mb-2">Product Description*</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter Product Description"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Product Buy/Return Policy*</label>
                    <textarea
                        name="buyReturnPolicy"
                        value={product.buyReturnPolicy}
                        onChange={handleChange}
                        placeholder="Enter Buy/Return Policy"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                        required
                    />
                </div>
                <div>
                    <label className="flex font-semibold items-center space-x-2">
    <input
        type="checkbox"
        className="h-4 w-4 text-blue-600"
        name="allowProductSEO"
        checked={product.allowProductSEO}
        onChange={handleChange}
    />
    <span>Allow Product SEO</span>
</label>

{product.allowProductSEO && (
    <div className="flex flex-col space-y-1 mt-2">
        <label className="font-semibold">Meta Tags*</label>
        <input
            type="text"
            name="metaTags"
            value={product.metaTags}
            onChange={handleChange}
            placeholder="Enter Meta Tags (e.g., keyword1, keyword2)"
            className="border border-gray-300 rounded p-1"
        />
        
        <label className="font-semibold mt-2">Meta Description*</label>
        <input
            type="text"
            name="metaDescription"
            value={product.metaDescription}
            onChange={handleChange}
            placeholder="Enter Meta Description"
            className="border border-gray-300 rounded p-1"
        />
    </div>
)}








                    </div>
                    <div className="mb-4">
        <label className="block mb-2">Platform <span className="text-gray-500">(Optional)</span></label>
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Enter Platform"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Region <span className="text-gray-500">(Optional)</span></label>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Enter Region"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2">License Type <span className="text-gray-500">(Optional)</span></label>
        <input
          type="text"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value)}
          placeholder="Enter Type"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>



            </div>

            {/* Right Section */}
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
        </form></>
    );
};

export default LicenseProductCreate;
