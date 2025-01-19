import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  useFetchCartQuery,
  useDeleteProductFromCartMutation,
  useUpdateProductInCartMutation,
  useFetchWishlistQuery,
  useAddProductToWishlistMutation,
  useDeleteProductFromWishlistMutation,
} from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { API_BASE_URL } from "../../services/apiConfig";

const Cart = () => {
  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data, isSuccess, refetch: reFetchCart } = useFetchCartQuery(access_token);
  const { data: wishlistData, refetch: reFetchWishlist } = useFetchWishlistQuery(access_token);
  const [cartItems, setCartItems] = useState([]);
  const [deleteProductFromCart] = useDeleteProductFromCartMutation();
  const [updateProductInCart] = useUpdateProductInCartMutation();
  const [addProductToWishlist] = useAddProductToWishlistMutation();
  const [removeProductFromWishlist] = useDeleteProductFromWishlistMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setCartItems(data.products);
    }
  }, [data, isSuccess]);

  const isInWishlist = (productId) => {
    return wishlistData?.products?.some((item) => item.product_id === productId);
  };

  const handleDecreaseQuantity = (id) => {
    updateProductInCart({ id, qk: 0, access_token }).then(reFetchCart).catch(console.error);
  };

  const handleIncreaseQuantity = (id) => {
    updateProductInCart({ id, qk: 1, access_token }).then(reFetchCart).catch(console.error);
  };

  const handleDeleteFromCart = (id) => {
    deleteProductFromCart({ id, access_token }).then(reFetchCart).catch(console.error);
  };

  const handleAddOrRemoveFromWishlist = (id) => {
    if (isInWishlist(id)) {
      removeProductFromWishlist({ id, access_token })
        .then(() => {
          reFetchCart();
          reFetchWishlist();
        })
        .catch(console.error);
    } else {
      addProductToWishlist({ id, access_token })
        .then(() => {
          reFetchCart();
          reFetchWishlist();
        })
        .catch(console.error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "20px" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Paper sx={{ padding: 3, borderRadius: "12px", boxShadow: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" color="primary" fontWeight="bold">
                Shopping Cart
              </Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  padding: "6px 16px",
                }}
              >
                Back to Shopping
              </Button>
            </Box>

            {/* Check if the cart is empty */}
            {cartItems.length === 0 ? (
              <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="textSecondary">
                  Your cart is currently empty.
                </Typography>
              </Box>
            ) : (
              <Table sx={{ marginTop: 2 }}>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.product_id} sx={{ borderBottom: "1px solid #ddd" }}>
                      <TableCell sx={{ width: 100, padding: "16px" }}>
                        <img
                          src={`${API_BASE_URL}${item.product_image}`}
                          alt={item.product_title}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: "16px", cursor: "pointer" }} onClick={() => navigate(`/products/${item.product_id}`)}>
                        <Typography variant="body1" fontWeight="bold" color="text.primary">
                          {item.product_title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ padding: "16px" }}>Rs. {item.product_discounted_price}</TableCell>
                      <TableCell sx={{ padding: "16px" }}>Rs. {item.product_total_price}</TableCell>
                      <TableCell sx={{ padding: "16px" }}>
                        <Box display="flex" alignItems="center">
                          <IconButton size="small" onClick={() => handleDecreaseQuantity(item.product_id)}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1">{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => handleIncreaseQuantity(item.product_id)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "16px" }}>
                        <Button
                          onClick={() => handleDeleteFromCart(item.product_id)}
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </TableCell>
                      <TableCell sx={{ padding: "16px" }}>
                        <Tooltip title={isInWishlist(item.product_id) ? "Remove from Wishlist" : "Add to Wishlist"}>
                          <IconButton onClick={() => handleAddOrRemoveFromWishlist(item.product_id)}>
                            <FavoriteIcon color={isInWishlist(item.product_id) ? "primary" : "secondary"} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Display total cost and checkout button */}
            {cartItems.length > 0 && (
              <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="text.primary">
                  Total: Rs.{" "}
                  {cartItems.reduce((total, item) => total + item.product_total_price, 0).toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  Checkout
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
