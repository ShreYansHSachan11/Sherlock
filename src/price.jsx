import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lottie from "lottie-web";
import uploadFile from './assets/upload.json'
import loader from './assets/analyzing.json'
import { FileUploader } from "react-drag-drop-files";
import "./price.css";


const fileTypes = ["JPG"];


function Homepage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [myid, setMyid] = useState("");
  const [proceedActive, setProceedActive] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleTextChange = (e) => {
    setText(e.target.value);
    setProceedActive(e.target.value !== "" || image !== null);
  };

   
  
  const handleChange = (file) => {
    setImage(file);
    setProceedActive(file !== "" || text !== "");
  };
  
  React.useEffect(() => {
    const animationContainer = document.querySelector("#uploadFile");
  
    if (animationContainer && !animationContainer.querySelector("svg")) {
      lottie.loadAnimation({
        container: animationContainer,
        
        autoplay: true,
        animationData: {...uploadFile}, 
      });
    }
  }, []);

  React.useEffect(() => {
    const animationContainer = document.querySelector("#loader");
  
    if (animationContainer && !animationContainer.querySelector("svg")) {
      lottie.loadAnimation({
        container: animationContainer,
        autoplay: true,
        animationData: {...loader}, 
      });
    }
  }, [loading]);

  const handleProceed = () => {
    setLoading(true)
    if (text !== "") {
      handlingText();
    } else {
      handlingImage();
    }
  };

  function handlingText() {
    
    const handleTextSubmit = async () => {
      console.log("Handling text...");
      try {
        const response = await axios.post(
          "https://sherlock-backend-4.onrender.com/filedata",
          {
            textdata: "text",
            file: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        );
        setTimeout(() => {
          setLoading(false);
          navigate("/analysis", {
            state: { originalData: { text, image }, anonymizedData: response.data },
          });
        }, 2000);
        setMyid(response.data.data._id);
      } catch (error) {
        setLoading(false)
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    const postingtexttoML = async () => {
      try {
        const response = await axios.post(
          "https://amanetize-sherlock.hf.space/text",
          { text },
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        );
        setTimeout(() => {
          setLoading(false);
          navigate("/analysis", {
            state: { originalData: { text, image }, anonymizedData: response.data },
          });
        }, 1000);
      } catch (error) {
        setLoading(false)
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    handleTextSubmit(); 
  postingtexttoML();
 
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sherlock-backend-4.onrender.com/filedata/${myid}`
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (myid !== "") {
      fetchData();
    }
  }, [myid]);

function handlingImage()
{
  const handleImageSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("file", image, "photo_2024-03-17_04-58-40.jpg");
      formData.append("textdata", "");
      const response = await axios.post(
        "https://sherlock-backend-4.onrender.com/filedata",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );
      console.log(response.data);
      navigate("/analysis", {
        state: { originalData: { text, image }, anonymizedData: response.data },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const postingimagetoML = async () => {
    try {
      let formData = new FormData();
      formData.append("file", image);
      const response = await axios.post(
        "https://amanetize-sherlock.hf.space/image",
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );
      console.log(response.data);
      navigate("/analysis", {
        state: { originalData: { text, image }, anonymizedData: response.data },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  handleImageSubmit();
  postingimagetoML();
  

}

  
return (
  <div className="homepage-container">
    <div className="homepage-container-content">

    
   <h3>ANONYMIZER</h3>
    <div className="input-sections">
      
      <div className="input-section">
      <textarea
              className="text-area"
              value={text}
              onChange={handleTextChange}
              disabled={image !== null}
              placeholder="Enter Text Here"
            />
      </div>
        <h6>OR</h6>
      <div className="input-section">
        
      
      <div id="uploadFile" style={{ width: 280, height: 280 }} />
      <FileUploader handleChange={handleChange} name="file" className="drop_area drop_zone" types={fileTypes} label="Upload or Drag & drop files" />
      </div>
     
    </div>
    { loading ? (
      
      <div id="loader" style={{ width: 140, height: 100}}/>
    ) :(
             <button
              className="btn1"
              onClick={handleProceed}
              disabled={!proceedActive}
            >
             
              PROCEED
            </button>
    )}
  </div>
  </div>
);
}

export default Homepage;
