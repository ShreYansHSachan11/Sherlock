// src/components/FileViewer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FileViewer.css'

const FileViewer = () => {
  const { fileUrl } = useParams();
  const [fileContent, setFileContent] = useState('');
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(decodeURIComponent(fileUrl), { responseType: 'blob' });
        const blob = response.data;

        if (blob.type.includes('image')) {
          setIsImage(true);
          setFileContent(URL.createObjectURL(blob));
        } else {
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

  return (
    <div className="file-viewer">
      {isImage ? (
        <img src={fileContent} alt="File content" />
      ) : (
        <pre>{fileContent}</pre>
      )}
    </div>
  );
};

export default FileViewer;
