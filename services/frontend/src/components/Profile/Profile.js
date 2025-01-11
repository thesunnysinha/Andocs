import React, { useState } from "react";
import { Button, Grid, Typography, Box, Avatar, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../services/apiConfig";

import ChangePassword from "../Auth/ChangePassword";
import ProfileTabs from "./ProfileTabs";
import useLogout from "../../services/logoutService";

const Profile = () => {
  const { user_data } = useSelector((state) => state.user);

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

  const { handleLogout } = useLogout();

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  return (
    <>
      <Modal open={openChangePassword} onClose={handleCloseChangePassword}>
        <div style={styles.paper}>
          <ChangePassword />
        </div>
      </Modal>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <Avatar
              src={`${API_BASE_URL}${user_data?.pic}`}
              style={{ width: 100, height: 100 }}
            />
          </Box>
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <Typography variant="subtitle1">{user_data?.username}</Typography>
          </Box>
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          </Box>

          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <Button
              onClick={handleChangePassword}
              variant="contained"
              color="primary"
            >
              Change Password
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={9} sx={{ textAlign: "center" }}>
          <ProfileTabs />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
