import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css'
import Card from './components/card/card';
import Card1 from './components/card/card1';
const dashboard = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const [filePairs, setFilePairs] = useState([]);
  const [receivedFilePairs, setReceivedFilePairs] = useState([]);
 

      useEffect(() => {
        // Retrieve old data from local storage
        const storedFilePairs = JSON.parse(sessionStorage.getItem('filePairs')) || [];
        const storedReceivedFilePairs = JSON.parse(sessionStorage.getItem('receivedFilePairs')) || [];
        setFilePairs(storedFilePairs);
        setReceivedFilePairs(storedReceivedFilePairs);
    
        const fetchData = async () => {
          try {
            const id = sessionStorage.getItem('id');
            const response = await axios.get(`https://sherlock-backend-4.onrender.com/${id}`);
            const newFilePairs = response.data.user.filePairs;
            const newReceivedFilePairs = response.data.user.sharedFilePairs;
    
            // Update state with new data
            setFilePairs(newFilePairs);
            setReceivedFilePairs(newReceivedFilePairs);
    
            // Store new data in local storage
            sessionStorage.setItem('filePairs', JSON.stringify(newFilePairs));
            sessionStorage.setItem('receivedFilePairs', JSON.stringify(newReceivedFilePairs));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);


  return (
    <div className='dashboardPage'>
        <div className="dashboardContent">

        
        <div className="dashboardHeader">
            <h3>Hi,&nbsp;&nbsp;&nbsp;{username} </h3>
            {/* <button className='dashButton'>
                +Add New
            </button> */}
        </div>

        <div className="dashboardPage-fileContainer">
            <h5>
                Files
            </h5>
            <div className="dashboardPage-fileContainer-box">
                <div className="boxHeader">
                   <p>Name</p>
                <p>Shared</p>
                
                <p>Date</p> 
                </div>
                <div className="boxData">
               <Card fileData={filePairs} />
                </div>
            </div>

        </div>

        

        </div>
    </div>
  )
}

export default dashboard