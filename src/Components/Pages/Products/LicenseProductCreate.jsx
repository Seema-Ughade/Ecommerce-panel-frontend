import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LicenseProductCreate = () => {
    const [product, setProduct] = useState({
        productName: '',
        category: '',
        subCategory: '',
        childCategory: '',
        uploadType: 'file', // Default to file upload
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

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch subcategories based on selected category
    useEffect(() => {
        const fetchSubCategories = async () => {
            if (product.category) {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/subcategories?category=${product.category}`);
                    setSubCategories(response.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                }
            } else {
                setSubCategories([]);
                setChildCategories([]);
            }
        };

        fetchSubCategories();
    }, [product.category]);

    // Fetch child categories based on selected subcategory
    useEffect(() => {
        const fetchChildCategories = async () => {
            if (product.subCategory) {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/childcategories?subcategory=${product.subCategory}`);
                    setChildCategories(response.data);
                } catch (error) {
                    console.error('Error fetching child categories:', error);
                }
            } else {
                setChildCategories([]);
            }
        };

        fetchChildCategories();
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
            setProduct((prev) => ({ ...prev, galleryImages: Array.from(files) })); // Convert FileList to Array
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
        // Handle product submission logic
        console.log('Submitted product data:', product);
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
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Category*</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
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
                        required
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
                        required
                    >
                        <option value="">Select Child Category</option>
                        {childCategories.map((childCategory) => (
                            <option key={childCategory._id} value={childCategory._id}>
                                {childCategory.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Upload Type*</label>
                    <select
                        name="uploadType"
                        value={product.uploadType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="file">Upload By File</option>
                        <option value="url">Upload By URL</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">License Key*</label>
                    <input
                        type="text"
                        name="licenseKey"
                        value={product.licenseKey}
                        onChange={handleChange}
                        placeholder="Enter License Key"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
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
            </div>

            {/* Right Section */}
            <div className="w-1/3 space-y-4">
                <div>
                    <label className="block mb-2">Platform* (Optional)</label>
                    <input
                        type="text"
                        name="platform"
                        value={product.platform}
                        onChange={handleChange}
                        placeholder="Enter Platform"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2">Region* (Optional)</label>
                    <input
                        type="text"
                        name="region"
                        value={product.region}
                        onChange={handleChange}
                        placeholder="Enter Region"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2">License Type* (Optional)</label>
                    <input
                        type="text"
                        name="licenseType"
                        value={product.licenseType}
                        onChange={handleChange}
                        placeholder="Enter License Type"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2">Feature Image*</label>
                    <input
                        type="file"
                        name="featureImage"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Gallery Images*</label>
                    <input
                        type="file"
                        name="galleryImages"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Feature Tags Section */}
                <div>
                    <h2 className="mb-2 text-lg font-semibold">Feature Tags*</h2>
                    {product.featureTags.map((tag, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                name="tag"
                                value={tag.tag}
                                onChange={(e) => handleTagChange(index, e)}
                                placeholder="Tag"
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="color"
                                value={tag.color}
                                onChange={(e) => handleColorChange(index, e)}
                                className="border rounded"
                            />
                            <button type="button" onClick={() => removeField(index)} className="text-red-500">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addNewField} className="text-blue-500">
                        Add Tag
                    </button>
                </div>

                <div>
                    <label className="block mb-2">Price*</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter Price"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
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
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">YouTube URL* (Optional)</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={product.youtubeUrl}
                        onChange={handleChange}
                        placeholder="Enter YouTube URL"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button type="submit" className="w-full p-2 mt-4 bg-blue-600 text-white rounded">
                    Create Product
                </button>
            </div>
        </form>
    );
};

export default LicenseProductCreate;
