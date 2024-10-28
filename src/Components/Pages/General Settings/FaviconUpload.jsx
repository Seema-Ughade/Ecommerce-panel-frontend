import React, { useState } from 'react';
import axios from 'axios';
import mainlogo from '../../../assets/mainlogo.png';

const FaviconUpload = () => {
  const [favicon, setFavicon] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFavicon(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('favicon', favicon);

    try {
      const response = await axios.post('https://ecommerce-panel-backend.onrender.com/admin/general-settings/update/all', formData);
      setSuccessMessage('Favicon uploaded successfully!');
      setErrorMessage('');
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Error uploading favicon. Please try again.');
      setSuccessMessage('');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="add-logo-area" style={{ padding: '30px', background: '#fff', textAlign: 'center' }}>
      <div className="gocover" ></div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {successMessage && (
            <div className="alert alert-success alert-dismissible validation">
              <button type="button" className="close alert-close" onClick={() => setSuccessMessage('')}>×</button>
              <p className="text-left">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger alert-dismissible validation">
              <button type="button" className="close alert-close" onClick={() => setErrorMessage('')}>×</button>
              <ul className="text-left">
                <li>{errorMessage}</li>
              </ul>
            </div>
          )}
          
          <form className="" onSubmit={handleSubmit} >
            <div className="current-logo flex justify-center items-center">
              <h4 className="title">Current Favicon :</h4>
              <img src={mainlogo} alt="Current Favicon"  className='max-w-60 h-auto   '/>
            </div>
            <div className="set-logo">
              <h4 className="title">Set New Favicon :</h4>
              <input className="img-upload1" type="file" name="favicon" onChange={handleFileChange} />
            </div>
            <div className="">
              <button type="submit" className="submit-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FaviconUpload;
