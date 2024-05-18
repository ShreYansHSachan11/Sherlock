import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';
import fileicon from "../../assets/dashboardFile.png";
import share from '../../assets/share.png';
import axios from "axios";

const Card = ({ fileData }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const handleNavigate = (event, inputFile, outputFile) => {
    event.preventDefault();
    navigate('/filedata', {
      state: { inputFile, outputFile },
    });
  };

  const handleShareClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform API call to share file
    // Example: Replace the API_URL with your actual API endpoint
    try {
      const formData = new FormData();
      formData.append("sharedFrom", "662e1ef729d9d5b79f4f902e");
      formData.append("sharedTo", "66475e2110ab777145b8da82");
      formData.append("filePairId", "123123");
      const response =  await axios.post("https://sherlock-backend-4.onrender.com/share-file-pair",
      formData,
       {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
      if (response.ok) {
        console.log('File shared successfully');
        // Close the modal after successful sharing
        setModalOpen(false);
      } else {
        console.error('Failed to share file');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  return (
    <div>
      {fileData.map((file, index) => (
        <div key={index} className="card">
          {/* <img src={fileicon} alt="" /> */}
          <p>
          <span>{index + 1}.&nbsp; &nbsp; </span>
            <a
              href="/filedata"
              onClick={(event) => handleNavigate(event, file.inputFile, file.resultdata)}
              className="file-link"
            >
              {file.filePairId}
            </a>
            
            <img src={share} className='shareicon' alt="" onClick={handleShareClick} />
          </p>
          <p>{file.shared}</p>
          <p>{file.status}</p>
          <p>{new Date(file.lastModified).toLocaleDateString()}</p>
        </div>
      ))}
      {/* Modal for sharing */}
      {modalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Share File</h2>
            <form  className='form-container' onSubmit={handleSubmit}>
              <label>Reciever Email:</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
             
              <button type="submit">Share</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
