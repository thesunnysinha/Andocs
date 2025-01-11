import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Pagination,
  Box,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFetchProductsQuery } from "../../../services/fetchProduct";

const Cosmetics = () => {
  const { data: cosmeticsData } = useFetchProductsQuery({
    category: "cosmetics",
  });
  const [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handlePriceRangeClick = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const productsPerPage = 6;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  let filteredData = cosmeticsData ? [...cosmeticsData] : [];

  if (selectedBrand !== "") {
    filteredData = filteredData.filter((product) =>
      product.brand.toLowerCase().includes(selectedBrand.toLowerCase())
    );
  }
  if (selectedPriceRange === "below1000") {
    filteredData = filteredData.filter(
      (product) => product.discounted_price < 1000
    );
  } else if (selectedPriceRange === "above1000") {
    filteredData = filteredData.filter(
      (product) => product.discounted_price >= 1000
    );
  }

  const productsToShow = filteredData.slice(startIndex, endIndex);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Typography variant="h5">Filters:</Typography>
        <hr />
        <Paper className="filters">
          <Typography variant="h6" gutterBottom>
            Brands
          </Typography>
          <ul>
            <li>
              <a href="#" onClick={() => handleBrandClick("")}>
                All Brands
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleBrandClick("Loreal")}>
                Loreal
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleBrandClick("Lakme")}>
                Lakme
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleBrandClick("Biotique")}>
                Biotique
              </a>
            </li>
          </ul>
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          <ul>
            <li>
              <a href="#" onClick={() => handlePriceRangeClick("")}>
                All
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePriceRangeClick("below1000")}>
                Below 1000
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handlePriceRangeClick("above1000")}>
                Above 1000
              </a>
            </li>
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          {productsToShow.map((product) => (
            <Grid item xs={12} md={4} key={product.id}>
              <Paper className="product">
                <Link to={`/products/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="auto"
                    image={`http://127.0.0.1:8000${product.product_image}`}
                    alt={product.title}
                  />
                  <Typography variant="h6" className="product-title">
                    {product.title}
                  </Typography>
                </Link>
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="subtitle1"
                  className="product-price fs-5"
                >
                  <span className="discounted-price">
                    Rs. {product.discounted_price}{" "}
                    <small className="selling-price fw-light text-decoration-line-through">
                      {product.selling_price}{" "}
                    </small>
                    <small
                      style={{ color: "green" }}
                      className="discount-percent fw-dark"
                    >
                      {product.discount_percent}% off
                    </small>
                  </span>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} spacing={3}>
            <Box mt={2}>
              {cosmeticsData && (
                <div className="pagination-center">
                  <Pagination
                    count={Math.ceil(cosmeticsData.length / productsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cosmetics;
