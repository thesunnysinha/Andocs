import {
  Typography,
  Paper,
  Table,
  Box,
  Grid,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import { useUserOrderDetailQuery } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import React, { useEffect, useState, useMemo } from "react";
import "./Orders.css";

const OrderDetail = ({ selectedOrder }) => {
  const { access_token } = getToken();
  const { data, isSuccess, error } = useUserOrderDetailQuery({
    access_token: access_token,
    order_id: selectedOrder.id,
  });
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (data && isSuccess) {
      setProducts(data);
    }
  }, [data, isSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Order Details" />
        <Tab label="Order Products" />
      </Tabs>
      {value === 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Order Detail
          </Typography>
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Order ID</Typography>
                <Typography variant="body2">{selectedOrder.id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Order Status</Typography>
                <Typography variant="body2">{selectedOrder.status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Order Date</Typography>
                <Typography variant="body2">
                  {selectedOrder.date_added}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Payment Method</Typography>
                <Typography variant="body2">
                  {selectedOrder.payment_method}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Payment Status</Typography>
                <Typography variant="body2">
                  {selectedOrder.payment_status}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="body2">
                  {selectedOrder.total_amount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Transaction ID</Typography>
                <Typography variant="body2">
                  {selectedOrder.transaction_id}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Shipping Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Full Name</Typography>
                <Typography variant="body2">
                  {selectedOrder.address_name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Address Line</Typography>
                <Typography variant="body2">
                  {selectedOrder.address_address}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">City</Typography>
                <Typography variant="body2">
                  {selectedOrder.address_city}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">State/Province</Typography>
                <Typography variant="body2">
                  {selectedOrder.address_state}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Zip/Postal Code</Typography>
                <Typography variant="body2">
                  {selectedOrder.address_pincode}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Mobile Number</Typography>
                <Typography variant="body2">
                  {selectedOrder.address_mobile_number}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {value === 1 && (
        <>
          <Typography variant="h5" gutterBottom>
            Order Products
          </Typography>
          <Paper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Products</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    onClick={() =>
                      (window.location.href = `/products/${product.product_id}/`)
                    }
                  >
                    <TableCell>
                      <img
                        src={`http://127.0.0.1:8000${product.product_image}`}
                        alt="img"
                        style={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{product.product_title}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      Rs. {product.product_discounted_price}
                    </TableCell>
                    <TableCell>Rs. {product.product_total_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Box>
            <div className="pagination-center">
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </Box>
        </>
      )}
    </>
  );
};

export default OrderDetail;
