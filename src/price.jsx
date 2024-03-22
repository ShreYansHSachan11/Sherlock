import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./price.css";

function Homepage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [myid, setMyid] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
        navigate("/analysis", {
          state: { originalData: { text, image }, anonymizedData: response.data },
        });
        setMyid(response.data.data._id);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    const postingtexttoML = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/text",
          { text },
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        );
        navigate("/analysis", {
          state: { originalData: { text, image }, anonymizedData: response.data },
        });
      } catch (error) {
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
        "http://127.0.0.1:8000/image",
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
    <div className="input-sections">
      <div className="input-section">
        <textarea
          className="text-area"
          value={text}
          onChange={handleTextChange}
          disabled={image !== null}
        />
        <button className="btn1" onClick={handlingText} disabled={!text || image}>
          Submit Text
        </button>
      </div>

      <div className="input-section">
        <input
          className="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={text.trim() !== ""}
        />
        <button className="btn1" onClick={handlingImage} disabled={!image || text}>
          Submit Image
        </button>
      </div>
    </div>
  </div>
);
}

export default Homepage;
