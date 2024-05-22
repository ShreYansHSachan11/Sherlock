import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Homepage from "../../homepage";
import About from '../../about';
import Price from '../../price';
import Guidelines from '../../guidelines';
import Analysis from '../../analysisPage';
import ResultPage from '../ResultPage';
import Dashboard from '../../dashboard';
import Register from '../../register';
import Login from '../../login';
import FileData from '../../fileData';
import Deanonymize from '../../deanonymze';
import RequireLogin from './requireLogin';
import NonPoliceDashboard from '../../nonpolicedashboard'; // Import the new component
import Share from '../../components/share/share'

const Home = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    setRole(userRole);
  }, []);

  const renderRoutes = () => {
    if (role === "nopolice") {
      return (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/nonpolicedashboard" element={<RequireLogin><NonPoliceDashboard /></RequireLogin>} />
          <Route path="/guidelines" element={<RequireLogin><Guidelines /></RequireLogin>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/share/:filePairId" element={<RequireLogin><Share /></RequireLogin>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<RequireLogin><About /></RequireLogin>} />
          <Route path="/anonymize" element={<RequireLogin><Price /></RequireLogin>} />
          <Route path="/guidelines" element={<RequireLogin><Guidelines /></RequireLogin>} />
          <Route path="/analysis" element={<RequireLogin><Analysis /></RequireLogin>} />
          <Route path="/result" element={<RequireLogin><ResultPage /></RequireLogin>} />
          <Route path="/dashboard" element={<RequireLogin><Dashboard /></RequireLogin>} />
          <Route path="/fileData" element={<RequireLogin><FileData /></RequireLogin>} />
          <Route path="/deanonymize" element={<RequireLogin><Deanonymize /></RequireLogin>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
  };

  return (
    <div className="homepage">
      <Navbar />
      {renderRoutes()}
    </div>
  );
};

export default Home;
