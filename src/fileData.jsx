import React, { useState, useEffect } from 'react';
import './fileData.css';
import lottie from "lottie-web";
import { useLocation, useNavigate } from 'react-router-dom';
import loader from "./assets/analyzing.json";

const FileData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { inputFile, outputFile } = location.state || { inputFile: '', outputFile: '' };

  useEffect(() => {
    console.log("Input File URL: ", inputFile);
    console.log("Output File URL: ", outputFile);
  }, [inputFile, outputFile]);

  const [loading, setLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const dummyTexts = [
    'Fetching data',
    'Preparing content',
    'Analyzing information',
    'Loading assets',
    'Processing request'
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingTextIndex(prevIndex => (prevIndex + 1) % dummyTexts.length);
      }, 1000);
        
      setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const animation = lottie.loadAnimation({
        container: document.getElementById("loader"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loader,
      });

      return () => animation.destroy();
    }
  }, [loading]);

  // Function to check if the URL points to an image
  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  return (
    <div className="fileDataPage">
      <div className='fileDataContainer'>
        <div className="input-sections">
          <div className="input-section">
            <h4>Original</h4>
            {isImage(inputFile) ? (
              <img src={inputFile} alt="Original file" />
            ) : (
              <iframe  src={inputFile} title="Original file" />
            )}
          </div>
          {loading ? (
            <div className="loaderContainer">
              <div id="loader" style={{ width: 140, height: 100 }} />
              <p style={{ color: "black" }}>{dummyTexts[loadingTextIndex]}</p>
            </div>
          ) : (
            <>
              <div className="input-section">
                <h4>Anonymized</h4>
                {isImage(outputFile) ? (
                  <img src={outputFile} alt="Anonymized file" />
                ) : (
                  <iframe src={outputFile} style={{"height":"430px", "width":"400px" , "WebkitScrollSnapType":"block"}} title="Anonymized file" />
                )}
              </div>
              <div className="buttonSection">
                <button className="btn1" onClick={() => navigate(-1)}>
                  Back To Files
                </button>
                <button className="btn1">
                  Share
                </button>
                <button className="btn1">
                  Print
                </button>
                <button className="btn1">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileData;
