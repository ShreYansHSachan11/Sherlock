import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import lottie from "lottie-web";
import loader from "./assets/analyzing.json";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'; // Import rehype-raw
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './analysisPage.css';

function highlightEntities(text, entities, visibleEntities) {
  if (!Array.isArray(entities)) {
    // console.error("Entities is not an array.");
    return text;
  }

  let highlightedText = text;

  entities.forEach(entity => {
    const { start, end, entity_type } = entity;
    const isActive = visibleEntities.includes(entity_type);

    if (isActive) {
      const entityText = text.substring(start, end);
      const regex = new RegExp(escapeRegExp(entityText), 'g');
      highlightedText = highlightedText.replace(regex, `<span class="highlighted">${entityText}</span>`);
    }
  });

  return highlightedText;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function AnalysisPage() {
  const location = useLocation();
  const { state } = location;
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');
  const navigate = useNavigate();
  const [fileObject, setFileObject] = useState(null);

  const [visibleEntities, setVisibleEntities] = useState([]);
  const [anonymizedContent, setAnonymizedContent] = useState('No anonymized data received'); // Changed to string
  const [selectedOption, setSelectedOption] = useState('');
  const [responseText, setResponseText] = useState('');
  const [entityMapping, setEntityMapping] = useState('');
  const [filepair, setFilepair] = useState('');
  const [allentities, setAllentities] = useState('');
  

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

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress: undefined,
      theme: "dark",
    });
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(prevText => {
        const currentIndex = dummyTexts.indexOf(prevText);
        if (currentIndex === dummyTexts.length - 1) {
          return dummyTexts[0];
        } else {
          return dummyTexts[currentIndex + 1];
        }
      });
    }, 1000); // Change text every 1000 milliseconds

    // Clean up by clearing the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const convertTextToFile = () => {
    const file = new File([responseText], `anonymizedFile.txt`, { type: "text/plain" });
    setFileObject(file);
  };

  useEffect(() => {
    if(responseText) {
      sessionStorage.setItem('outputFile', responseText);
    }
    convertTextToFile();
  }, [responseText]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function handlePrint() {
    const printWindow = window.open('', '_blank');
    const encodedText = encodeHtml(responseText);
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Print Document</title>
        <style>
          body {
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
            white-space: pre-wrap;
            font-family:  Montserrat;
            font-size: 12px;
            margin:50px;
            text-align:justify;
          }
        </style>
      </head>
      <body>
        ${encodedText}
      </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }

  function encodeHtml(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function onSave() {
    toast.success(`File Saved Successfully!`);
  }

  const handleSubmit = async () => {
    if (!selectedOption) {
      alert('Please choose an anonymization type.');
      return;
    }

    try {
      const data = {
        text: state.originalData.text,
        entities: visibleEntities,
        type: selectedOption,
        all_entities: state.anonymizedData
      };
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_ML_API_KEY}/anonymize`, data);
      setResponseText(response.data.anonymized_text.text);
      setAnalyticsData(response.data.anonymized_text.text);
      const stringifiedEntityMapping = JSON.stringify(response.data.entity_mapping);
      setEntityMapping(stringifiedEntityMapping);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const updateFilePair = async () => {
    if (!entityMapping && !fileObject) {
      console.error("Entity mapping or file object is missing");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("entity", entityMapping);
      formData.append("status", "anonymized");
      formData.append("resultdata", fileObject);
      const filepairid = sessionStorage.getItem("filepairid");

      if (!filepairid) {
        console.error("File pair ID is missing");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_API_KEY}/update/filepair/${filepairid}`,
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

  const handleApiError = (error) => {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  };

  useEffect(() => {
    if (entityMapping && fileObject) {
      updateFilePair();
    }
  }, [fileObject]);

  useEffect(() => {
    if (state && state.anonymizedData) {
      const { text } = state.originalData;
      const anonymizedText = highlightEntities(text, state.anonymizedData, visibleEntities);
      setAnonymizedContent(anonymizedText);
    }
  }, [state, visibleEntities]);

  const handleToggleEntity = (entity) => {
    setVisibleEntities(prevVisibleEntities =>
      prevVisibleEntities.includes(entity)
        ? prevVisibleEntities.filter(item => item !== entity)
        : [...prevVisibleEntities, entity]
    );
  };

  let originalContent;
  if (state && state.originalData) {
    const text = state.originalData;
    originalContent = (
      <div>
        {text && <p>{text}</p>}
      </div>
    );
  } else {
    originalContent = <p>No original data received</p>;
  }

  let uniqueEntities = [];
  if (state && state.anonymizedData && Array.isArray(state.anonymizedData)) {
    uniqueEntities = Array.from(new Set(state.anonymizedData.map(entity => entity.entity_type)));
  }

  useEffect(() => {
    if (uniqueEntities.length > 0) {
      setVisibleEntities(uniqueEntities);
    }
  }, []);

  return (
    <div className="analysisPage">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {responseText ? (
        <div className='finalResult'>
          <div className="finaltext">
            {responseText}
          </div>
          <div className="finalResult-buttons">
            <button onClick={onSave} className="btn1">
              Save
            </button>
            <button onClick={handlePrint} className="btn1">
              Print
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>ANONYMIZER</h3>
          <div className="analysisPageSections">
            <div className="analysisPage-leftSection">
              <div className="dataBoxes">
                <div className="anonymizedData box">
                  <ReactMarkdown  className="markdown-content" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {anonymizedContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="analysisPage-rightSection">
              <div className="entitiesList">
                <div className="entitiesHeader">
                  <h6>Choose Entities to Anonymize</h6>
                </div>
                <div className="entitiesScrollBar">
                  <div className="entityButtonsContainer">
                    {uniqueEntities.map(entity => (
                      <button
                        key={entity}
                        onClick={() => handleToggleEntity(entity)}
                        className={`entityButton ${visibleEntities.includes(entity) ? 'active' : ''}`}
                      >
                        {entity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="anonymizedButtons">
                <select
                  name="anonymizationType"
                  id="anonymizationType"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  required
                >
                  <option value="" disabled>Choose Anonymization Type</option>
                  <option value="replace">Replace</option>
                  <option value="redact">Redact</option>
                 
                  <option value="faker">Faker</option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
          <><div className="loaderContainer">
          <div id="loader" style={{ width: 140, height: 100 }} />
          <p style={{color:"black"}}>{loadingText}</p></div></>
          
        ) : (<>
          <button className="btn1" onClick={handleSubmit}>
            SUBMIT
          </button>
          <button className="btn-analytics">Advanced analytics</button>
        </>
        )}
        </>
      )}
    </div>
  );
}

export default AnalysisPage;
