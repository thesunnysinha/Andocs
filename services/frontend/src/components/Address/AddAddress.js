import React, { useState } from "react";
import { Grid, Box, TextField, Button,Typography,Alert } from "@mui/material";
import { useUserAddAddressMutation} from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

const AddAddress = ({ handleCloseAddAddress, onAddressChange }) => {
  const { access_token } = getToken();
  const [addAddress] = useUserAddAddressMutation();
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    pincode: "",
    mobile_number: "",
    address: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!access_token) {
      return window.location.replace("/profile");
    }
    const actualData = {
      name: formData.name,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      mobile_number: formData.mobile_number,
      address: formData.address,
    };
    const res = await addAddress({ access_token: access_token, address: actualData });
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("add-address-form").reset();
      await onAddressChange();
      await handleCloseAddAddress();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box m={2}>
          <form id="add-address-form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
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
              <Grid item xs={12}>
                <TextField
                  label="Address Line"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
                {server_error.address ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.address[0]}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="City"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                />
                {server_error.city ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.city[0]}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="State"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth
                />
                {server_error.state ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.state[0]}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pincode"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                />
                {server_error.pincode ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.pincode[0]}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mobile Number"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  fullWidth
                />
                {server_error.mobile_number ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.mobile_number[0]}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                {server_error.non_field_errors ? (
                  <Alert severity="error">
                    {server_error.non_field_errors[0]}
                  </Alert>
                ) : (
                  ""
                )}
                ;
                {server_msg.msg ? (
                  <Alert severity="success">{server_msg.msg}</Alert>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddAddress;
