import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { TrashIcon } from '@heroicons/react/24/solid';

const PageComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPage, setNewPage] = useState({
        title: '',
        slug: '',
        description: '',
        seo: false,
        image: null,
    });
    const [editingPageId, setEditingPageId] = useState(null);
    const [pages, setPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await axios.get('https://ecommerce-panel-backend.onrender.com/api/pages');
                setPages(response.data);
            } catch (error) {
                toast.error('Error fetching pages. Please try again.');
                console.error('Error fetching pages:', error);
            }
        };
        fetchPages();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setNewPage((prevPage) => ({ ...prevPage, [name]: checked }));
        } else if (type === 'file') {
            setNewPage((prevPage) => ({ ...prevPage, [name]: files[0] }));
        } else {
            setNewPage((prevPage) => ({ ...prevPage, [name]: value }));
        }
    };

    const handleUpdatePage = async () => {
        try {
            const response = await axios.put(
                `https://ecommerce-panel-backend.onrender.com/api/pages/${editingPageId}`,
                newPage
            );
            setPages((prevPages) =>
                prevPages.map((page) => (page._id === editingPageId ? response.data : page))
            );
            setEditingPageId(null);
            setNewPage({ title: '', slug: '', description: '', seo: false, image: null });
            toast.success('Page updated successfully!');
        } catch (error) {
            toast.error('Error updating page. Please try again.');
            console.error('Error updating page:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newPage.title);
        formData.append('slug', newPage.slug);
        formData.append('description', newPage.description);
        formData.append('seo', newPage.seo);
        if (newPage.image) {
            formData.append('image', newPage.image);
        }

        try {
            const response = await axios.post('https://ecommerce-panel-backend.onrender.com/api/pages', formData);
            setPages((prev) => [...prev, response.data]);
            setNewPage({ title: '', slug: '', description: '', seo: false, image: null });
            setIsModalOpen(false);
            toast.success('Page created successfully!');
        } catch (error) {
            toast.error('Error creating page. Please try again.');
            console.error('Error creating page:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://ecommerce-panel-backend.onrender.com/api/pages/${id}`);
            setPages(pages.filter(page => page._id !== id));
            toast.success('Page deleted successfully!');
        } catch (error) {
            toast.error('Error deleting page. Please try again.');
            console.error('Error deleting page:', error);
        }
    };

    const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
    const currentPages = filteredPages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const handleHeaderChange = async (HeaderId, newHeader) => {
        try {
            const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/pages/${HeaderId}/Header`, { Header: newHeader });
            console.log('Updated Header:', response.data);

            // Update pages in the state
            setPages(prev =>
                prev.map(page => (page._id === HeaderId ? { ...page, Header: newHeader } : page))
            );
            toast.success('Header updated successfully!');

        } catch (error) {
            toast.error('Error updating header. Please try again.');
        }
    };

    const handleFooterChange = async (FooterId, newFooter) => {
        try {
            const response = await axios.put(`https://ecommerce-panel-backend.onrender.com/api/pages/${FooterId}/Footer`, { Footer: newFooter });
            console.log('Updated Footer:', response.data);

            // Update pages in the state
            setPages(prev =>
                prev.map(page => (page._id === FooterId ? { ...page, Footer: newFooter } : page))
            );
            toast.success('Footer updated successfully!');

        } catch (error) {
            toast.error('Error updating footer. Please try again.');
        }
    };





    return (
        <>
            <div className="content-area ">
                <h4 className="heading text-violet-600 text-2xl font-semibold mb-4">Pages</h4>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setEditingPageId(null);
                            setNewPage({ title: '', slug: '', description: '', seo: false, image: null });
                        }}
                        className="btn btn-primary rounded-2xl px-4 py-1 bg-violet-600 text-white hover:bg-violet-700 focus:outline-none"
                    >
                        + Add New Page
                    </button>
                </div>

                {/* Pages Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="bg-teal-400 text-white font-mono">
                                <th className="py-2 px-4 border">Image</th>
                                <th className="py-2 px-4 border">Title</th>
                                <th className="py-2 px-4 border">Header</th>
                                <th className="py-2 px-4 border">Footer</th>

                                <th className="py-2 px-4 border">Slug</th>
                                <th className="py-2 px-4 border">Description</th>
                                <th className="py-2 px-4 border">Options</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white border divide-gray-200">
                            {currentPages.map((page) => (
                                <tr key={page._id} className='hover:bg-gray-100 text-center'>
                                    <td className="py-2 px-4   border">
                                        {page.image ? <img src={page.image} alt={page.name} className="w-12 h-12 rounded" /> : '-'}
                                    </td>

                                    <td className="px-6 py-4 border">{page.title}</td>
                                    <td className="py-2 px-4 border">
                                        <select
                                            value={page.Header}
                                            onChange={(e) => handleHeaderChange(page._id, e.target.value)}
                                            className="border bg-pink-300 text-white rounded px-2 py-1"
                                            style={{
                                                backgroundColor: page.Header === "Showed" ? "#1e7e34" : "#bd2130",
                                                color: "white",
                                            }}
                                        >
                                            <option value="Showed">Showed</option>
                                            <option value="Not Showed">Not Showed</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <select
                                            value={page.Footer}
                                            onChange={(e) => handleFooterChange(page._id, e.target.value)}
                                            className="border bg-pink-300 text-white rounded px-2 py-1"
                                            style={{
                                                backgroundColor: page.Footer === "Showed" ? "#1e7e34" : "#bd2130",
                                                color: "white",
                                            }}
                                        >
                                            <option value="Showed">Showed</option>
                                            <option value="Not Showed">Not Showed</option>
                                        </select>
                                    </td>

                                    <td className="px-6 py-4 border">{page.slug}</td>
                                    <td className="px-6 py-4 border">{page.description}</td>
                                    <td className="py-2 flex justify-center px-4">
                                        <button
                                            onClick={() => {
                                                setEditingPageId(page._id);
                                                setNewPage({ title: page.title, slug: page.slug, description: page.description, seo: page.seo });
                                                setIsModalOpen(true);
                                            }}
                                            className="flex items-center rounded-2xl text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 focus:outline-none"
                                        >
                                            <EditOutlined className="h-5 w-5 mr-1" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(page._id)}
                                            className="flex items-center rounded-2xl text-white bg-red-600 hover:bg-red-700 ml-2 px-3 py-1 focus:outline-none"
                                        >
                                            <TrashIcon className="h-5 w-5 mr-1" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add New Page Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-semibold mb-4">{editingPageId ? 'Edit Page' : 'Add New Page'}</h2>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={newPage.title}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        id="slug"
                                        name="slug"
                                        value={newPage.slug}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={newPage.description}
                                        onChange={handleInputChange}
                                        required
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="seo"
                                        name="seo"
                                        checked={newPage.seo}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="seo" className="text-sm">Allow Page SEO</label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="block text-sm font-medium mb-1">Current Featured Image *</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleInputChange}
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {editingPageId ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        </>
    );
};

export default PageComponent;
