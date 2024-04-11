import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './analysisPage.css';

function highlightEntities(text, entities, visibleEntities) {
  if (!Array.isArray(entities)) {
    console.error("Entities is not an array.");
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

  const [visibleEntities, setVisibleEntities] = useState([]);
  const [anonymizedContent, setAnonymizedContent] = useState(<p>No anonymized data received</p>);
  const [selectedOption, setSelectedOption] = useState('replace');
  const [responseText, setResponseText] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        text: state.originalData.text,
        entities: visibleEntities,
        type: selectedOption
      };
      const response = await axios.post('https://amanetize-sherlock.hf.space/anonymize', data);
      setResponseText(response.data.text);
      console.log(response.data);
    
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  useEffect(() => {
    if (state && state.anonymizedData) {
      const { text } = state.originalData;
      const anonymizedText = highlightEntities(text, state.anonymizedData, visibleEntities);
      setAnonymizedContent(<div className="anonymizedDataField" dangerouslySetInnerHTML={{ __html: anonymizedText }}></div>);
    }
  }, [state, visibleEntities]);

  const handleToggleEntity = (entity) => {
    console.log("Toggling entity:", entity);
    setVisibleEntities(prevVisibleEntities =>
      prevVisibleEntities.includes(entity)
        ? prevVisibleEntities.filter(item => item !== entity)
        : [...prevVisibleEntities, entity]
    );
  };

  let originalContent;
  if (state && state.originalData) {
    const { text, image } = state.originalData;
    originalContent = (
      <div>
        {text && <p>{text}</p>}
        {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
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
  console.log("Visible entities:", visibleEntities);

  return (
    <div className="analysisPage">
    
      {responseText ? (
        
        <div className='finalResult'>
          <div className="finaltext">
          {responseText}
          </div>
          
          <div className="finalResult-buttons">
          <button className="btn1" >
          Save
        </button>

        <button className="btn1" >
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
                {/* <div className="originalData box">
                  <h3>Original Data</h3>
                  <div className="originalDataField">{originalContent}</div>
                </div> */}
                {/* <h3>Anonymized Data</h3> */}
                <div className="anonymizedData box">
                  {anonymizedContent}
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
                    {/* Map over uniqueEntities */}
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
                  defaultValue="replace"
                >
                  <option value="">Choose Anonymization Type</option>
                  <option value="replace">Replace</option>
                  <option value="redact">Redact</option>
                  <option value="hash">Hash</option>
                  <option value="faker">Faker</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn1" onClick={handleSubmit}>
            SUBMIT
          </button>
          </>
      )}
    
    </div>
  );
}
export default AnalysisPage;
