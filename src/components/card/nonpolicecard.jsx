import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";

const Card = () => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const receivedFilePairs = JSON.parse(sessionStorage.getItem('receivedFilePairs')) || [];
    setFileData(receivedFilePairs);
  }, []);

  const handleNavigate = (event, filePairId, sharedFromId) => {
    event.preventDefault();
    console.log(sharedFromId)
    navigate(`/share/${filePairId}`, {
      state: { filePairId, sharedFromId },
    });
  };

  const uniqueFileData = [];
  const filePairIds = new Set();

  fileData.forEach(file => {
    if (!filePairIds.has(file.filePairId)) {
      filePairIds.add(file.filePairId);
      uniqueFileData.push(file);
    }
  });

  return (
    <div className="card-container">
      {uniqueFileData.map((file, index) => (
        <div key={file.filePairId} className="card">
          <p>
            <span>{index + 1}.&nbsp; &nbsp; </span>
            <a
              href={`/share/${file.filePairId}`}
              onClick={(event) => handleNavigate(event, file.filePairId, file.sharedFrom)}
              className="file-link"
            >
              {`file ${index+1}`}
            </a>
          </p>
          <p>{file.sharedFromEmail}</p>
          
          <p>19/06/24</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
