import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Paper, Box } from "@mui/material";
import { useCreatePaymentMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

const Payments = (props) => {
  const [total, setTotal] = useState(0);
  const { access_token } = getToken();
  const [cartItems, setCartItems] = useState([]);
  const [createPayment] = useCreatePaymentMutation();

  useEffect(() => {
    setTotal(props.location.state.total);
    setCartItems(props.location.state.cartItems);
  }, []);

  const handleCreatePayment = () => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    createPayment({
      access_token: access_token,
      products: cartItems,
      total_price: total,
    })
      .then((response) => {
        console.log(response);
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Payments</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <Typography variant="body1">Total Amount: {total}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePayment}
        >
          Pay
        </Button>
      </Grid>
    </Grid>
  );
};

export default Payments;
