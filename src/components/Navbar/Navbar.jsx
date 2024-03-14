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
                        <img src={logo} alt="" srcSet="" />
                        <h2>HIDE</h2>
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
                            to="/about"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            About
                        </NavLink>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/contact"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Contact
                        </NavLink>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/services"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Services
                        </NavLink>
                    </div>

                    <div style={{ margin: "10px" }}>
                        <NavLink
                            to="/price"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "grey"
                                    : "white",
                            })}
                        >
                            Pricing
                        </NavLink>
                    </div>
                    </div>
                    <div className="navbar-right">
                     <button className="signin">
                       <img src={user} alt="" srcSet="" />
                        Sign in
                     </button>
                     <button className="dropfile">
                     <img src={upload} alt="" srcSet="" />
                        Drop File
                     </button>
                    </div>
                </div>
                
           
  </>
  );
};

export default Navbar;
