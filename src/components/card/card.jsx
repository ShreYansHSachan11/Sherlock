import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';
import fileIcon from "../../assets/dashboardFile.png";
import shareIcon from '../../assets/share.png';
import axios from "axios";

const Card = ({ fileData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [currentFilePairId, setCurrentFilePairId] = useState('');
  const [openFilePair, setOpenFilePair] = useState(null);
  const navigate = useNavigate();


  const handleShareClick = (filePairId) => {
    setCurrentFilePairId(filePairId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const useremail = sessionStorage.getItem("email");
      const formData = new FormData();
      formData.append("sharedFromEmail", useremail);
      formData.append("sharedToEmail", email);
      formData.append("filePairId", currentFilePairId);
      const response = await axios.post("https://sherlock-backend-4.onrender.com/share-file-pair", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('File shared successfully');
        setModalOpen(false);
      } else {
        console.error('Failed to share file');
      }
    } catch (error) {
      console.error('Error sharing file:', error);
    }
    updateFilePair();
  };

  const updateFilePair = async (filepairid) => {
    try {
      const formData = new FormData();
      
      formData.append("sharedFileEmail",email );
      
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API_KEY}/update/filepair/${currentFilePairId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("File pair updated successfully");
      } else {
        console.error(`Failed to update file pair. Status code: ${response.status}`);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const toggleFilePairDetails = (filePairId) => {
    setOpenFilePair(openFilePair === filePairId ? null : filePairId);
  };

  const getUniqueEmails = (emails) => {
    return Array.from(new Set(emails));
  };

  const handleFileClick = (fileUrl) => {
    navigate(`/file-viewer/${encodeURIComponent(fileUrl)}`);
  };

  return (    
    <div>
      {fileData.map((file, index) => (
        <div key={index} className="cards">
          <div className="card">
            <p>
              <span>{index + 1}.&nbsp;&nbsp;</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFilePairDetails(file.filePairId);
                }}
                className="file-link"
              >
                <img src={fileIcon} alt="File Icon" />
                {`file ${index+1}`}
              </a>
              
            </p>
            
            <p>{getUniqueEmails(file.sharedFileEmailsData).join(', ') || `Not Shared`}</p>
            <p>{file.date}</p>
          </div>
          
          {openFilePair === file.filePairId && (
            <div key={`${file.filePairId}-details`} className="details">
              <ul >
                <li>Input File: <a href="#" onClick={(e) => { e.preventDefault(); handleFileClick(file.inputFile); }}>input</a> </li>
                <li>Anonymized File: <a href="#" onClick={(e) => { e.preventDefault(); handleFileClick(file.resultdata); }}>Output</a><img src={shareIcon} className='share-icon' alt="Share Icon" onClick={() => handleShareClick(file.filePairId)} /></li>
                <li>Report: <a href="#" onClick={(e) => { e.preventDefault(); handleFileClick(file.report); }}>Report</a></li>
              </ul>
            </div>
          )}
        </div>
      ))}

      {modalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Share File</h2>
            <form className='form-container' onSubmit={handleSubmit}>
              <label>Receiver Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit">Share</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
