import React, { useState } from 'react';
import './apitester.css'
function TextAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [personalInfo, setPersonalInfo] = useState({});
  const [nameStart, setNameStart] = useState(0);
  const [nameEnd, setNameEnd] = useState(0);
  const [contactStart, setContactStart] = useState(0);
  const [contactEnd, setContactEnd] = useState(0);
  const [visibility, setVisibility] = useState({ name: true, contact: true });

  const analyzeText = async () => {
    const analyzedInfo = {
      name: [{ startIndex: nameStart, endIndex: nameEnd }],
      contact: [{ startIndex: contactStart, endIndex: contactEnd }],
    };
    setPersonalInfo(analyzedInfo);
  };

  const handleToggle = (group) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [group]: !prevVisibility[group],
    }));
  };

  const highlightText = (text) => {
    let highlightedText = text;
    Object.keys(personalInfo).forEach((group) => {
      const { startIndex, endIndex } = personalInfo[group][0];
      if (!visibility[group]) {
        const highlightedPart = '<span class="blurred">' + text.substring(startIndex, endIndex) + '</span>';
        highlightedText = highlightedText.replace(
          text.substring(startIndex, endIndex),
          highlightedPart
        );
      }
    });
    return { __html: highlightedText };
  };

  return (
    <div className='anonymizeSection'>
      <div className='anonymizeSection-upper'>
        
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            cols={50}
          />
       
       <div className="rightbox">
          <div dangerouslySetInnerHTML={highlightText(inputText)} />
          </div>
        </div>
     
      <div className='anonymizeSection-middle'>
        <div>
          <label>Name Start Index:</label>
          <input type="number" value={nameStart} onChange={(e) => setNameStart(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Name End Index:</label>
          <input type="number" value={nameEnd} onChange={(e) => setNameEnd(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Contact Start Index:</label>
          <input type="number" value={contactStart} onChange={(e) => setContactStart(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Contact End Index:</label>
          <input type="number" value={contactEnd} onChange={(e) => setContactEnd(parseInt(e.target.value))} />
        </div>
        
      </div>
      <div className='anonymizeSection-lower'>
      <button onClick={analyzeText}>Analyze Text</button>
        {Object.keys(personalInfo).map((group) => (
          <div className='toggle' key={group}>
            <button onClick={() => handleToggle(group)}>
              {visibility[group] ? `Hide ${group}` : `Show ${group}`}
            </button>
          </div>
        ))}
      </div>
      {/* Apply blur effect to hidden personal info */}
      <style>{`
        .blurred {
          filter: blur(4px);
        }
      `}</style>
    </div>
  );
}

export default TextAnalyzer;
