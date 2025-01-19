import React, { useEffect, useState, useCallback } from "react";
import { Typography, Grid, Paper, Box, Pagination, Chip } from "@mui/material";
import { useFetchProductsMutation } from "../../services/fetchProduct";
import ProductCard from "./ProductCard"; // Assuming ProductCard is in the same directory
import { API_BASE_URL } from "../../services/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../features/snackbarSlice";

const Products = () => {
  const [fetchProducts] = useFetchProductsMutation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const [productsData, setProductsData] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const fetchProductsData = useCallback(async (category, brand, priceRange) => {
    const params = { category };
    if (brand) params.brand = brand;
    if (priceRange) params.priceRange = priceRange;

    const res = await fetchProducts(params);
    if (res.data) {
      setProductsData(res.data);
    } else if (res.error) {
      dispatch(openSnackbar(res.error.message, "error"));
    } else {
      dispatch(openSnackbar("Something went wrong", "error"));
    }
  }, [fetchProducts, dispatch]);

  useEffect(() => {
    fetchProductsData(category, selectedBrand, selectedPriceRange);
  }, [category, selectedBrand, selectedPriceRange, fetchProductsData]);

  const updateUrlParams = (brand, priceRange) => {
    const params = new URLSearchParams(location.search);
    if (brand) {
      params.set("brand", brand);
    } else {
      params.delete("brand");
    }
    if (priceRange) {
      params.set("priceRange", priceRange);
    } else {
      params.delete("priceRange");
    }
    navigate({ search: params.toString() });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleBrandClick = (brand) => {
    const newBrand = brand === "All Brands" ? "" : brand;
    setSelectedBrand(newBrand);
    updateUrlParams(newBrand, selectedPriceRange);
    fetchProductsData(category, newBrand, selectedPriceRange);
  };

  const handlePriceRangeClick = (priceRange) => {
    const newPriceRange = priceRange === "All" ? "" : priceRange.toLowerCase();
    setSelectedPriceRange(newPriceRange);
    updateUrlParams(selectedBrand, newPriceRange);
    fetchProductsData(category, selectedBrand, newPriceRange);
  };

  const productsPerPage = 6;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const productsToShow = productsData ? productsData.slice(startIndex, endIndex) : [];

  return (
    <Grid container spacing={3}>
      {/* Filters Section */}
      <Grid item xs={12} md={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Filters
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#fafafa" }}>
          <Typography variant="h6" gutterBottom>
            Brands
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {["All Brands", "Loreal", "Lakme", "Biotique"].map((brand) => (
              <Chip
                key={brand}
                label={brand}
                clickable
                onClick={() => handleBrandClick(brand)}
                sx={{
                  marginBottom: 1,
                  borderColor: selectedBrand === brand ? "primary.main" : "grey.400",
                  color: selectedBrand === brand ? "primary.main" : "inherit",
                  backgroundColor: selectedBrand === brand ? "rgba(25, 118, 210, 0.1)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                  },
                }}
              />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Price Range
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {["All", "Below 1000", "Above 1000"].map((price) => (
              <Chip
                key={price}
                label={price}
                clickable
                onClick={() => handlePriceRangeClick(price)}
                sx={{
                  marginBottom: 1,
                  borderColor: selectedPriceRange === price.toLowerCase() ? "primary.main" : "grey.400",
                  color: selectedPriceRange === price.toLowerCase() ? "primary.main" : "inherit",
                  backgroundColor: selectedPriceRange === price.toLowerCase() ? "rgba(25, 118, 210, 0.1)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* Product Cards Section */}
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          {productsToShow.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard data={{
                    selling_price: product.selling_price,
                    discounted_price: product.discounted_price,
                    title: product.title,
                    discount_percent: product.discount_percent,
                    product_id: product.id,
                    product_image: `${API_BASE_URL}${product.product_image}`,
                  }} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          {productsData && (
            <Pagination
              count={Math.ceil(productsData.length / productsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Products;