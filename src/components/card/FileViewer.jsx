// src/components/FileViewer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FileViewer.css';

const FileViewer = () => {
  const { fileUrl } = useParams();
  const [fileContent, setFileContent] = useState('');
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(decodeURIComponent(fileUrl), { responseType: 'blob' });
        const blob = response.data;

        if (blob.type.includes('image')) {
          setFileType('image');
          setFileContent(URL.createObjectURL(blob));
        } else if (blob.type.includes('pdf')) {
          setFileType('pdf');
          setFileContent(URL.createObjectURL(blob));
        } else {
          setFileType('text');
          const reader = new FileReader();
          reader.onloadend = () => {
            setFileContent(reader.result);
          };
          reader.readAsText(blob);
        }
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    fetchFileContent();
  }, [fileUrl]);

  const renderFileContent = () => {
    switch (fileType) {
      case 'image':
        return <img src={fileContent} alt="File content" />;
      case 'text':
        return <pre>{fileContent}</pre>;
      default:
        return <iframe src={fileContent} title="PDF File" width="100%" height="600px" />;
    }
  };

  return (
    <div className="file-viewer">
      {renderFileContent()}
    </div>
  );
};

export default FileViewer;
