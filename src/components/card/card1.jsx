import React from "react";
import "./card.css";

const Card = ({ fileData, onFilePairClick }) => {
  // Filter fileData to include only report files
  const reportFiles = fileData.filter(file => file.report);

  return (
    <div className="card-container">
      {reportFiles.map((file, index) => (
        <div key={file.filePairId} className="card" onClick={() => onFilePairClick(file.filePairId)}>
          <p>
            <span>{index + 1}.&nbsp; &nbsp; </span>
            <a href="#" className="file-link">
              {file.filePairId}
            </a>
          </p>
          <p>{file.sharedFrom}</p>
          <p>report</p>
          <p>{file.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
