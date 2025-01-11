import { React, useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
} from "@mui/material";
import { getToken } from "../../services/LocalStorageService";
import { useUserOrdersQuery } from "../../services/userAuthApi";
import OrderDetail from "./OrderDetail";

const Orders = () => {
  const styles = {
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "2rem",
    },
  };
  const { access_token } = getToken();
  const {
    data,
    isSuccess,
    error,
    isLoading: isOrdersLoading,
  } = useUserOrdersQuery({
    access_token: access_token,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data && isSuccess) {
      setOrders(data);
    }
  }, [data, isSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const handleOpenOrderDetail = (order) => {
    setSelectedOrder(order);
    setOpenOrderDetail(true);
  };
  const handleCloseOrderDetail = () => {
    setOpenOrderDetail(false);
  };
  return (
    <>
      <Modal open={openOrderDetail} onClose={handleCloseOrderDetail}>
        <div style={styles.paper}>
          <OrderDetail
            selectedOrder={selectedOrder}
            handleCloseOrderDetail={handleCloseOrderDetail}
          />
        </div>
      </Modal>
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      {orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Order Status</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Payment Method</TableCell>
                <TableCell align="right">Payment Status</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleOpenOrderDetail(order)}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">{order.status}</TableCell>
                  <TableCell align="right">{order.date_added}</TableCell>
                  <TableCell align="right">{order.payment_method}</TableCell>
                  <TableCell align="right">{order.payment_status}</TableCell>
                  <TableCell align="right">{order.total_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No Orders yet !</Typography>
      )}
    </>
  );
};

export default Orders;
