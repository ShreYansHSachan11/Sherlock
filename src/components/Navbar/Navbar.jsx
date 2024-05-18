import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/folder.png'
import upload from '../../assets/upload.png'
import user from '../../assets/user.png'
import search from '../../assets/search.png'

const Navbar = () => {
  const navigate= useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Add scroll event listener when component mounts
        window.addEventListener("scroll", handleScroll);
        // Remove scroll event listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to handle scroll event
    const handleScroll = () => {
        // Check if user has scrolled down
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };


    
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const thankyou = localStorage.getItem('thankyou');

    if (token) {
      setIsLoggedIn(true);
      setUserName(username);
     } else {
      setIsLoggedIn(false);
      setUserName('');
      
    }
  }, [navigate]);

  const handleSignIn = () => {
    
      navigate('/register');
    
  };

  return (
  <>                     
                <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                    <div className="navbar-left">
                       
                        <h2 style={{color:"white"}}>HIDE</h2>
                    </div>
                    <div className="navbar-center">

                    <div style={{ margin: "10px" }}>
                        <NavLink
                             to="/"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Home
                        </NavLink>
                    </div>

                   
                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/anonymize"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Anonymize
                        </NavLink>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/deanonymize"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            De-Anonymize
                        </NavLink>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <NavLink
                             to="/dashboard"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Dashboard
                        </NavLink>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/guidelines"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Guidelines
                        </NavLink>
                    </div>

                   
                    </div>
                    <div className="navbar-right">
          {/* <img src={search} alt="" srcSet="" /> */}
          {/* <input className="input-field" type="text" placeholder='Search For Anything' /> */}
          {isLoggedIn ? (
            <button className="signin" disabled>
              {/* <img src={user} alt="" srcSet="" /> */}
              {userName}
            </button>
          ) : (
            <button className="signin" onClick={handleSignIn}>
              {/* <img src={user} alt="" srcSet="" /> */}
              Sign Up
            </button>
          )}
        </div>
                </div>
                
           
  </>
  );
};

export default Navbar;
