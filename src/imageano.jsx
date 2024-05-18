import React, { useState, useEffect } from "react";
import lottie from "lottie-web";
import uploadFile from "./assets/upload.json";
import loader from "./assets/analyzing.json";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import './imageano.css'

const imageano = () => {
    const [image, setImage] = useState(null);
    const [responseImg, setResponseImg] = useState(null);
    const [finalImg, setFinalImg] = useState(null);
    const [faceNo, setFaceNo] = useState(null);
    
    const fileTypes = ["JPG"];

    const handleChange = (file) => {
        setImage(file);
        
      };

      const handleText = (e) => {
        setFaceNo(e.target.value);
        
      };
    
      React.useEffect(() => {
        const animationContainer = document.querySelector("#uploadFile");
    
        if (animationContainer && !animationContainer.querySelector("svg")) {
          lottie.loadAnimation({
            container: animationContainer,
    
            autoplay: true,
            animationData: { ...uploadFile },
          });
        }
      }, []);
    
     
     
       
        const handlingImage = async () => {
          try {
            const formData = new FormData();
            formData.append("file", image);
            
            const response = await axios({
                method: 'POST',
                url: 'http://10.21.80.151:8000/blurimg',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: "arraybuffer"
            });

            const base64string = btoa(String.fromCharCode(...new Uint8Array(response.data)));
            const contentType = response.headers['content-type'];
            const imageUrl = "data:" + contentType + ";base64," + base64string;
            setResponseImg(imageUrl);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };
       
      

      const handlingFace = async (faceNo) => {
       
        
            try {
                
              const response = await axios.post(
                `http://10.21.80.151:8000/selectface`,
                { text:faceNo },
                {
                  headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                  },
                  responseType: "arraybuffer"
                }
              );
              const base64string = btoa(String.fromCharCode(...new Uint8Array(response.data)));
            const contentType = response.headers['content-type'];
            const imageUrl = "data:" + contentType + ";base64," + base64string;
            setFinalImg(imageUrl);
            setResponseImg(null);
            } catch (error) {
              
              alert("An error occurred. Please try again later.");
            }
          
      }


    
      const handleProceed = () => {
       
          handlingImage();
        
      };

      const handleSubmit = () => {
        handlingFace(faceNo);
    };

  return (
    <div className="ImageAnonymizerPage"><div className="homepage-container-content">
    <h3>IMAGE ANONYMIZER</h3>
    <div className="input-sections">
    {!responseImg && !finalImg ? (<>
      <div className="input-section">
        <div id="uploadFile" style={{ width: 280, height: 280 }} />
        <FileUploader
          handleChange={handleChange}
          name="file"
          className="drop_area drop_zone"
          types={fileTypes}
          label="Upload or Drag & drop files"
        />
      </div>
      </>
          ) : (<>
            
          </>
            
        )}
    
    {responseImg  ? (<>
        <div className="input-section response">
        <img src={URL.createObjectURL(image)} alt="Original Image" />
                            </div>
        <div className="input-section response">
                                <img src={responseImg} alt="Analyzed Image" />
                            </div>
          
          
          </>
          ) : (<>
            
          </>
            
        )}


{finalImg && (
                    <div className="response">
                        <img src={finalImg} alt="Final Image" />
                    </div>
                )}
        </div>

        {!responseImg && !finalImg ? (
            <button
            className="btn1"
            onClick={handleProceed}
            
          >
            PROCEED
          </button>
          ) : (<>
          
          </>
            
        )}

{!finalImg ? (
            <> <label htmlFor="faceno">Enter the face to be blurred:</label>
            <input type="text" onChange={handleText} id="faceno" />
            <button className="btn1"  onClick={handleSubmit}> Submit</button></>
          ) : (<>
          
          </>
            
        )}
     
   
    
  </div>
  </div>
  )
}

export default imageano