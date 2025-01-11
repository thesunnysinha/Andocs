import React, { useState } from "react";
import {
  Grid,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRegisterMutation } from "../../services/userAuthApi";

const Signup = () => {
  const [server_error, setServerError] = useState({});
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let genderVal = document.getElementById("gender").value;
    if (genderVal == "male") {
      genderVal = "M";
    } else if (genderVal == "female") {
      genderVal = "F";
    } else {
      genderVal = "O";
    }
    const fileInput = document.getElementById("profile_pic");
    const file = fileInput.files[0];
    if (!file) {
      setServerError({ pic: ["Please select a file."] });
      return;
    }
    if (!file.type.startsWith("image/")) {
      setServerError({ pic: ["Please select an image file."] });
      return;
    }
    if (file.size > 200 * 1024) {
      setServerError({
        pic: ["Please select an image file smaller than 200kb."],
      });
      return;
    }
    formData.append("pic", file);
    formData.append("name", document.getElementById("name").value);
    formData.append("username", document.getElementById("username").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("phone", document.getElementById("phone_number").value);
    formData.append("date_of_birth", document.getElementById("dob").value);
    formData.append("gender", genderVal);
    formData.append("password", document.getElementById("password").value);
    formData.append("password2", document.getElementById("password2").value);
    formData.append("tc", document.getElementById("tc").value);

    const res = await registerUser(formData);

    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      navigate("/verify_account");
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="signup-form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="profile_pic"
              name="profile_pic"
              placeholder="Profile Pic"
              // label="Profile Pic"
              type="file"
              accept="image/*"
            />
            {server_error.pic ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.pic[0]}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
            />
            {server_error.name ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.name[0]}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
            />
            {server_error.username ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {server_error.username[0]}
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

          <Grid item xs={12} container>
            <Grid item xs={4}>
              <PhoneInput
                country="INDIA"
                style={{ margin: "normal" }}
                id="phone_number"
                name="phone_number"
                placeholder="Enter phone number"
                required
                value={value}
                onChange={setValue}
              />
              {server_error.phone ? (
                <Typography
                  style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                >
                  {server_error.phone[0]}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="dob"
                name="dob"
                type="date"
              />
              {server_error.date_of_birth ? (
                <Typography
                  style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                >
                  {server_error.date_of_birth[0]}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="gender"
                name="gender"
                label="Gender"
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
              {server_error.gender ? (
                <Typography
                  style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                >
                  {server_error.gender[0]}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={6}>
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
                <Typography
                  style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                >
                  {server_error.password[0]}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={6}>
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
                <Typography
                  style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                >
                  {server_error.password2[0]}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} textAlign="center">
            <FormControlLabel
              control={
                <Checkbox id="tc" name="tc" value={true} color="primary" />
              }
              label="I agree to Terms and Conditions"
            />
            {server_error.tc ? (
              <span style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
                {server_error.tc[0]}
              </span>
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
                  Signup
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
};

export default Signup;
