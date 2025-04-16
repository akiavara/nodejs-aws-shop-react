import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PaperLayout from "~/components/PaperLayout/PaperLayout";
import { Link, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import API_PATHS from "~/constants/apiPaths";
import { useAlert } from "~/components/Alert/AlertContext";

export default function PageRegister() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState(null);

  const onInputChange = (e: any | undefined) => {
    if (!e) return;
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const submitForm = () => {
    console.log(credentials);

    setError(null);

    axios.post(`${API_PATHS.bff}/api/auth/register`, credentials).then((res) => {
      showAlert("You are now registered, you can login", "success");
      navigate("/login");

    }).catch((err)=>{
      console.log("Error: " + err)
      setError(err.response.data.message);
    });
  }

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Register
      </Typography>
      <Grid>
          {error && (
            <Typography sx={{ my: 2 }} color="error">
              {error}
            </Typography>
          )}
          <TextField sx={{ my: 2 }} label='Username' name="username" placeholder='Enter username' variant="outlined" onKeyUp={onInputChange} fullWidth required/>
          <TextField sx={{ my: 2 }} label='Password' name="password" placeholder='Enter password' type='password' onKeyUp={onInputChange} variant="outlined" fullWidth required/>
          <TextField sx={{ my: 2 }} label='Repeat Password' name="repeatPassword" placeholder='Repeat password' type='password' onKeyUp={onInputChange} variant="outlined" fullWidth required/>
          <Button sx={{ my: 2 }} type='submit' color='primary' variant="contained" fullWidth onClick={() => submitForm()}>Register</Button>
          <Typography sx={{ my: 2 }}>
            You already have an account?{' '}
            <Link href="/login" >Login</Link>
          </Typography>
      </Grid>
    </PaperLayout>
  );
}
