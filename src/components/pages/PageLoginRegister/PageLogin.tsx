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

export default function PageLogin() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const onInputChange = (e: any | undefined) => {
    if (!e) return;
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const submitForm = () => {
    setError(null);

    axios.post(`${API_PATHS.login}/api/auth/login`, credentials).then((res) => {
      const authorization_token = localStorage.getItem("authorization_token");
      if (authorization_token) {
        localStorage.removeItem("authorization_token");
      }

      const is_admin = localStorage.getItem("is_admin");
      if (is_admin) {
        localStorage.removeItem("is_admin");
      }

      localStorage.setItem("authorization_token", res.data.token.access_token);
      localStorage.setItem("is_admin", res.data.is_admin);

      showAlert("You are now logged in", "success");
      navigate("/");

    }).catch((err)=>{
      console.log("Error: " + err)
      setError(err.response.data.message);
    });
  }

  return (
    <PaperLayout>
      <Typography component="h1" variant="h4" align="center">
        Sign in
      </Typography>
      <Grid>
          {error && (
            <Typography sx={{ my: 2 }} color="error">
              {error}
            </Typography>
          )}
          <TextField sx={{ my: 2 }} label='Username' name='username' placeholder='Enter username' variant="outlined" onKeyUp={onInputChange} fullWidth required/>
          <TextField sx={{ my: 2 }} label='Password' name='password' placeholder='Enter password' type='password' variant="outlined" onKeyUp={onInputChange} fullWidth required/>
          <Button sx={{ my: 2 }} type='submit' color='primary' variant="contained" fullWidth onClick={() => submitForm()}>Sign in</Button>
          <Typography sx={{ my: 2 }}>
            You don't have an account?{' '}
            <Link href="/register" >Register</Link>
          </Typography>
      </Grid>
    </PaperLayout>
  );
}
