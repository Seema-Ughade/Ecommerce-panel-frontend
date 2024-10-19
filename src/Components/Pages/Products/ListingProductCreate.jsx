import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingProductCreate = () => {
    const [product, setProduct] = useState({
        productName: '',
        sku: '',
        category: '',
        subCategory: '',
        childCategory: '',
        allowProductCondition: false,
        allowProductPreorder: false,
        allowMinimumOrderQty: false,
        allowEstimatedShippingTime: false,
        allowProductColors: false,
        allowProductSizes: false,
        allowProductWholeSell: false,
        allowProductMeasurement: false,
        manageStock: false,
        stock: '',
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
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    // Fetch categories, subcategories, and child categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    'https://ecommerce-panel-backend.onrender.com/api/categories'
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle product submission logic, e.g., sending data to the server
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
                    <label className="block mb-2">Product SKU*</label>
                    <input
                        type="text"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        placeholder="Enter Product SKU"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Category, Sub Category, Child Category */}
                <div>
                    <label className="block mb-2">Category*</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Category</option>
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
                        <option value="">Select Sub Category</option>
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
                        <option value="">Select Child Category</option>
                        {childCategories.map((childCategory) => (
                            <option key={childCategory._id} value={childCategory._id}>
                                {childCategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Checkboxes for product options */}
                <div className="space-y-2">
                    {[
                        { name: 'allowProductCondition', label: 'Allow Product Condition' },
                        { name: 'allowProductPreorder', label: 'Allow Product Preorder' },
                        { name: 'allowMinimumOrderQty', label: 'Allow Minimum Order Qty' },
                        { name: 'allowEstimatedShippingTime', label: 'Allow Estimated Shipping Time' },
                        { name: 'allowProductColors', label: 'Allow Product Colors' },
                        { name: 'allowProductSizes', label: 'Allow Product Sizes' },
                        { name: 'allowProductWholeSell', label: 'Allow Product Whole Sell' },
                        { name: 'allowProductMeasurement', label: 'Allow Product Measurement' },
                        { name: 'manageStock', label: 'Manage Stock' },
                    ].map((checkbox) => (
                        <label key={checkbox.name} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name={checkbox.name}
                                checked={product[checkbox.name]}
                                onChange={handleChange}
                                className="h-4 w-4"
                            />
                            <span>{checkbox.label}</span>
                        </label>
                    ))}
                </div>

                <div>
                    <label className="block mb-2">Product Stock*</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="e.g 20 (Leave Empty will Show Always Available)"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Text Areas for Description and Policy */}
                <div>
                    <label className="block mb-2">Product Description*</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Font Size... Font Family... Font Format..."
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
                        placeholder="Font Size... Font Family... Font Format..."
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                    />
                </div>

                {/* Price and Discount Price */}
                <div>
                    <label className="block mb-2">Product Price*</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter Product Price"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Discount Price*</label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={product.discountPrice}
                        onChange={handleChange}
                        placeholder="Enter Discount Price"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* SEO Fields */}
                <div>
                    <label className="block mb-2">YouTube URL*</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={product.youtubeUrl}
                        onChange={handleChange}
                        placeholder="Enter YouTube URL"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Tags*</label>
                    <input
                        type="text"
                        name="tags"
                        value={product.tags}
                        onChange={handleChange}
                        placeholder="Enter Tags (comma separated)"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Feature Image*</label>
                    <input
                        type="file"
                        name="featureImage"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Gallery Images*</label>
                    <input
                        type="file"
                        name="galleryImages"
                        onChange={handleFileChange}
                        multiple
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Feature Tags */}
                <div>
                    <label className="block mb-2">Feature Tags</label>
                    {product.featureTags.map((tag, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                name="tag"
                                value={tag.tag}
                                onChange={(e) => handleTagChange(index, e)}
                                placeholder="Enter Tag"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="color"
                                value={tag.color}
                                onChange={(e) => handleColorChange(index, e)}
                                className="w-12 h-12 ml-2 border border-gray-300 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addNewField}
                        className="text-blue-500"
                    >
                        Add Tag
                    </button>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="allowProductSEO"
                        checked={product.allowProductSEO}
                        onChange={handleChange}
                        className="h-4 w-4 mr-2"
                    />
                    <label>Allow Product SEO</label>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit Product
                </button>
            </div>
        </form>
    );
};

export default ListingProductCreate;
