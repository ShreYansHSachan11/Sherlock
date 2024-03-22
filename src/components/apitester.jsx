import React from 'react';

const ByteImageComponent = () => {
    const generateByteImage = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 100; // Width of the image
        canvas.height = 100; // Height of the image

        // Get the 2D context of the canvas
        const ctx = canvas.getContext('2d');

        // Draw something on the canvas
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL
        const dataURL = canvas.toDataURL();

        return dataURL;
    };

    const byteImageDataURL = generateByteImage();

  
    const byteDataIndex = byteImageDataURL.indexOf('base64,') + 'base64,'.length;
    const byteData = byteImageDataURL.substring(byteDataIndex);
    console.log(byteData)
   
    const cleanByteData = byteData.replace(/\s/g, '');

   
    console.log(cleanByteData);

    return (
        <div>
            <h2>Byte Image Example</h2>
            <img src={byteImageDataURL} alt="Byte Image" />
        </div>
    );
};

export default ByteImageComponent;
