import React, { useState } from "react";
import { TextField, Button, Box, Alert, Grid,Typography } from "@mui/material";
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";

const SendPasswordResetEmail = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      date_of_birth: data.get("date_of_birth")
    }
    const res = await sendPasswordResetEmail({user:actualData});
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("password-reset-email-form").reset();
    }
  };
  return (
    <Grid container justifyContent="center">
      <Grid item sm={6} xs={12}>
        <h1>Send Reset Password Link</h1>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          id="password-reset-email-form"
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
          />
          {server_error.email ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.email[0]}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="date_of_birth"
            name="date_of_birth"
            // label="DOB"
            type="date"
          />
          {server_error.date_of_birth ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {server_error.date_of_birth[0]}
            </Typography>
          ) : (
            ""
          )}
          <Box textAlign="center">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send
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

export default SendPasswordResetEmail;
