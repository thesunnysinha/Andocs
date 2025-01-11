import React, { useState } from "react";
import { Grid, Box, TextField, Button,Typography,Alert } from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { useUserEditAddressMutation } from "../../services/userAuthApi";

const EditAddress = ({
  selectedAddress,
  onAddressChange,
  handleCloseEditAddress,
}) => {
  const { access_token } = getToken();
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [editAddress] = useUserEditAddressMutation();

  const [formData, setFormData] = useState({
    name: selectedAddress.name,
    city: selectedAddress.city,
    state: selectedAddress.state,
    pincode: selectedAddress.pincode,
    mobile_number: selectedAddress.mobile_number,
    address: selectedAddress.address,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      name: data.get("name"),
      city: data.get("city"),
      state: data.get("state"),
      pincode: data.get("pincode"),
      mobile_number: data.get("mobile_number"),
      address: data.get("address"),
    };
    const res = await editAddress({
      address_id: selectedAddress.id,
      access_token: access_token,
      address: actualData,
    });
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("add-address-form").reset();
      await handleCloseEditAddress();
      await onAddressChange();
    }
    
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box m={2}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  id="name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
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
                  fullWidth
                  value={formData.address}
                  onChange={handleInputChange}
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
                  fullWidth
                  value={formData.city}
                  onChange={handleInputChange}
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
                  fullWidth
                  value={formData.state}
                  onChange={handleInputChange}
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
                  fullWidth
                  value={formData.pincode}
                  onChange={handleInputChange}
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
                  fullWidth
                  value={formData.mobile_number}
                  onChange={handleInputChange}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Save
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

export default EditAddress;
