import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './price.css';

function Homepage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleTextSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.29.234:8000/text', { text }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      console.log(response.data);
      
      

      navigate('/analysis', { state: { originalData: { text, image }, anonymizedData: response.data } });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleImageSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('file', image, 'photo_2024-03-17_04-58-40.jpg');
      const response = await axios.post('http://192.168.29.234:8000/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      });
      console.log(response.data);
      navigate('/analysis', { state: { originalData: { text, image }, anonymizedData: response.data } });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="homepage-container">
      <div className="input-sections">
        <div className="input-section">
          <label className="input-label">Input Text:</label>
          <textarea
            className="text-area"
            value={text}
            onChange={handleTextChange}
            disabled={image !== null}
          />
          <button onClick={handleTextSubmit} disabled={!text || image}>
            Submit Text
          </button>
        </div>
        
        <div className="input-section">
          <label className="input-label">Upload Image:</label>
          <input
            className="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={text.trim() !== ''}
          />
          <button onClick={handleImageSubmit} disabled={!image || text}>
            Submit Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
