import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  

 

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const userRole = sessionStorage.getItem('role');
    
    if (token) {
      setIsLoggedIn(true);
      setUserName(username);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setRole('');
    }
    setIsLoading(false);  // Set loading to false after role is determined
  }, [navigate]);

  const handleSignIn = () => {
    navigate('/register');
  };

  const renderNavLinks = () => {
    if (role === 'nopolice') {
      return (
        <>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Home</NavLink>
          <NavLink to="/nonpolicedashboard" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Dashboard</NavLink>
          <NavLink to="/guidelines" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Guidelines</NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Home</NavLink>
          <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Dashboard</NavLink>
          <NavLink to="/anonymize" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Anonymize</NavLink>
          <NavLink to="/deanonymize" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>De-Anonymize</NavLink>
          <NavLink to="/guidelines" style={({ isActive }) => ({ color: isActive ? "#00C9B8" : "black" })}>Guidelines</NavLink>
        </>
      );
    }
  };

  if (isLoading) {
    return null;  // Or a loading spinner/placeholder
  }

  return (
    <>                     
      <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <h2 style={{color:"black"}}>HIDE</h2>
        </div>
        <div className="navbar-center">
          {renderNavLinks()}
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <button className="signin" disabled>
              {userName}
            </button>
          ) : (
            <button className="signin" onClick={handleSignIn}>
              Sign Up
            </button>
          )}
        </div>
      </div>
     
    </>
  );
};

export default Navbar;
