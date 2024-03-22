import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './analysisPage.css';

function highlightEntities(text, entities, visibleEntities) {
  if (!Array.isArray(entities)) {
    console.error("Entities is not an array.");
    return text; // Return unmodified text
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

// Function to escape special characters in regular expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function AnalysisPage() {
  const location = useLocation();
  const { state } = location;

  const [visibleEntities, setVisibleEntities] = useState([]);
  const [anonymizedContent, setAnonymizedContent] = useState(<p>No anonymized data received</p>);

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
    // Set all entities active initially
    if (uniqueEntities.length > 0) {
      setVisibleEntities(uniqueEntities);
    }
  }, []);
  console.log("Visible entities:", visibleEntities);

  return (
    <div className="analysisPage">
      <div className="analysisPage-leftSection">
        <div className="dataBoxes">
          <div className="originalData box">
            <h3>Original Data</h3>
            <div className="originalDataField">{originalContent}</div>
          </div>
          <div className="anonymizedData box">
            <h3>Anonymized Data</h3>
            {anonymizedContent}
          </div>
        </div>
       
      </div>
      <div className="analysisPage-rightSection">

      <div className="entitiesList">
        <h3>Entities</h3>
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
          <button className="btn1">Download</button>
          <button className="btn1">Share</button>
        </div>
        </div>
    </div>
  );
}

export default AnalysisPage;
