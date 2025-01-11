import React,{useState} from 'react'
import { storeToken } from "../../services/LocalStorageService";
import {
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../../services/userAuthApi"


const VerifyAccount = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [verifyUser, { isLoading }] = useVerifyUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", document.getElementById("email").value);
    formData.append("otp", document.getElementById("otp").value);

    const res = await verifyUser(formData);

    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      storeToken(res.data.token);
      navigate("/profile");
    }
  };
    
  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="verify-form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
            />
            {server_error.email ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.email[0]}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              name="otp"
              label="Otp"
              type="number"
            />
            {server_error.otp ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.otp[0]}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#ff00ff", mt: 2, mb: 2 }}
                >
                  Verify
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        {server_error.non_field_errors ? (
          <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default VerifyAccount