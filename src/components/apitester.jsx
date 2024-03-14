import React, { useState } from 'react';
import axios from 'axios';
import photo from '../assets/back1.jpg'
const Apitester = () => {
  
  
  const handleSearch = (e) => {
        axios.post("https://sherlock-backend-4.onrender.com/filedata",
          {
            name:"shreyansh",
            textdata:"hello good morning to everyone",
            file:`${photo}`
          }
        ) .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        
      
    }

  
  

  return (
    <div>
      
      <div>
        <button onClick={handleSearch}>click me</button>
      </div>
      
    </div>
  );
};

export default Apitester;