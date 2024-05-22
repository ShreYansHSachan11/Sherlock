import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import Card from './components/card/card';
import Card1 from './components/card/nonpolicecard';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');
  const userId = sessionStorage.getItem('id');
  const [filePairs, setFilePairs] = useState([]);
  const [receivedFilePairs, setReceivedFilePairs] = useState([]);

  useEffect(() => {
    // Retrieve old data from session storage
    const storedFilePairs = JSON.parse(sessionStorage.getItem('filePairs')) || [];
    const storedReceivedFilePairs = JSON.parse(sessionStorage.getItem('receivedFilePairs')) || [];
    setFilePairs(storedFilePairs);
    setReceivedFilePairs(storedReceivedFilePairs);

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://sherlock-backend-4.onrender.com/${userId}`);
        const newFilePairs = response.data.user.filePairs;
        const newReceivedFilePairs = response.data.user.sharedFilePairs;

        console.log('Fetched file pairs:', newFilePairs); // Debugging log
        console.log('Fetched received file pairs:', newReceivedFilePairs); // Debugging log

        // Update state with new data
        setFilePairs(newFilePairs);
        setReceivedFilePairs(newReceivedFilePairs);

        // Store new data in session storage
        sessionStorage.setItem('filePairs', JSON.stringify(newFilePairs));
        sessionStorage.setItem('receivedFilePairs', JSON.stringify(newReceivedFilePairs));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className='dashboardPage'>
      <div className="dashboardContent">
        <div className="dashboardHeader">
          <h3>Hi,&nbsp;&nbsp;&nbsp;{username} </h3>
        </div>
        <div className="dashboardPage-fileContainer">
          <h5>Received Files</h5>
          <div className="dashboardPage-fileContainer-box">
            <div className="boxHeader">
              <p>Name</p>
              <p>Received From</p>
              
              <p>Date</p>
            </div>
            <div className="boxData">
              
                <Card1 fileData={receivedFilePairs} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
