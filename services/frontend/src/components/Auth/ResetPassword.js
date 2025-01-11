import React, { useState } from "react";
import { TextField, Button, Box, Alert, Grid,Typography } from "@mui/material";
import { useResetPasswordMutation } from "../../services/userAuthApi";
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [resetPassword] = useResetPasswordMutation();
  const {id,token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password2:data.get("password2")
    };
    const res = await resetPassword({actualData:actualData,id:id,token:token})

    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("password-reset-form").reset();
      setTimeout(() => {
        navigate("/login")
      },3000)
    }
  };
  return (
    <Grid container justifyContent="center">
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          id="password-reset-form"
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          {server_error.password ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.password[0]}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="password2"
            name="password2"
            label="Confirm Password"
            type="password"
          />
          {server_error.password2 ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.password2[0]}
            </Typography>
          ) : (
            ""
          )}
          <Box textAlign="center">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
          {server_error.non_field_errors ? (
            <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
          ) : (
            ""
          )}
          {server_msg.msg ? (
            <Alert severity="success">{server_msg.msg}</Alert>
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
