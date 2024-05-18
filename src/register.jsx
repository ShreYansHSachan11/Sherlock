import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { Box, Grid, FormControl, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import CssBaseline from "@mui/material/CssBaseline";
import classes from "./form.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { OutlinedInput } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 
import { inputLabelClasses } from "@mui/material/InputLabel";
import './register.css'

const Form = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailerr, setMailerr] = useState(false);
  const [fnameerr, setFnameerr] = useState(false);
  const [lnameerr, setLnameerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);
  const [cpassworderr, setCpassworderr] = useState(false);
  const [usertypeerr, setUsertypeerr] = useState(false);
  const [registered, setRegistered] = useState(false);
  const namepattern = /^[a-zA-Z]{3,20}$/;
  const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.])[A-Za-z\d@.]{8,}$/;
  const navigate = useNavigate();

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const disableAKey = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };


  useEffect(() => {
    document.addEventListener("keydown", disableAKey);

    return () => {
      document.removeEventListener("keydown", disableAKey);
    };
  }, []);
  const disableContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave this page?"; 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);

  const handleCAP = useCallback(
    (e) => {
      if (fname.match(namepattern)) setFnameerr(false);
      if (lname.match(namepattern)) setLnameerr(false);
      if (email.match(emailpattern)) setMailerr(false);
      if (!fname || !lname || !password || !cpassword || !usertype || !email) {
        showToast("Please Fill all the Entries");
      } else if (!fname.match(namepattern)) {
        setFnameerr(true);
        showToast("Please Enter a Valid First Name");
      } else if (!lname.match(namepattern)) {
        setLnameerr(true);
        showToast("Please Enter a Valid Last Name");
      } else if (!email.match(emailpattern)) {
        setMailerr(true);
        showToast("Please Enter a Valid Email");
      } else if (!password.match(passwordpattern)) {
        setPassworderr(true);
        showToast("Please Enter a Valid Password");
      } else {
        
       
        setLoading(true);
        showResult();
        
        toast.success("Form submitted successfully!");
        e.preventDefault();
      }
    },
    [
      fname,
      lname,
      password,
      cpassword,
      usertype,
      email,
      namepattern,
      emailpattern,
      passwordpattern,
      mailerr,
      fnameerr,
      lnameerr,
      passworderr,
      cpassworderr,
    ]
  );
  function showResult() {
    
    axios({
      method: "post",
      url: `${import.meta.env.VITE_REACT_APP_BACKEND_API_KEY}/register`,
      data: {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        confirmPassword: cpassword,
        role: usertype,
        
      },
    })
      .then((result) => {
        toast.success(`Registration Successful`);
        setLoading(false);
        setRegistered(true);
        localStorage.setItem("thankyou", true);
        navigate("/login");
      })
      .catch((err) => {
        showToast("Registration Failed");
        
        setLoading(false);
      });
  }
  useEffect(() => {
    let thankyou = localStorage.getItem("thankyou");
    if (thankyou) {
      setRegistered(true);
    }
  }, []);

  let styles = classes;
  var color = String();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {registered ? (
        <div style={{color:"white"}}>You are already Registered !</div>
      ) : (
        <>
        <div className="registerPage">
          <CssBaseline />
          
                <Container fixed style={{border:"1px solid grey", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"50px", backdropFilter:"blur(20px) brightness(2)", borderRadius:"5px",width:"700px" }}>
                  <div className={styles.head}>
                    <h1 style={{marginTop:"40px", color:"white"}}>SIGN UP</h1>
                  </div>
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 1, width: "30ch" } }}
                    noValidate
                    autoComplete="off"
                    className={styles.input}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} style={{padding:"8px 8px"}}>
                        <TextField
                          required
                          id="outlined-required"
                          label="First Name"
                          variant="outlined"
                          type="name"
                          error={fnameerr}
                          autoComplete="off"
                          helperText={
                            fnameerr ? "Enter Correct First Name" : ""
                          }
                          value={fname}
                          onChange={(e) => {
                            setFname(e.target.value);
                            const namePattern = /^[A-Za-z]{3,20}$/;
                            setFnameerr(!namePattern.test(e.target.value));
                          }}
                          sx={{ input: { color: 'white' } , width: "100%", borderRadius:"5px"}}
                          InputLabelProps={{
                            sx: {
                             
                              color: "grey",

                              [`&.${inputLabelClasses.shrink}`]: {
                               
                                color: "white",
                                fontWeight:"bold"
                              }
                            }
                          }}
                          
                        />
                      </Grid>
                      <Grid item xs={6} style={{padding:"8px 8px"}}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Last Name"
                          variant="outlined"
                          type="name"
                          error={lnameerr}
                          helperText={lnameerr ? "Enter Correct Last Name" : ""}
                          value={lname}
                          autoComplete="off"
                          onChange={(e) => {
                            setLname(e.target.value);
                            const namePattern = /^[A-Za-z]{3,20}$/;
                            setLnameerr(!namePattern.test(e.target.value));
                          }}
                          sx={{ input: { color: 'white' } , width: "100%", borderRadius:"5px"}}
                          InputLabelProps={{
                            sx: {
                             
                              color: "grey",

                              [`&.${inputLabelClasses.shrink}`]: {
                               
                                color: "white",
                                fontWeight:"bold"
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} style={{padding:"8px 8px"}}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Email"
                          variant="outlined"
                          type="email"
                          error={mailerr}
                          autoComplete="off"
                          helperText={mailerr ? "Enter Correct Email" : ""}
                          value={props.email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            setMailerr(!emailpattern.test(e.target.value));
                          }}
                          sx={{ input: { color: 'white' } , width: "100%", borderRadius:"5px"}}
                          InputLabelProps={{
                            sx: {
                              
                              color: "grey",

                              [`&.${inputLabelClasses.shrink}`]: {
                               
                                color: "white",
                                fontWeight:"bold"
                              }
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} style={{padding:"8px 8px"}}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Password"
                          variant="outlined"
                          type="password"
                          error={passworderr}
                          helperText={
                            passworderr ? "Enter Correct Password" : ""
                          }
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            const passwordpattern =
                              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.])[A-Za-z\d@.]{8,}$/;

                            setPassworderr(
                              !passwordpattern.test(e.target.value)
                            );
                          }}
                          sx={{ input: { color: 'white' } , width: "100%", borderRadius:"5px"}}
                          InputLabelProps={{
                            sx: {
                            
                              color: "grey",

                              [`&.${inputLabelClasses.shrink}`]: {
                               
                                color: "white",
                                fontWeight:"bold"
                              }
                            }
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} style={{padding:"8px 8px"}}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Confirm Password"
                          variant="outlined"
                          type="password"
                          error={cpassworderr}
                          helperText={
                            cpassworderr ? "Enter Correct Password" : ""
                          }
                          value={props.cpassword}
                          onChange={(e) => {
                            setCpassword(e.target.value);
                            const passwordpattern =
                              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.])[A-Za-z\d@.]{8,}$/;

                            setCpassworderr(
                              !passwordpattern.test(e.target.value)
                            );
                          }}
                          sx={{ input: { color: 'white' } , width: "100%", borderRadius:"5px"}}
                          InputLabelProps={{
                            sx: {
                             
                              color: "grey",

                              [`&.${inputLabelClasses.shrink}`]: {
                               
                                color: "white",
                                fontWeight:"bold"
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} style={{padding:"8px 8px"}}>
                        <FormControl sx={{ minWidth: 580 ,input: { color: 'white' } , width: "100%", borderRadius:"5px"}}>
                          <InputLabel id="user-type-label" sx={{color:"grey"}}>
                            User Type
                          </InputLabel>
                          <Select
                            label="User Type"
                            value={usertype}
                            onChange={(e) => setUsertype(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{ input: { color: 'white' } , width: "100%", borderRadius:"5px"}}
                            
                             InputLabelProps={{
                              sx: {
                               
                                color: "grey",
  
                                [`&.${inputLabelClasses.shrink}`]: {
                                  
                                  color: "grey",
                                  fontWeight:"bold"
                                }
                              }
                            }}
                          >
                           
                            <MenuItem sx={{ input: { color: 'white' }}} value="police">Police</MenuItem>
                            <MenuItem disabled value="non-police">Non-Police</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} style={{padding:"8px 8px"}}>
                      <Button
                      onClick={handleCAP}
                      disabled={loading}
                      fullWidth
                      variant="contained"
                      style={{ textAlign: "center" }}
                      sx={{ mt: 1, mb: 2, backgroundColor:"#5b2395" }}
                    >
                      {loading ? <>Pending...</> : <>Register</>}
                    </Button>
                    </Grid>
                    </Grid>
                  </Box>

                </Container>
             
          </div>
        </>
      )}
    </>
  );
};

export default Form;
