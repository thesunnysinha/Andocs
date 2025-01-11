import React, { useState, useEffect, useMemo } from "react";
import { useParams,Link } from "react-router-dom";
import { Grid, Card, Typography, Tabs, Tab, Box } from "@mui/material";
import Comment from "./Comment";
import Detail from "./Detail";
import { useFetchProductDetailQuery,useFetchProductRecommendationQuery } from "../../services/fetchProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.min.css";
import ProductCard from "../ProductCard/ProductCard";
import { Card as CardBoot } from "react-bootstrap";
import { getToken } from "../../services/LocalStorageService";



const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ProductDetail = (props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { id } = useParams();
  const { access_token } = getToken();
  const { data, isSuccess, error } = useFetchProductDetailQuery(id);
  const 
    {
      data: recommendedData,
      isSuccess: recommendedisSuccess,
      error: recommendedError,
    }
   = useFetchProductRecommendationQuery(access_token);
  const [relatedProduct,setRelatedProduct] = useState([]);
  const [recommendedProduct, setRecommendedProduct] = useState([]);
  const [productDetail, setProductDetail] = useState({
    title: "",
    selling_price:"",
    description:"",
    brand:"",
    discounted_price:"",
    product_image: "",
    average_rating: 0,
    id : 0,
  });
  

  useEffect(() => {
    if (data && isSuccess) {
      setProductDetail({
        title: data.productDetail.title,
        description: data.productDetail.description,
        selling_price: data.productDetail.selling_price,
        discounted_price: data.productDetail.discounted_price,
        brand: data.productDetail.brand,
        product_image: data.productDetail.product_image,
        average_rating: data.productDetail.average_rating,
        product_id : data.productDetail.id,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (data && isSuccess) {
      setRelatedProduct(data.relatedProduct);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (recommendedData && recommendedisSuccess) {
      setRecommendedProduct(recommendedData);
    }
  }, [recommendedData, recommendedisSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useMemo(() => {
    if (recommendedError) {
      console.error(recommendedError);
    }
  }, [recommendedError]);

  return (
    <>
      <Grid container sx={{ height: "90vh" }}>
        <Grid
          item
          xs ={12}
          md={5}
          sx={{
            backgroundImage: `url(http://127.0.0.1:8000${productDetail.product_image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            display: { xs: "none", sm: "block" },
          }}
        ></Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ mx: 3, height: 530 }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={handleChange}
                >
                  <Tab
                    label="Product Details"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  ></Tab>
                  <Tab
                    label="Comment"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  ></Tab>
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Detail productDetail={productDetail} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Comment product_id={id} />
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <div className="row">
            <div className="col-12">
              <h2>Related Products</h2>
            </div>
            <div className="col-12">
              <Swiper
                freeMode={true}
                grabCursor={true}
                className="mySwiper"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
              >
                {relatedProduct &&
                  relatedProduct.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="overflow-hidden rounded p-0 bg-light">
                        <Link to={`/products/${product.id}`}>
                          <CardBoot.Img
                            variant="top"
                            src={`http://127.0.0.1:8000${product.product_image}`}
                          />
                        </Link>
                      </div>
                      <ProductCard
                        data={{
                          selling_price: product.selling_price,
                          discounted_price: product.discounted_price,
                          title: product.title,
                          discount_percent: product.discount_percent,
                          product_id: product.id,
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </Grid>
      </Grid>
      {access_token ? (
        <Grid container justifyContent="center">
          <Grid item sm={10}>
            <div className="row">
              <div className="col-12">
                <h2>Recommended Products</h2>
              </div>
              <div className="col-12">
                <Swiper
                  freeMode={true}
                  grabCursor={true}
                  className="mySwiper"
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 15,
                    },
                    1280: {
                      slidesPerView: 5,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {recommendedProduct &&
                    recommendedProduct.map((product) => (
                      <SwiperSlide key={product.id}>
                        <div className="overflow-hidden rounded p-0 bg-light">
                          <Link to={`/products/${product.id}`}>
                            <CardBoot.Img
                              variant="top"
                              src={`http://127.0.0.1:8000${product.product_image}`}
                            />
                          </Link>
                        </div>
                        <ProductCard
                          data={{
                            selling_price: product.selling_price,
                            discounted_price: product.discounted_price,
                            title: product.title,
                            discount_percent: product.discount_percent,
                            product_id: product.id,
                          }}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "center" }}>
        </Typography>
      )}
    </>
  );
};

export default ProductDetail;
