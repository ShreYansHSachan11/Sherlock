import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './analysisPage.css';

function highlightEntities(text, entities, visibleEntities) {
  
  const sortedEntities = entities.sort((a, b) => a.start - b.start);

  let highlightedText = text;

  sortedEntities.forEach(entity => {
    const { start, end, entity_type } = entity;
    const isActive = visibleEntities.includes(entity_type);

    if (isActive) {
      const prefix = highlightedText.substring(0, start);
      const highlighted = highlightedText.substring(start, end);
      const suffix = highlightedText.substring(end);
      highlightedText = `${prefix}<span class="highlighted">${highlighted}</span>${suffix}`;
    }
  });

  return highlightedText;
}

function AnalysisPage() {
  const location = useLocation();
  const { state } = location;

  const [visibleEntities, setVisibleEntities] = useState([]);

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

  let anonymizedContent;
  if (state && state.anonymizedData) {
    const { text } = state.originalData;
    const anonymizedText = highlightEntities(text, state.anonymizedData, visibleEntities);
    anonymizedContent = (
      <div className="anonymizedDataField" dangerouslySetInnerHTML={{ __html: anonymizedText }}></div>
    );
  } else {
    anonymizedContent = <p>No anonymized data received</p>;
  }

  const uniqueEntities = Array.from(new Set(state.anonymizedData.map(entity => entity.entity_type)));

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
        <div className="toggleButtons">
          {uniqueEntities.map(entity => (
            <button
              key={entity}
              onClick={() =>
                setVisibleEntities(prevVisibleEntities =>
                  prevVisibleEntities.includes(entity)
                    ? prevVisibleEntities.filter(item => item !== entity)
                    : [...prevVisibleEntities, entity]
                )
              }
              className={`toggleButton ${visibleEntities.includes(entity) ? 'active' : ''}`}
            >
              {entity}
            </button>
          ))}
        </div>
      </div>
      </div>
      <div className="anonymizedButtons">
        <button className="btn1">Print</button>
        <button className="btn1">Download</button>
        <button className="btn1">Share</button>
      </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
