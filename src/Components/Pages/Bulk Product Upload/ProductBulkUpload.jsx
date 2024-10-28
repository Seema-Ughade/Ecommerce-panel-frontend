import React, { useState } from 'react';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons'; // Import Ant Design icon

const ProductBulkUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('csvfile', csvFile);
    formData.append('type', 'Physical'); // Change the type if necessary

    try {
      const response = await axios.post('https://your-backend-url.com/api/products/import', formData);
      setSuccessMessage('File uploaded successfully!');
      setErrorMessage('');
      console.log(response.data); // Handle success response
    } catch (error) {
      setErrorMessage('Error uploading file. Please try again.');
      setSuccessMessage('');
      console.error('Upload error:', error);
    }
  };

  const handleDownload = () => {
    // Link to your CSV file or trigger a download
    const link = document.createElement('a');
    link.href = 'https://your-backend-url.com/path/to/sample.csv'; // Replace with the actual URL of your CSV file
    link.setAttribute('download', 'sample.csv'); // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-5" style={{ fontFamily: "Open Sans, sans-serif", fontSize: "14px", color: "#465541" }}>
      <div className="relative">
        <div className="absolute inset-0 bg-gray-800 opacity-50 flex items-center justify-center">
          <LoadingOutlined className="text-white text-4xl" spin />
        </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-6 rounded-lg shadow-md">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">{successMessage}</span>
            <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage('')}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M10 9l-5 5m0-5l5 5m0-5l5-5m-5 5l5 5m-5-5l-5-5" />
              </svg>
            </button>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{errorMessage}</span>
            <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setErrorMessage('')}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M10 9l-5 5m0-5l5 5m0-5l5-5m-5 5l5 5m-5-5l-5-5" />
              </svg>
            </button>
          </div>
        )}

        <hr className="mb-4" />

        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="mb-2">
              <i className="fas fa-file-csv text-4xl"></i>
            </div>
            <h4 className="text-lg font-semibold">Upload a File *</h4>
          </div>

          {/* Download CSV Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            Download CSV
          </button>
        </div>
        
        <input
          type="file"
          id="csvfile"
          name="csvfile"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 border border-gray-300 rounded p-2 w-full"
        />

        <input type="hidden" name="type" value="Physical" />
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-200" type="submit">
            Start Import
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductBulkUpload;
