import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Contact from '../../contact';
import About from '../../about';
import Price from '../../price';
import Services from '../../analysisPage';
import Upload from '../fileuploader/upload';
import Apitester from '../apitester';
import ResultPage from '../ResultPage';
import Analysis from '../../analysisPage'

const Home = () => {
  const [analyzedText, setAnalyzedText] = useState('');

  const handleAnalysis = (text) => {
    setAnalyzedText(text);
  };

  return (
    <>
      <div className="homepage">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Apitester onAnalysis={handleAnalysis} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/price" element={<Price />} />
          <Route path="/services" element={<Services />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<ResultPage analyzedText={analyzedText} />} />
        </Routes>
        <div className="herocontent">
          <div className="herocontent-left">
           
          </div>
          <div className="herocontent-right"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
