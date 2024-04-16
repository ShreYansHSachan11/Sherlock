import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const input="Karnataka State Police Incident Report Location: Ramthal Kalligudda On Road, Near Petrol Bunk, Ramthal Kalligudda Report: On the evening of 06/02/2008 a report of theft was registered at Ramthal Kalligudda, Bellary, Karnataka. The incident occurred at RAMTHAL KALLIGUDDA ON ROAD NEAR PETROL BUNK, RAMTHAL KALLIGUDDA ON ROAD NEAR PETROL BUNK, a busy thoroughfare often frequented by commuters and locals alike. According to the statement provided by the complainant, Mr. Suresh Kumar, identified by Aadhaar number: 413555955688 and FIR No: 0004/2008, a resident of Ramthal Kalligudda, the theft took place around 9:00 PM. Mr. Kumar reported that valuable items, including electronic gadgets and jewelry, were stolen from his residence while he was away for a family gathering. Upon receiving the complaint, Officer-in-Charge (10) Mallikarjun Guruputrappa Kulkarni, a seasoned investigator known for his meticulous approach to cases, was assigned to lead the investigation. Officer Kulkarni wasted no time in mobilizing a team of officers to the scene of the crime to gather evidence and interview witnesses. During the preliminary investigation, Officer Kulkarni and his team spoke to neighbors and eyewitnesses in the vicinity of Mr. Kumar's residence. Additionally, they reviewed CCTV footage from nearby establishments to identify any suspicious individuals or vehicles in the area at the time of the incident. As part of the investigation process, Officer Kulkarni also verified Mr. Kumar's identity and collected relevant personal information, including his Aadhaar number and contact details +91 9315845277. This information was carefully documented to ensure the accuracy and integrity of the case file. Furthermore, Officer Kulkarni liaised with the local forensic team to conduct a thorough examination of the crime scene for fingerprints, footprints, and other physical evidence that could provide valuable leads in the investigation. The Karnataka State Police urges residents of Ramthal Kalligudda and surrounding areas to remain vigilant and report any suspicious activity to the authorities promptly."
  const output="<ORGANIZATION_0> Incident Report Location: <ADDRESS_0>, Near Petrol Bunk, <PERSON_0> Report: On <DATE_TIME_1> of <DATE_0> a report of theft was registered at <PERSON_0>, Bellary, <LOCATION_0>. The incident occurred at RAMTHAL KALLIGUDDA ON ROAD NEAR <PERSON_6>, <PERSON_7> ON ROAD NEAR <PERSON_6>, a busy thoroughfare often frequented by commuters and locals alike. According to the statement provided by the complainant, Mr. <PERSON_5>, identified by Aadhaar number: <INUNIQUEIDENTIFICATIONNUMBER_0> and FIR No: <FIR_NUMBER_0>, a resident of <PERSON_4>, the theft took place <DATE_TIME_0>. Mr. <PERSON_2> reported that valuable items, including electronic gadgets and jewelry, were stolen from his residence while he was away for a family gathering. Upon receiving the complaint, Officer-in-Charge (10) <PERSON_3>, a seasoned investigator known for his meticulous approach to cases, was assigned to lead the investigation. Officer <PERSON_1> wasted no time in mobilizing a team of officers to the scene of the crime to gather evidence and interview witnesses. During the preliminary investigation, Officer <PERSON_1> and his team spoke to neighbors and eyewitnesses in the vicinity of Mr. <PERSON_2>'s residence. Additionally, they reviewed CCTV footage from nearby establishments to identify any suspicious individuals or vehicles in the area at the time of the incident. As part of the investigation process, Officer <PERSON_1> also verified Mr. <PERSON_2>'s identity and collected relevant personal information, including his Aadhaar number and contact details <PHONENUMBER_0>. This information was carefully documented to ensure the accuracy and integrity of the case file. Furthermore, Officer <PERSON_1> liaised with the local forensic team to conduct a thorough examination of the crime scene for fingerprints, footprints, and other physical evidence that could provide valuable leads in the investigation. The <ORGANIZATION_0> urges residents of <PERSON_0> and surrounding areas to remain vigilant and report any suspicious activity to the authorities promptly."




  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = sessionStorage.getItem("token");
    const thankyou = localStorage.getItem("thankyou");

    if (token) {
      setIsLoggedIn(true);
    } 
  }, [navigate]);


  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_API_KEY}/login`, {
        email,
        password,
      })
      .then((response) => {
        
        if (response.data.status) {
            const token = response.data.result.token;
            const username = response.data.result.userValid.firstName;
            const id= response.data.result.userValid._id;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem('inputFile', input);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('outputFile', output);
        // console.log(output);
        setIsLoggedIn(true); 
          navigate("/anonymize");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again later.");
      });
   
  };

  
  return (
    <Container
      maxWidth="sm"
      style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "black" }}>Login</h2>
        {/* Check if the user is logged in */}
        {isLoggedIn ? (
          <p style={{color:"black"}}>You are already logged in.</p>
        ) : (
          <Box
            component="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 5, backgroundColor: "#00C9B8" }}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
