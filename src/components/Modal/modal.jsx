import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './modal.css';
import Card from '../card/card1';

const Modal = ({ handleCloseModal }) => {
  const [filePairs, setFilePairs] = useState([]);
  const user = sessionStorage.getItem('id'); // Assuming user is stored in sessionStorage

  useEffect(() => {
    const fetchFilePairs = async () => {
      try {
        const response = await axios.get(`https://sherlock-backend-4.onrender.com/${user}`);
        const userData = response.data.user;
        setFilePairs(userData.filePairs || []);
      } catch (error) {
        console.error('Error fetching file pairs:', error);
      }
    };

    fetchFilePairs();
  }, [user]);

  const handleFilePairClick = (filePair) => {
    // Navigate to Deanonymize page with file pair data as URL parameter
    // For example:
    // window.location.href = `/deanonymize?filePairId=${filePair.filePairId}&inputFile=${filePair.inputFile}&resultdata=${filePair.resultdata}&status=${filePair.status}&sharedFrom=${filePair.sharedFrom}`;
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2>Choose the file you want to De-Anonymize</h2>
        <div className="boxData">
          <Card fileData={filePairs} onFilePairClick={handleFilePairClick} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
