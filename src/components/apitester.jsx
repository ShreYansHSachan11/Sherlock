import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './apitester.css';

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
    history.push({
      pathname: '/result',
      state: { inputText: inputText }
    });
  };

  const handleToggle = (group) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [group]: !prevVisibility[group],
    }));
  };

  return (
    <div className='anonymizeSection'>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        cols={50}
      />
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
        <button onClick={analyzeText}><NavLink to={{ pathname: "/result", state: { inputText } }}>Analyze Text</NavLink></button>
        {Object.keys(personalInfo).map((group) => (
          <div className='toggle' key={group}>
            <button onClick={() => handleToggle(group)}>
              {visibility[group] ? `Hide ${group}` : `Show ${group}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextAnalyzer;
