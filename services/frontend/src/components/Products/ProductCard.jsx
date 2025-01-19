import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Box, CircularProgress, Alert, IconButton, Badge, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/LocalStorageService";
import { useAddProductToCartMutation, useFetchCartQuery, useFetchWishlistQuery, useAddProductToWishlistMutation, useDeleteProductFromWishlistMutation, useDeleteProductFromCartMutation, useUpdateProductInCartMutation } from "../../services/userAuthApi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductCard = (props) => {
  const MAX_LENGTH = 40;
  const { access_token } = getToken();
  const [addProductToCart] = useAddProductToCartMutation();
  const [addProductToWishlist] = useAddProductToWishlistMutation();
  const [removeProductFromWishlist] = useDeleteProductFromWishlistMutation();
  const [deleteProductFromCart] = useDeleteProductFromCartMutation();
  const [updateProductInCart] = useUpdateProductInCartMutation();
  const navigate = useNavigate();

  const { data: cartData, isLoading: isCartLoading, isError, error, refetch: reFetchCart } = useFetchCartQuery(access_token);
  const { data: wishlistData, refetch: reFetchWishlist } = useFetchWishlistQuery(access_token);

  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartError, setCartError] = useState(null);

  const { selling_price, discounted_price, title, discount_percent, product_id, product_image } = props.data;

  useEffect(() => {
    if (cartData && cartData.products) {
      const productInCart = cartData.products.find(product => product.product === product_id);
      setIsInCart(!!productInCart);
      setQuantity(productInCart ? productInCart.quantity : 0);
    }
  }, [cartData, product_id]);

  useEffect(() => {
    if (wishlistData && wishlistData.products) {
      const productInWishlist = wishlistData.products.find(product => product.product_id === product_id);
      setIsInWishlist(!!productInWishlist);
    }
  }, [wishlistData, product_id]);

  useEffect(() => {
    if (isError) {
      if (error?.status === 401) {
        setCartError("You need to log in to view your cart.");
        navigate("/profile");
      } else {
        setCartError("Failed to load cart details. Please try again later.");
      }
    }
  }, [isError, error, navigate]);

  const handleAddToCart = (id) => {
    if (!access_token) {
      return navigate("/profile");
    }
    addProductToCart({ id: id, access_token: access_token })
      .then(() => {
        reFetchCart();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToWishlist = (id) => {
    if (isInWishlist) {
      removeProductFromWishlist({ id, access_token })
        .then(() => reFetchWishlist())
        .catch(console.error);
    } else {
      addProductToWishlist({ id, access_token })
        .then(() => reFetchWishlist())
        .catch(console.error);
    }
  };

  const handleDecreaseQuantity = (id) => {
    if (quantity > 1) {
      updateProductInCart({ id, qk: 0, access_token })
        .then(() => reFetchCart())
        .catch(console.error);
    } else {
      deleteProductFromCart({ id, access_token })
        .then(() => reFetchCart())
        .catch(console.error);
    }
  };

  const handleIncreaseQuantity = (id) => {
    updateProductInCart({ id, qk: 1, access_token })
      .then(() => reFetchCart())
      .catch(console.error);
  };

  if (isCartLoading) {
    return <CircularProgress />;
  }

  return (
    <Card sx={{
      boxShadow: 3,
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 6,
      },
    }}>
      <CardMedia
        component="img"
        image={product_image}
        alt={title}
        sx={{
          objectFit: "cover",
          height: 220,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Rs. {discounted_price}{" "}
          <Typography variant="body2" component="span" sx={{ textDecoration: "line-through", mx: 1 }}>
            {selling_price}
          </Typography>
          <Typography variant="body2" component="span" color="success.main">
            {discount_percent}% off
          </Typography>
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {title.length > MAX_LENGTH ? `${title.substring(0, MAX_LENGTH)}...` : title}
        </Typography>
      </CardContent>
      <Box sx={{
        p: 2, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexDirection: "row",
        gap: 2
      }}>
        {cartError && <Alert severity="error" sx={{ mb: 2 }}>{cartError}</Alert>}

        {/* Add/Go To Cart Button with Badge */}
        <Tooltip title={isInCart ? "Go to Cart" : "Add to Cart"}>
          <IconButton
            onClick={() => (isInCart ? navigate("/cart") : handleAddToCart(product_id))}
            color={isInCart ? "secondary" : "primary"}
          >
            <Badge
              badgeContent={isInCart ? quantity : 0}
              color="error"
              max={99}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Wishlist Icon */}
        <Tooltip title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
          <IconButton onClick={() => handleAddToWishlist(product_id)} color={isInWishlist ? "primary" : "default"}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>

        {/* Quantity Control only shown when in cart */}
        {isInCart && (
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center"
          }}>
            <IconButton onClick={() => handleDecreaseQuantity(product_id)} disabled={quantity <= 0}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body2">{quantity}</Typography>
            <IconButton onClick={() => handleIncreaseQuantity(product_id)}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
