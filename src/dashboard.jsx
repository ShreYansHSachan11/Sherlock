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
        const handleBackButton = () => {
          // Navigate to the home page when clicking the browser's back button
          navigate('/');
        };
    
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', handleBackButton);
    
        // Clean up the event listener
        return () => {
          window.removeEventListener('popstate', handleBackButton);
        };
      }, [navigate]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://sherlock-backend-4.onrender.com/662e1ef729d9d5b79f4f902e');
            setFilePairs(response.data.user.filePairs);
            setReceivedFilePairs(response.data.user.sharedFilePairs); // Assuming sharedFilePairs are received files
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const recievedfileData = [
        {
          filename: 'Response.txt',
          status: 'Anonymized',
          shared: 'forensic',
          lastModified: '2024-04-13'
        },
      ];


  return (
    <div className='dashboardPage'>
        <div className="dashboardContent">

        
        <div className="dashboardHeader">
            <h3>Hi,&nbsp;&nbsp;&nbsp;{username} </h3>
            <button className='dashButton'>
                +Add New
            </button>
        </div>

        <div className="dashboardPage-fileContainer">
            <h5>
                Your Files
            </h5>
            <div className="dashboardPage-fileContainer-box">
                <div className="boxHeader">
                   <p>Name</p>
                <p>Shared</p>
                <p>Status</p>
                <p>View</p> 
                </div>
                <div className="boxData">
               <Card fileData={filePairs} />
                </div>
            </div>

        </div>

        <div className="dashboardPage-fileContainer">
            <h5>
                Recieved Files
            </h5>
            <div className="dashboardPage-fileContainer-box">
                <div className="boxHeader">
                <p>Name</p>
                <p>Recieved From</p>
                <p>Status</p>
                <p>View</p> 
                </div>
                <div className="boxData">
                <Card1 fileData={recievedfileData} />
                </div>
            </div>

        </div>

        </div>
    </div>
  )
}

export default dashboard