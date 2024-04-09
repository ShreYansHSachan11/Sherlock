import React, { useState } from 'react';
import { BrowserRouter as Router,NavLink, Routes, Route } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/folder.png'
import upload from '../../assets/upload.png'
import user from '../../assets/user.png'
const Navbar = () => {
  

  return (
  <>                     
                <div className='navbar'>
                    <div className="navbar-left">
                        {/* <img src={logo} alt="" srcSet="" /> */}
                        <h2>HIDE</h2>
                    </div>
                    <div className="navbar-center">
                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "black",
                            })}
                        >
                            Home
                        </NavLink>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/about"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "black",
                            })}
                        >
                            Analyze
                        </NavLink>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/contact"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "black",
                            })}
                        >
                            Anonymize
                        </NavLink>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/services"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "black",
                            })}
                        >
                            Help
                        </NavLink>
                    </div>

                   
                    </div>
                    <div className="navbar-right">
                     <button className="signin">
                       {/* <img src={user} alt="" srcSet="" /> */}
                        Sign In
                     </button>
                    
                    </div>
                </div>
                
           
  </>
  );
};

export default Navbar;
