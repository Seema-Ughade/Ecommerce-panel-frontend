import React, { useState } from 'react';
import axios from 'axios';
import mainlogo from '../../../assets/mainlogo.png';

const LogoUpload = () => {
  const [headerLogo, setHeaderLogo] = useState(null);
  const [footerLogo, setFooterLogo] = useState(null);
  const [invoiceLogo, setInvoiceLogo] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (type === 'header') setHeaderLogo(file);
    if (type === 'footer') setFooterLogo(file);
    if (type === 'invoice') setInvoiceLogo(file);
  };

  const handleSubmit = async (event, type) => {
    event.preventDefault();
    const formData = new FormData();

    // Append the appropriate logo based on the type
    if (type === 'header') {
      formData.append('logo', headerLogo);
    } else if (type === 'footer') {
      formData.append('footer_logo', footerLogo);
    } else if (type === 'invoice') {
      formData.append('invoice_logo', invoiceLogo);
    }

    try {
      const response = await axios.post('/admin/general-settings/update/all', formData);
      setSuccessMessage(`Successfully uploaded ${type} logo!`);
      setErrorMessage('');
      console.log(response.data);
    } catch (error) {
      setErrorMessage(`Error uploading ${type} logo. Please try again.`);
      setSuccessMessage('');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Header Logo */}
          <div className="bg-gray-100 p-5 border border-gray-300 rounded-lg">
            <h4 className="text-lg font-semibold text-center mb-4">Header Logo</h4>
            <form onSubmit={(event) => handleSubmit(event, 'header')} className="uplogo-form">
              {successMessage && <div className="alert alert-success mb-4 text-green-600">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger mb-4 text-red-600">{errorMessage}</div>}
              <div className="mb-4">
                <img src={mainlogo} alt="Current Header Logo" className="max-w-[240px] h-auto mb-2" />
              </div>
              <input type="file" className="block w-full mb-4 border border-gray-300 rounded-md" onChange={(event) => handleFileChange(event, 'header')} />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
            </form>
          </div>

          {/* Footer Logo */}
          <div className="bg-gray-100 p-5 border border-gray-300 rounded-lg">
            <h4 className="text-lg font-semibold text-center mb-4">Footer Logo</h4>
            <form onSubmit={(event) => handleSubmit(event, 'footer')} className="uplogo-form">
              {successMessage && <div className="alert alert-success mb-4 text-green-600">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger mb-4 text-red-600">{errorMessage}</div>}
              <div className="mb-4">
                <img src={mainlogo} alt="Current Footer Logo" className="max-w-[240px] h-auto mb-2" />
              </div>
              <input type="file" className="block w-full mb-4 border border-gray-300 rounded-md" onChange={(event) => handleFileChange(event, 'footer')} />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
            </form>
          </div>

          {/* Invoice Logo */}
          <div className="bg-gray-100 p-5 border border-gray-300 rounded-lg">
            <h4 className="text-lg font-semibold text-center mb-4">Invoice Logo</h4>
            <form onSubmit={(event) => handleSubmit(event, 'invoice')} className="uplogo-form">
              {successMessage && <div className="alert alert-success mb-4 text-green-600">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger mb-4 text-red-600">{errorMessage}</div>}
              <div className="mb-4">
                <img src={mainlogo} alt="Current Invoice Logo" className="max-w-[240px] h-auto mb-2" />
              </div>
              <input type="file" className="block w-full mb-4 border border-gray-300 rounded-md" onChange={(event) => handleFileChange(event, 'invoice')} />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
