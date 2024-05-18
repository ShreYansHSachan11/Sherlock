import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route,  Navigate } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Contact from '../../contact';
import About from '../../about';
import Price from '../../price';
import Services from '../ResultPage';
import Upload from '../fileuploader/upload';
// import Apitester from '../apitester';
import ResultPage from '../ResultPage';
import Analysis from '../../analysisPage'
import Dashboard from '../../dashboard'
import Register from '../../register'
import Login from '../../login'
import FileData from '../../fileData'
import Deanonymize from '../../deanonymze'
import RequireLogin from './requireLogin';
import Homepage from "../../homepage";


const Home = () => {
  return (
    <>
      <div className="homepage">
        <Navbar />
        <Routes>
        
          <Route path="/" element={ <Homepage/>}/>
          <Route path="/analyze" element={<RequireLogin> <About/> </RequireLogin>} />
          <Route path="/anonymize" element={<RequireLogin> <Price/> </RequireLogin>} />
          <Route path="/guidelines" element={<RequireLogin> <Services/> </RequireLogin>} />
          
          <Route path="/analysis" element={<RequireLogin> <Analysis/> </RequireLogin>} />
          <Route path="/result" element={<RequireLogin> <ResultPage/> </RequireLogin>} />
          <Route path="/dashboard" element={<RequireLogin> <Dashboard/> </RequireLogin>} />
          <Route path="/fileData" element={<RequireLogin> <FileData/> </RequireLogin>} />
          <Route path="/deanonymize" element={<RequireLogin> <Deanonymize/> </RequireLogin>} />
         
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </>
  );
};

export default Home;