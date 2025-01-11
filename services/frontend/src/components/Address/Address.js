import React, { useState, useEffect, useMemo } from "react";
import "./Address.css";
import { useUserAddressQuery, useUserDeleteAddressMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { Button, Typography, Grid, Box, Modal } from "@mui/material";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import "./Address.css";

const Address = () => {
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
  const { data, isSuccess, error } = useUserAddressQuery(access_token);
  const [address, setAddress] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [deleteAddress] = useUserDeleteAddressMutation();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAddresses = address.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(address.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [openAddAddress, setOpenAddAddress] = useState(false);
  const handleOpenAddAddress = () => {
    setOpenAddAddress(true);
  };
  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
  };

  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const handleOpenEditAddress = (address) => {
    setSelectedAddress(address);
    setOpenEditAddress(true);
  };
  const handleCloseEditAddress = () => {
    setOpenEditAddress(false);
  };

  useEffect(() => {
    if (data && isSuccess) {
      setAddress(data);
    }
  }, [data, isSuccess]);

  useMemo(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleDeleteAddress = (address_id) => {
    if (!access_token) {
      return window.location.replace("/profile");
    }
    deleteAddress({ address_id: address_id, access_token: access_token })
      .then((response) => {
        console.log(response);
        reFetchAddress();
        // handle the successful response, for example, display a success message
      })
      .catch((error) => {
        console.log(error);
        // handle the error, for example, display an error message
      });
  };

  const { refetch: reFetchAddress } = useUserAddressQuery(access_token);

  const handleAddressChange = ()=> {
    reFetchAddress();
  }

  return (
    <div className="address-container">
      <Modal open={openAddAddress} onClose={handleCloseAddAddress}>
        <div style={styles.paper}>
          <AddAddress
            handleCloseAddAddress={handleCloseAddAddress}
            onAddressChange={handleAddressChange}
          />
        </div>
      </Modal>
      <Modal open={openEditAddress} onClose={handleCloseEditAddress}>
        <div style={styles.paper}>
          <EditAddress
            selectedAddress={selectedAddress}
            handleCloseEditAddress={handleCloseEditAddress}
            onAddressChange={handleAddressChange}
          />
        </div>
      </Modal>
      <Typography variant="h4">Address Book</Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddAddress}
        >
          Add Address
        </Button>
      </Box>
      <Box mt={2}>
        {address.length > 0 ? (
          <Grid container spacing={2}>
            {currentAddresses.map((address) => (
              <Grid item xs={12} sm={6} md={4} key={address.id}>
                <Box p={2} className="address-card">
                  <Typography variant="subtitle2">{address.name}</Typography>
                  <Typography variant="body2">{address.address}</Typography>
                  <Typography variant="body2">
                    {address.city} {address.state} {address.pincode}
                  </Typography>
                  <Typography variant="body2">
                    {address.mobile_number}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenEditAddress(address)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No addresses found</Typography>
        )}
      </Box>
      <div className="pagination-center">
        <Box mt={2}>
          <Grid container justify="center">
            {pageNumbers.map((number) => (
              <Button
                key={number}
                onClick={() => handlePageChange(number)}
                className={currentPage === number ? "selected-page" : ""}
              >
                {number}
              </Button>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Address;

