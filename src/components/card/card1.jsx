import React from "react";
import "./card.css";
import fileicon from "../../assets/dashboardFile.png";
import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Card = ({ fileData }) => {
  const navigate = useNavigate();

  const handleNavigate = (event, inputFile, outputFile) => {
    event.preventDefault();
    navigate('/filedata', {
      state: { inputFile, outputFile },
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
              href="/filedata"
              onClick={(event) => handleNavigate(event, file.inputFile, file.resultdata)}
              className="file-link"
            >
              {file.filePairId}
            </a>
          </p>
          <p>{file.sharedFrom}</p>
          <p>{file.status}</p>
          <p>{new Date(file.lastModified).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};
export default Card;
