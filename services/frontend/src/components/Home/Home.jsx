import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import { Box, Grid, Typography, Card, Button, Container } from "@mui/material";
import { useFetchProductsMutation } from "../../services/fetchProduct";
import { openSnackbar } from "../../features/snackbarSlice";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../services/apiConfig";
import ProductCard from "../Products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

SwiperCore.use([Navigation, Pagination]);

const Home = () => {
  const dispatch = useDispatch();
  const [fetchProducts, { isError }] = useFetchProductsMutation();
  const [cosmetics, setCosmetics] = useState([]);
  const [petProducts, setPetProducts] = useState([]);

  const renderEmptyMessage = (category) => (
    <Typography
      variant="body1"
      sx={{
        textAlign: "center",
        color: "text.secondary",
        fontStyle: "italic",
        mb: 3,
      }}
    >
      No {category} available at the moment.
    </Typography>
  );

  const renderError = (errorMessage) => (
    <Typography
      color="error"
      variant="h6"
      sx={{
        textAlign: "center",
        fontWeight: "bold",
        mb: 3,
      }}
    >
      {errorMessage}
    </Typography>
  );

  const renderProductSwiper = (products, category) => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "primary.main", textAlign: "center", mb: 3 }}
      >
        {category}
      </Typography>
      {products.length > 0 ? (
        <Swiper
          freeMode={true}
          grabCursor={true}
          className="mySwiper"
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                  height: "100%",
                }}
              >
                <ProductCard
                  data={{
                    selling_price: product.selling_price,
                    discounted_price: product.discounted_price,
                    title: product.title,
                    discount_percent: product.discount_percent,
                    product_id: product.id,
                    product_image: `${API_BASE_URL}${product.product_image}`,
                  }}
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        renderEmptyMessage(category)
      )}
    </Box>
  );

  useEffect(() => {
    const fetchPetProducts = async () => {
      try {
        const res = await fetchProducts({ category: "P" });
        if (res.data) {
          setPetProducts(res.data);
        } else {
          dispatch(openSnackbar(res.error.message || "Error fetching pet products"));
        }
      } catch (error) {
        dispatch(openSnackbar(error.message, "error"));
      }
    };

    fetchPetProducts();
  }, [fetchProducts, dispatch]);

  useEffect(() => {
    const fetchCosmetics = async () => {
      try {
        const res = await fetchProducts({ category: "C" });
        if (res.data) {
          setCosmetics(res.data);
        } else {
          dispatch(openSnackbar(res.error.message || "Error fetching cosmetics"));
        }
      } catch (error) {
        dispatch(openSnackbar(error.message, "error"));
      }
    };

    fetchCosmetics();
  }, [fetchProducts, dispatch]);


  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", py: 6 }}>
      <Container>
        <Grid container spacing={6}>
          {/* Carousel Section */}
          <Grid item xs={12} md={8}>
            <Carousel />
          </Grid>

          {/* Welcome Banner */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                py: 5,
                px: 3,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 6,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                WELCOME TO ANDOCS
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Place Your First Order Now !!
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Use Coupon: <strong>WELCOME50</strong> to get a discount on
                your first order!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
                startIcon={<ShoppingCartIcon />}
              >
                Shop Now
              </Button>
              <Box
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "150%",
                  height: "150%",
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Grid>

          {/* Sale Banner */}
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "error.main",
                color: "white",
                py: 6,
                px: 4,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 6,
                position: "relative",
              }}
            >
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                SALE IS LIVE NOW
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Get 5% Instant Discount on Axis Bank Credit and Debit Cards
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Terms and conditions apply. Visit the bank's official website for
                more details.
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  width: "100%",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  "&:hover": { borderColor: "white", color: "white" },
                }}
                endIcon={<ShoppingCartIcon />}
              >
                View Offer
              </Button>
            </Box>
          </Grid>

          {/* Cosmetics Section */}
          <Grid item xs={12}>
            <Box sx={{ my: 5 }}>
              {isError ? (
                renderError("Error fetching cosmetics")
              ) : (
                renderProductSwiper(cosmetics, "Cosmetics")
              )}
            </Box>
          </Grid>

          {/* Pet Products Section */}
          <Grid item xs={12}>
            <Box sx={{ my: 5 }}>
              {isError ? (
                renderError("Error fetching pet products")
              ) : (
                renderProductSwiper(petProducts, "Pet Products")
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;