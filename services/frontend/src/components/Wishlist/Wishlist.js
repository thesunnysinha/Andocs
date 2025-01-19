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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useFetchWishlistQuery,
  useAddProductToCartMutation,
  useDeleteProductFromWishlistMutation,
  useFetchCartQuery,
} from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { API_BASE_URL } from "../../services/apiConfig";

const Wishlist = () => {
  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data, isSuccess, error } = useFetchWishlistQuery(access_token);
  const { refetch: reFetchCart } = useFetchCartQuery(access_token);
  const { refetch: reFetchWishlist } = useFetchWishlistQuery(access_token);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [addProductToCart] = useAddProductToCartMutation();
  const [deleteProductFromWishlist] = useDeleteProductFromWishlistMutation();
  const { data: cartData, isSuccess: isCartSuccess } = useFetchCartQuery(access_token);

  useEffect(() => {
    if (data && isSuccess) {
      setWishlistItems(data.products);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [error]);

  // Check if product is already in cart
  const isInCart = (productId) => {
    return isCartSuccess && cartData.products.some((item) => item.product_id === productId);
  };

  const handleAddToCart = (id) => {
    if (!access_token) {
      return navigate("/profile");
    }
    
    if (isInCart(id)) {
      return navigate("/cart"); // Redirect to cart if item is already in the cart
    }
    
    addProductToCart({ id, access_token })
      .then(() => {
        reFetchCart();
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const handleDeleteFromWishlist = (id) => {
    if (!access_token) {
      return navigate("/profile");
    }
    deleteProductFromWishlist({ id, access_token })
      .then(() => {
        reFetchWishlist();
      })
      .catch((error) => {
        console.error("Error removing product from wishlist:", error);
      });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingTop: "20px" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Paper sx={{ padding: 3, borderRadius: "12px", boxShadow: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" color="primary" fontWeight="bold">
                My Wishlist
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

            {wishlistItems.length === 0 ? (
              <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="textSecondary">
                  Your wishlist is currently empty.
                </Typography>
              </Box>
            ) : (
              <Table sx={{ marginTop: 2 }}>
                <TableBody>
                  {wishlistItems.map((item) => (
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
                      <TableCell sx={{ padding: "16px" }}>
                        <Button
                          onClick={() => handleAddToCart(item.product_id)}
                          variant="contained"
                          color="primary"
                          endIcon={<AddShoppingCartIcon />}
                          sx={{
                            padding: "8px 16px",
                            fontWeight: "bold",
                            textTransform: "none",
                          }}
                        >
                          {isInCart(item.product_id) ? "Go to Cart" : "Add to Cart"}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ padding: "16px" }}>
                        <IconButton
                          onClick={() => handleDeleteFromWishlist(item.product_id)}
                          color="error"
                          sx={{
                            borderRadius: "50%",
                            padding: "8px",
                            "&:hover": {
                              backgroundColor: "#f44336",
                              opacity: 0.8,
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wishlist;
