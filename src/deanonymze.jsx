import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './deanonymze.css';
import lottie from "lottie-web";
import loader from "./assets/analyzing.json";
import Card from './components/card/card1';

const DeanonymizePage = () => {
  const [filePairs, setFilePairs] = useState([]);
  const [selectedFilePair, setSelectedFilePair] = useState(null);
  const [originalFile, setOriginalFile] = useState('');
  const [deanonymizedFile, setDeanonymizedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');


  const dummyTexts = [
    'Fetching data',
    'Preparing content',
    'Analyzing information',
    'Loading assets',
    'Processing request'
  ];

  React.useEffect(() => {
    const animationContainer = document.querySelector("#loader");

    if (animationContainer && !animationContainer.querySelector("svg")) {
      lottie.loadAnimation({
        container: animationContainer,
        autoplay: true,
        animationData: { ...loader },
      });
    }
  }, [loading]);


  useEffect(() => {
    const fetchFilePairs = async () => {
      try {
        const user = sessionStorage.getItem('id');
        const response = await axios.get(`https://sherlock-backend-4.onrender.com/${user}`);
        const userData = response.data.user;
        setFilePairs(userData.filePairs || []);
        
      } catch (error) {
        console.error('Error fetching file pairs:', error);
      }
    };

    fetchFilePairs();
  }, []);

  const handleFilePairClick = async (filePairId) => {
    const selectedPair = filePairs.find(pair => pair.filePairId === filePairId);
    setSelectedFilePair(selectedPair);
    
    setLoading(true);
    
    try {
      setOriginalFile(selectedPair.report);
      const response = await axios.get(selectedPair.report, { responseType: 'blob' });
      


      const formData = new FormData();
      formData.append('file', response.data);
      const ocrResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_ML_API_KEY}/i2t`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
        },
      });
      const imageText = ocrResponse.data;

      const deAnoFormData = new FormData();
      deAnoFormData.append('text', imageText);
      deAnoFormData.append('entity_mapping', selectedPair.entity);

      const deAnoResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_ML_API_KEY}/de-ano`, deAnoFormData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      });

      setDeanonymizedFile(deAnoResponse.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="deanonymize-page">
      
      {!selectedFilePair && (
        <>
        <h2>Choose the file you want to De-Anonymize</h2>
        <Card fileData={filePairs} onFilePairClick={handleFilePairClick} />
        </>
      )}
      {selectedFilePair && (
        <div className="deanonymize-section">
         
         
          <div className='fileDataContainer'>
        <div className="input-sections">
          <div className="inputContainer">
        <h4>Report {`${selectedFilePair.filePairId}`}</h4>
        <div className="input-section">

          {originalFile && (
            <>
             
             
                <img src={originalFile} alt="Original File" />
                </>
               
             
            
          )}
           </div>
           </div>
           {loading ? (
          <><div className="loaderContainer">
          <div id="loader" style={{ width: 140, height: 100 }} />
          <p style={{color:"black"}}>{loadingText}</p></div></>
          
        ) : (<>
        <div className="inputContainer">
        <h4>Deanonymized File</h4>
           <div className="input-section">
          {deanonymizedFile && (
            <>
             
              {deanonymizedFile instanceof Blob && deanonymizedFile.type.includes('image') ? (
                <img src={URL.createObjectURL(deanonymizedFile)} alt="Deanonymized File" />
              ) : (
                <pre>{deanonymizedFile}</pre>
              )}
            </>
          )}
          </div>
          </div>
          </>
        )}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeanonymizePage;
