import React, { useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import ProductCard from "../ProductCard/ProductCard";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useFetchProductsQuery } from "../../services/fetchProduct";
import { openSnackbar } from "../../features/snackbarSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const renderLoader = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="300px"
    >
      <CircularProgress color="secondary" />
    </Box>
  );

  const renderEmptyMessage = (category) => (
    <Typography variant="body1" sx={{ textAlign: "center" }}>
      No {category} available at the moment.
    </Typography>
  );

  const renderError = (errorMessage) => (
    <Typography color="error" variant="h5" sx={{ textAlign: "center" }}>
      {errorMessage}
    </Typography>
  );

  const renderProductSwiper = (products, category) => {
    return (
      <Card>
        {products.length > 0 ? (
          <Swiper
            freeMode={true}
            grabCursor={true}
            className="mySwiper"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 15 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card>
                  <Link to={`/products/${product.id}`}>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={`http://127.0.0.1:8000${product.product_image}`}
                      alt={product.title}
                    />
                  </Link>
                  <ProductCard
                    data={{
                      selling_price: product.selling_price,
                      discounted_price: product.discounted_price,
                      title: product.title,
                      discount_percent: product.discount_percent,
                      product_id: product.id,
                    }}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          renderEmptyMessage(category)
        )}
      </Card>
    );
  };

  const {
    data: cosmetics,
    isLoading: cosmeticsLoading,
    isError: cosmeticsError,
    isSuccess: isCosmeticsSuccess,
  } = useFetchProductsQuery({ category: "cosmetics" });

  const {
    data: petproducts,
    isLoading: petProductsLoading,
    isError: petProductsError,
    isSuccess: isPetProductsSuccess,
  } = useFetchProductsQuery({ category: "petproducts" });

  useEffect(() => {
    if (petProductsError) {
      dispatch(
        openSnackbar({
          message: "Failed to fetch Pet Products!",
          severity: "error",
        })
      );
    }

    if (cosmeticsError) {
      dispatch(
        openSnackbar({
          message: "Failed to fetch Cosmetics!",
          severity: "error",
        })
      );
    }
  }, [petProductsError, cosmeticsError, dispatch]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Carousel />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box bgcolor="primary.main" color="white" py={5} textAlign="center">
          <Typography variant="h4">WELCOME TO ANDOCS</Typography>
          <Typography variant="subtitle1">
            Place Your First Order Now !!
          </Typography>
          <Typography variant="caption">
            Welcome Offer Use Coupon:- WELCOME50
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box bgcolor="error.main" color="white" py={5} textAlign="center">
          <Typography variant="h4">SALE IS LIVE NOW</Typography>
          <Typography variant="subtitle1">
            5% Instant Discount on Axis Bank Credit and Debit Card
          </Typography>
          <Typography variant="caption">
            Terms and Conditions Applied (For details visit Bank's official
            Website)
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={4}>
          <Typography variant="h4">Cosmetics</Typography>
          {cosmeticsLoading ? renderLoader() : null}
          {isCosmeticsSuccess
            ? renderProductSwiper(cosmetics || [], "cosmetics")
            : null}
          {cosmeticsError ? renderError("Error fetching cosmetics!") : null}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={4}>
          <Typography variant="h4">Pet Products</Typography>
          {petProductsLoading ? renderLoader() : null}
          {isPetProductsSuccess
            ? renderProductSwiper(petproducts || [], "pet products")
            : null}
          {petProductsError
            ? renderError("Error fetching pet products!")
            : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
