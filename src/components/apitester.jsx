import React, { useState } from 'react';
import axios from 'axios';
import photo from '../assets/back1.jpg'
const Apitester = () => {
  
       
  const handleSearch = (e) => {
  const formData = new FormData();
  
  // Append file, name, and textdata to the FormData object
  formData.append('file', photo);
  formData.append('name', 'shreyansh');
  formData.append('textdata', 'hello good morning to everyone');

  // Make a POST request using FormData
  axios.post("https://sherlock-backend-4.onrender.com/filedata", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(function (response) {
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