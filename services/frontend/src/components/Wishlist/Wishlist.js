
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useFetchWishlistQuery,
  useAddProductToCartMutation,
  useDeleteProductFromWishlistMutation,
  useFetchCartQuery,
} from "../../services/userAuthApi";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getToken } from "../../services/LocalStorageService";

const Wishlist = () => {
  const { access_token } = getToken();
  const { data, isSuccess, error } = useFetchWishlistQuery(access_token);
  const { refetch: reFetchWishlist } = useFetchWishlistQuery(access_token);
  const { refetch: reFetchCart } = useFetchCartQuery(access_token);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addProductToCart] = useAddProductToCartMutation();
  const [deleteProductFromWishlist] = useDeleteProductFromWishlistMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setWishlistItems(data.products);
    }
  }, [data, isSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleAddToCart = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    addProductToCart({ id: id, access_token: access_token })
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

  const handleDeleteFromWishlist = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    deleteProductFromWishlist({ id: id, access_token: access_token })
      .then((response) => {
        console.log(response);
        reFetchWishlist();
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Typography variant="h5">Wishlist</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button component={Link} to="/" variant="contained" color="primary">
          <ArrowBackIcon />
          Back to Shopping
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableBody>
              {wishlistItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    onClick={() =>
                      (window.location.href = `/products/${item.product}/`)
                    }
                  >
                    <img
                      src={`http://127.0.0.1:8000${item.product_image}`}
                      alt="img"
                      style={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      (window.location.href = `/products/${item.product}/`)
                    }
                  >
                    {item.product_title}
                  </TableCell>
                  <TableCell>Rs. {item.product_discounted_price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAddToCart(item.product_id)}
                      variant="contained"
                      color="primary"
                      endIcon={<AddShoppingCartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteFromWishlist(item.product_id)}
                      variant="contained"
                      color="warning"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Wishlist;