import React from 'react';
import './modal.css'
import Card from  '../card/card1'

const Modal = ({ handleCloseModal }) => {
    const receivedFilePairs = JSON.parse(sessionStorage.getItem('receivedFilePairs'));
  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2>Choose the file you want to De-Anonymize</h2>
        <div className="boxData">
        <Card fileData={receivedFilePairs}/>
        </div>
      </div>
    </div>
  );
};

export default Modal;
