import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
} from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { useUserCreateOrderMutation,useFetchCartQuery,useUserOrdersQuery } from "../../services/userAuthApi";

const Checkout = ({ cartItems, selectedAddress,total }) => {
  const { access_token } = getToken();
  const [createOrder] = useUserCreateOrderMutation();
  const { refetch: reFetchCart } = useFetchCartQuery(access_token);
  const { refetch: reFetchOrder } = useUserOrdersQuery({access_token:access_token});
  const order = {
    address: selectedAddress.id,
    total_amount: total,
    status: 'Accepted',
    payment_method: 'UPI',
    payment_status : 'Success',
  };

  const handleCreateOrder = () => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    createOrder({ order:order, access_token: access_token })
      .then((response) => {
        console.log(response);
        reFetchCart();
        reFetchOrder();
        return window.location.replace("/orders");
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Shipping Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Full Name</Typography>
                <Typography variant="body2">{selectedAddress.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Address Line</Typography>
                <Typography variant="body2">
                  {selectedAddress.address}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">City</Typography>
                <Typography variant="body2">{selectedAddress.city}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">State/Province</Typography>
                <Typography variant="body2">{selectedAddress.state}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Zip/Postal Code</Typography>
                <Typography variant="body2">
                  {selectedAddress.pincode}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Mobile Number</Typography>
                <Typography variant="body2">
                  {selectedAddress.mobile_number}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Order Summary</Typography>
          <Paper>
            <Table>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product_title}</TableCell>
                    <TableCell align="right">
                      {item.product_total_price}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{total}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrder}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.price, 0);
};

export default Checkout;
