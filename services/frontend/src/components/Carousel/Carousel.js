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
    caption: "",
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
    <Box position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={500}
        bgcolor={theme.palette.white}
      >
        <img
          src={carouselData[activeIndex].image}
          alt={carouselData[activeIndex].caption}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Box>
      <Box
        position="absolute"
        bottom={20}
        left={0}
        right={0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color={theme.palette.common.black}
        opacity={0.7}
      >
        <Button>
          <Typography variant="h6">
            {carouselData[activeIndex].caption}
          </Typography>
        </Button>
      </Box>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        display="flex"
        alignItems="center"
      >
        <IconButton onClick={handlePrevClick} disabled={activeIndex === 0}>
          <ArrowBackIos />
        </IconButton>
      </Box>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
      >
        <IconButton
          onClick={handleNextClick}
          disabled={activeIndex === carouselData.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Carousel;
