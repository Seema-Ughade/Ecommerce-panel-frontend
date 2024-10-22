import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const DigitalProductCreate = () => {
    const [product, setProduct] = useState({
        productName: '',
        sku: '',
        category: '',
        subCategory: '',
        childCategory: '',
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
        allowProductCondition: false,
        allowProductPreorder: false,
        manageStock: false,
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

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

        // // Append feature image if provided
        // if (product.featureImage && product.featureImage[0]) {
        //     formData.append('featureImage', product.featureImage[0]);
        // }
        if (product.featureImage) {
            formData.append('featureImage', product.featureImage);
        }
        
        // Append gallery images if provided
        if (product.galleryImages) {
            Array.from(product.galleryImages).forEach((image, index) => {
                formData.append(`galleryImages[${index}]`, image);
            });
        }

        // Append feature tags
        product.featureTags.forEach((tag, index) => {
            formData.append(`featureTags[${index}][tag]`, tag.tag);
            formData.append(`featureTags[${index}][color]`, tag.color);
        });
if (product.featureImage) {
    formData.append('featureImage', product.featureImage);
}

        try {
            // Replace with your API endpoint
            const response = await fetch('https://ecommerce-panel-backend.onrender.com/api/DigitalProducts', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                const result = await response.json();
                alert('Product created successfully!');
                console.log(response.data.message); // Adjust this to match your API's response structure

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
                    featureTags: [],
                    featureImage: null,
                    galleryImages: [],
                });
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            const response = await error.response.text(); // Get the text response

            console.error('Error creating product:', response);
            alert('An error occurred while creating the product.');
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
                
                {/* Category, Sub Category, Child Category */}
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

                {/* Text Areas */}
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
                        placeholder="Enter Product Buy/Return Policy "
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={5}
                    />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
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
                <div>
                    <label className="block mb-2">Feature Image*</label>
                    <input
                        type="file"
                        name="featureImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
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

                {/* Feature Tags */}
                <div className="col-lg-12">
                    <h4 className="text-lg font-semibold">Feature Tags</h4>
                    <div>
                        {product.featureTags.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-4 mb-4">
                                <input
                                    type="text"
                                    name="tag"
                                    value={feature.tag}
                                    onChange={(e) => handleTagChange(index, e)}
                                    placeholder="Enter Your Keyword"
                                    className="w-1/2 p-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="color"
                                    value={feature.color}
                                    onChange={(e) => handleColorChange(index, e)}
                                    className="w-12 h-10"
                                />
                                <button
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => removeField(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="text-blue-500"
                            onClick={addNewField}
                        >
                            Add More Field
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Create Product
                </button>
            </div>
        </form>
    );
};

export default DigitalProductCreate;



