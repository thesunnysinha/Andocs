import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Box textAlign="center">
        <CircularProgress color="primary" size={60} />
        <Typography
          variant="h6"
          mt={2}
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;
