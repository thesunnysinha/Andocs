import React, { useState, useEffect } from "react";
import { Grid, Button, IconButton } from "@mui/material";
import StarRatings from "react-star-ratings";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getToken } from "../../services/LocalStorageService";
import { useAddProductToCartMutation,useAddProductToWishlistMutation,useFetchCartQuery,useFetchWishlistQuery } from "../../services/userAuthApi";

const Detail = (props) => {
  const { access_token } = getToken();
  const [addProductToCart] = useAddProductToCartMutation();
  const [addProductToWishlist] = useAddProductToWishlistMutation();
  const { refetch: reFetchCart } = useFetchCartQuery(access_token);
  const { refetch: reFetchWishlist } = useFetchWishlistQuery(access_token);

  const { productDetail } = props;

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

  const handleAddToWishlist = (id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    addProductToWishlist({ id: id, access_token: access_token })
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
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <h1>{productDetail.title}</h1>
      </Grid>
      <Grid item xs={12} md={3}>
        <StarRatings
          rating={productDetail.average_rating}
          starDimension="20px"
          starSpacing="5px"
          starRatedColor="gold"
        />
      </Grid>
      <Grid item xs={12}>
        <p>Brand: {productDetail.brand}</p>
      </Grid>

      <Grid item xs={12} md={6}>
        <p>Selling Price: {productDetail.selling_price}</p>
      </Grid>
      <Grid item xs={12} md={6}>
        <p>Discounted Price: {productDetail.discounted_price}</p>
      </Grid>

      <Grid item xs={12}>
        <p>Description: {productDetail.description}</p>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          onClick={() => handleAddToCart(productDetail.product_id)}
          variant="contained"
          color="primary"
          endIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
        <IconButton onClick={() => handleAddToWishlist(productDetail.product_id)}>
            <FavoriteIcon color="secondary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Detail;
