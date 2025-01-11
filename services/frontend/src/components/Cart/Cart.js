import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  TableCell,
  Box,
  Modal,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  useFetchCartQuery,
  useDeleteProductFromCartMutation,
  useUpdateProductInCartMutation,
  useUserAddressQuery,
  useFetchWishlistQuery,
  useAddProductToWishlistMutation
} from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import AddAddress from "../Address/AddAddress";
import Checkout from "./checkout";

const Cart = () => {
  const styles = {
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "2rem",
    },
  };
  const [total, setTotal] = useState(0);
  const { access_token } = getToken();
  const { data, isSuccess, error } = useFetchCartQuery(access_token);
  const [cartItems, setCartItems] = useState([]);
  const [deleteProductFromCart] = useDeleteProductFromCartMutation();
  const [updateProductInCart] = useUpdateProductInCartMutation();
  const [addProductToWishlist] = useAddProductToWishlistMutation();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [address, setAddress] = useState([]);
  const { refetch: reFetchCart } = useFetchCartQuery(access_token);
  const { refetch: reFetchWishlist } = useFetchWishlistQuery(access_token);
  const isCartItemsOrAddressNull =
    cartItems.length === 0 || Object.keys(selectedAddress).length === 0;
  const {
    data: addressData,
    isSuccess: addressIsSuccess,
    error: addressError,
  } = useUserAddressQuery(access_token);

  useEffect(() => {
    if (data && isSuccess) {
      setCartItems(data.products);
      setTotal(data.total_price);
    }
  }, [data, isSuccess]);

  useMemo(() => {
    if (addressError) {
      console.error(addressError);
    }
  }, [addressError]);

  useEffect(() => {
    if (addressData && addressIsSuccess) {
      setAddress(addressData);
    }
  }, [addressData, addressIsSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleDecreaseQuantity = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    updateProductInCart({ "id": id, "qk": 0, "access_token": access_token })
      .then((response) => {
        console.log(response);
        reFetchCart();
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  const handleIncreaseQuantity = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    updateProductInCart({ id: id, qk: 1, access_token: access_token })
      .then((response) => {
        console.log(response);
        reFetchCart();
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  const handleDeleteFromCart = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    deleteProductFromCart({ id: id, access_token: access_token })
      .then((response) => {
        console.log(response);
        reFetchCart();
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const [openAddAddress, setOpenAddAddress] = useState(false);
  const handleOpenAddAddress = () => {
    setOpenAddAddress(true);
  };
  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
  };

  const [openCheckout, setOpenCheckout] = useState(false);

  const handleOpenCheckout = () => {
    setOpenCheckout(true);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handleAddToWishlist = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    addProductToWishlist({ id: id, access_token: access_token })
      .then((response) => {
        console.log(response);
        deleteProductFromCart({ id: id, access_token: access_token })
        .then((response) => {
          reFetchWishlist();
          reFetchCart();
        })
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  return (
    <>
      <Modal open={openAddAddress} onClose={handleCloseAddAddress}>
        <div style={styles.paper}>
          <AddAddress handleCloseAddAddress={handleCloseAddAddress} />
        </div>
      </Modal>
      <Modal open={openCheckout} onClose={handleCloseCheckout}>
        <Paper style={styles.paper}>
          <Checkout
            cartItems={cartItems}
            selectedAddress={selectedAddress}
            total={total}
          />
        </Paper>
      </Modal>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography variant="h5">Shopping Cart</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button component={Link} to="/" variant="contained" color="primary">
            <ArrowBackIcon />
            Back to Shopping
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid item xs={12}>
            <Paper>
              <Table>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <Grid item xs={12} md={5}>
                        <TableCell>
                          <img
                            src={`http://127.0.0.1:8000${item.product_image}`}
                            alt="img"
                            style={{ width: 50, height: 50 }}
                            onClick={() =>
                              (window.location.href = `/products/${item.product}/`)
                            }
                          />
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            (window.location.href = `/products/${item.product}/`)
                          }
                        >
                          {item.product_title}
                        </TableCell>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDecreaseQuantity(item.product_id)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          {item.quantity}
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleIncreaseQuantity(item.product_id)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          Rs. {item.product_discounted_price}
                        </TableCell>
                        <TableCell>Rs. {item.product_total_price}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              handleDeleteFromCart(item.product_id)
                            }
                            variant="contained"
                            color="warning"
                          >
                            Remove
                          </Button>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleAddToWishlist(item.product_id)}
                          >
                            <FavoriteIcon color="secondary" />
                          </IconButton>
                        </TableCell>
                      </Grid>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Total: Rs. {total}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="address-select-label">Address</InputLabel>
              <Select
                labelId="address-select-label"
                id="address-select"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                {address.map((address) => (
                  <MenuItem key={address.id} value={address}>
                    {address.address},{address.city},{address.state},
                    {address.pincode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddAddress}
              >
                Add Address
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={isCartItemsOrAddressNull}
            onClick={handleOpenCheckout}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
