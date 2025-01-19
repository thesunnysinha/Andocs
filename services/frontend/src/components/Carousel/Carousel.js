import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Typography, IconButton, Button } from "@mui/material";
import slider1 from "./images/slider1.jpeg";
import slider2 from "./images/slider2.jpg";
import slider3 from "./images/slider3.jpg";

const carouselData = [
  {
    image: slider1,
    caption: "Cosmetics",
  },
  {
    image: slider2,
    caption: "Pet Products",
  },
  {
    image: slider3,
    caption: "Special Offers",
  },
];

const Carousel = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrevClick = () => {
    setActiveIndex(
      (activeIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % carouselData.length);
  };

  return (
    <Box position="relative" height={400} width="100%" overflow="hidden">
      {/* Full-Screen Background Image for Carousel Section */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgba(0, 0, 0, 0.4)" // Darker overlay for better readability
        transition="all 0.5s ease"
      >
        <img
          src={carouselData[activeIndex].image}
          alt={carouselData[activeIndex].caption}
          style={{
            objectFit: "cover", // Ensures the image covers the area completely
            width: "100%",
            height: "100%",
            borderRadius: "15px", // Rounded corners for a modern look
            transition: "all 0.7s ease-in-out", // Smooth transition between images
          }}
        />
      </Box>

      {/* Carousel Content */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white"
        zIndex={2}
        sx={{
          opacity: 0.9,
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Adds text shadow for better visibility
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          {carouselData[activeIndex].caption || "Welcome to Our Store"}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "30px", // Rounded button for a modern look
            padding: "12px 24px",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
            boxShadow: 2, // Subtle shadow for the button
          }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Navigation Arrows */}
      <Box position="absolute" top="50%" left={20} zIndex={3}>
        <IconButton
          onClick={handlePrevClick}
          sx={{
            color: "white",
            padding: 2,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowBackIos fontSize="large" />
        </IconButton>
      </Box>
      <Box position="absolute" top="50%" right={20} zIndex={3}>
        <IconButton
          onClick={handleNextClick}
          sx={{
            color: "white",
            padding: 2,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowForwardIos fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Carousel;
