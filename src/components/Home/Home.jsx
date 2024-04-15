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

const ProtectedRoute = ({ element, ...props }) => {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("token") !== null;
  // If user is logged in, render the specified element, otherwise redirect to login page
  return isLoggedIn ? <Route {...props} element={element} /> : <Navigate to="/login" />;
};

const Home = () => {
  return (
    <>
      <div className="homepage">
        <Navbar />
        <Routes>
          {/* Protected routes require authentication */}
          <Route path="/" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/analyze" element={<ProtectedRoute element={<About />} />} />
          <Route path="/anonymize" element={<ProtectedRoute element={<Price />} />} />
          <Route path="/guidelines" element={<ProtectedRoute element={<Services />} />} />
          <Route path="/analysis" element={<ProtectedRoute element={<Analysis />} />} />
          <Route path="/result" element={<ProtectedRoute element={<ResultPage />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/fileData" element={<ProtectedRoute element={<FileData />} />} />
          <Route path="/deanonymize" element={<ProtectedRoute element={<Deanonymize/>}/>} />
          {/* Unprotected routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </>
  );
};

export default Home;