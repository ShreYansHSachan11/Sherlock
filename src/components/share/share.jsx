import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './share.css';

const SharePage = () => {
  const location = useLocation();
  const { filePairId, sharedFromId } = location.state;
  const [fileData, setFileData] = useState('');
  const [responseFile, setResponseFile] = useState(null);
  const [isImageFile, setIsImageFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State to manage upload status

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(`https://sherlock-backend-4.onrender.com/${sharedFromId}`);
        const file = response.data.user.filePairs.find(fp => fp.filePairId === filePairId);
        const fileUrl = file.resultdata;
        
        if (isImage(fileUrl)) {
          setIsImageFile(true);
          setFileData(fileUrl);
        } else {
          const textResponse = await axios.get(fileUrl);
          setIsImageFile(false);
          setFileData(textResponse.data);
        }
      } catch (error) {
        console.error('Error fetching file data:', error);
      }
    };

    fetchFileData();
  }, [filePairId, sharedFromId]);

  const handleFileChange = (e) => {
    setResponseFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!responseFile) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploading(true); // Disable the button and show "Pending"

    const formData = new FormData();
    formData.append('report', responseFile);

    try {
      await axios.post(`https://sherlock-backend-4.onrender.com/update/filepair/${filePairId}`, formData);
      alert('File uploaded and sent successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false); // Re-enable the button and reset text
    }
  };

  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  return (
    <div className="share-page">
      <div className="file-display">
        <h3>Received File</h3>
        {isImageFile ? (
          <img src={fileData} alt="Received file" />
        ) : (
          <pre className='recievedText'>{fileData}</pre>
        )}
      </div>
      <div className="upload-section">
        <h3>Upload Response File</h3>
        <div className="upload">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Pending...' : 'Send Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
