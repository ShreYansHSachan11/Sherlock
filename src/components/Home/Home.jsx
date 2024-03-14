import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './Home.css';
import Navbar from '../Navbar/Navbar';
import Contact from '../../contact';
import About from '../../about';
import Price from '../../price';
import Services from '../../services'
import Upload from '../fileuploader/upload'
import Apitester from '../apitester'
const Home = () => {
  return (
    <>
    <div className="homepage">
      <Navbar />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/price" element={<Price />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <div className="herocontent">
        <div className="herocontent-left">
        <div className="dropzone">
        <Upload/>
      </div>
        </div>
        <div className="herocontent-right">
        
        </div>
        
      </div>
      
      
    </div>
      
    </>
  );
};

export default Home;
