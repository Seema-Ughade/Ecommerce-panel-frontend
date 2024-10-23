import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload } from 'react-icons/fa'; // Importing the upload icon from FontAwesome

const PhysicalCreateProduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        sku: '',
        category: '',
        subCategory: '',
        childCategory: '',
        allowProductCondition: false,
        allowProductPreorder: false,
        allowMinimumOrderQty: false,
        manageStock: false,
        allowEstimatedShippingTime: false,
        allowProductWholeSell: false,
        allowProductMeasurement: false,
        allowProductColors: false,
        stock: '',
        description: '',
        buyReturnPolicy: '',
        allowProductSEO: false,
        featureImage : 'null',

        price: '',
        discountPrice: '',
        youtubeUrl: '',
        featureTags: '',
        tags: ''
    });
    const [featureImage, setFeatureImage] = useState(null);
    const [featureTags, setFeatureTags] = useState([{ tag: '', color: '#ffffff' }]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    // Function to generate a unique SKU
    const generateSKU = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleTagChange = (index, event) => {
        const newTags = [...featureTags];
        newTags[index].tag = event.target.value;
        setFeatureTags(newTags);
    };

    const handleColorChange = (index, event) => {
        const newTags = [...featureTags];
        newTags[index].color = event.target.value;
        setFeatureTags(newTags);
    };

    const addNewField = () => {
        setFeatureTags([...featureTags, { tag: '', color: '#000000' }]);
    };

    const removeField = (index) => {
        const newTags = featureTags.filter((_, i) => i !== index);
        setFeatureTags(newTags);
    };

    // Fetch categories, subcategories, and childcategories
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
        const { name, type, value, checked } = e.target;
    
        if (type === 'checkbox') {
            // Set the state using the 'checked' value for checkboxes
            setProduct({ ...product, [name]: checked });
        } else {
            // For other types of input
            setProduct({ ...product, [name]: value });
        }
    };
    
    // const handleFileChange = (e) => {
    //     if (e.target.name === 'featureImage') {
    //         setFeatureImage(e.target.files[0]); // Only one file for feature image

    //     } else if (e.target.name === 'galleryImages') {
    //         setGalleryImages(Array.from(e.target.files)); // Convert FileList to Array
    //     }
    // };
    const handleFileChange = (e) => {
        const { name, files } = e.target; // Destructure name and files from the event target

        if (name === 'featureImage') {
            // Set the single feature image file
            setFeatureImage(files[0]); // Only one file for feature image
        } else if (name === 'galleryImages') {
            // Convert FileList to Array for multiple gallery images
            const selectedImages = Array.from(files); // Convert FileList to Array
            setGalleryImages(selectedImages); // Set state with the selected images
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product); // Log product state

        // Validation Check
        if (!product.productName || !product.sku || !product.category || !product.subCategory || !product.childCategory) {
            alert("Please fill in all required fields.");
            return;
        }
        
        // Create a new FormData object
        const formData = new FormData();
    
        // Append product data to form data
        formData.append('productName', product.productName);
        formData.append('sku', product.sku);
        formData.append('category', product.category);
        formData.append('subCategory', product.subCategory);
        formData.append('childCategory', product.childCategory);
        formData.append('allowProductCondition', product.allowProductCondition);
        formData.append('allowProductPreorder', product.allowProductPreorder);
        formData.append('allowMinimumOrderQty', product.allowMinimumOrderQty);
        formData.append('manageStock', product.manageStock);
        formData.append('allowEstimatedShippingTime', product.allowEstimatedShippingTime);
        formData.append('allowProductWholeSell', product.allowProductWholeSell);
        formData.append('allowProductMeasurement', product.allowProductMeasurement);
        formData.append('allowProductColors', product.allowProductColors);
        formData.append('stock', product.stock);
        formData.append('description', product.description);
        formData.append('buyReturnPolicy', product.buyReturnPolicy);
        formData.append('allowProductSEO', product.allowProductSEO);
        formData.append('price', product.price);
        formData.append('discountPrice', product.discountPrice);
        formData.append('youtubeUrl', product.youtubeUrl);
        formData.append('tags', product.tags);
    
        // Append the feature image
        if (featureImage) {
            formData.append('featureImage', featureImage); // Field name should match Multer config
        }
    
        // Append the gallery images
        if (Array.isArray(galleryImages)) {
            galleryImages.forEach((image) => {
                formData.append('galleryImages', image); // Field name should match Multer config
            });
        } else {
            console.error('galleryImages is not an array:', galleryImages);
        }
    
        // Send the request to the backend
        try {
            const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
            alert('Error creating product. Please try again.');
        }
    };
        return (
        <form onSubmit={handleSubmit} className="flex gap-8 p-8 font-sans text-gray-700">
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
                    />
                </div>

                <div>
                    <label className="block mb-2">Product Sku*</label>
                    <input
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly // Optional: Makes the SKU field read-only if you don't want the user to edit it
                    />
                    <button
                        type="button"
                        onClick={() => setProduct((prev) => ({ ...prev, sku: generateSKU() }))}
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Generate New SKU
                    </button>
                </div>

                <div>
                    <label className="block mb-2">Category*</label>
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
                    <label className="block mb-2">Sub Category*</label>
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
                    <label className="block mb-2">Child Category*</label>
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

                {/* Checkbox Options */}
                <div className=" w-1/2 space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowProductCondition"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Allow Product Condition</span>
                    </label>
                    
        <label>
            Allow Preorder
            <input
                type="checkbox"
                name="allowProductPreorder"
                checked={product.allowProductPreorder}
                onChange={handleChange}
            />
        </label>
    


                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowMinimumOrderQty"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Allow Minimum Order Qty</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="manageStock"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Manage Stock</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowEstimatedShippingTime"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Allow Estimated Shipping Time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowProductWholeSell"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Allow Product Whole Sell</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowProductMeasurement"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Allow Product Measurement</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="allowProductColors"
                            className="h-4 w-4 text-blue-600"
                            onChange={handleChange}
                        />
                        <span>Allow Product Colors</span>
                    </label>
                </div>

                <div>
                    <label className="block mb-2">Product Stock* (Leave Empty will Show Always Available)</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="e.g 20"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
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
                    />
                </div>
                <div>
                    <label className="block mb-2">Product Buy/Return Policy*</label>
                    <textarea
                        name="buyReturnPolicy"
                        value={product.buyReturnPolicy}
                        onChange={handleChange}
                        placeholder="Enter Product Buy/Return Policy"
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                    />
                </div>
                <div className=" ">
                <div>
        <label>
            Allow SEO
            <input
                type="checkbox"
                name="allowProductSEO"
                checked={product.allowProductSEO}
                onChange={handleChange}
            />
        </label>
    </div>
                </div>
            </div>
            {/* Right Section */}
            <div className="w-1/2 space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold">Feature Image *</h4>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="border border-gray-300 rounded-md p-4 flex justify-center items-center">
                            {/* <div
                                className="w-full h-72 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center"
                                id="landscape"
                            >
                                <input
                                    type="file"
                                    name="featureImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex border p-4 rounded-full bg-blue-900 items-center cursor-pointer"
                                >
                                    <FaUpload className="text-white mr-2" />
                                    <span className="text-white">Upload Image Here</span>
                                </label>
                            </div> */}
                            <div>
                                <label className="block mb-2">Product Gallery Images*</label>
                                <input
                                    type="file"
                                    name="featureImage"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block mb-2">Product Gallery Images*</label>
                    <input
                        type="file"
                        name="galleryImages"
                        multiple
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* <div>
          <label className="block mb-2">Product Description*</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
          />
        </div>

        <div>
          <label className="block mb-2">Product Buy/Return Policy*</label>
          <textarea
            name="buyReturnPolicy"
            value={product.buyReturnPolicy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
          />
        </div> */}
                <div>
                    <label className="block mb-2">Product Current Price* (In USD)</label>
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
                    <label className="block mb-2">Product Discount Price* (Optional)</label>
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
                    <label className="block mb-2">Youtube Video URL* (Optional)</label>
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
                    <div className="featured-keyword-area">
                        <div className="heading-area">
                            <h4 className="title">Feature Tags</h4>
                        </div>
                        <div className="feature-tag-top-fields" id="feature-section">
                            {featureTags.map((feature, index) => (
                                <div key={index} className="feature-area flex items-center justify-between mb-4">
                                    <span
                                        className="remove feature-remove cursor-pointer text-red-500"
                                        onClick={() => removeField(index)}
                                    >
                                        <i className="fas fa-times"></i>
                                    </span>
                                    <div className="w-full flex space-x-4">
                                        <div className="w-1/2">
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
                                        <div className="w-[20%] h-[70%]  ">
                                            <input
                                                type="color"
                                                name="colors[]"
                                                value={feature.color}
                                                onChange={(e) => handleColorChange(index, e)}
                                                className="w-full p-2 border h-[70%] border-gray-300 rounded-md"
                                                style={{
                                                    WebkitTapHighlightColor: 'transparent',
                                                    WebkitTextSizeAdjust: '30%',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a
                            href="javascript:;"
                            id="feature-btn"
                            onClick={addNewField}
                            className="add-field-btn text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            <i className="icofont-plus mr-2"></i>
                            Add More Field
                        </a>
                    </div>
                </div>
                <div>
                    <label className="block mb-2">Tags*</label>
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
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Create Product
                </button>
            </div>
        </form>
    );
};
export default PhysicalCreateProduct;
