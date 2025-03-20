import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

interface LocationHeaderProps {
  text: string;
  position?: "absolute" | "relative";
  left?: string;
  top?: string;
  isHeader?: boolean;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({
  text,
  position = "absolute",
  left,
  top,
  isHeader = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if the background image is loaded

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.src = "/Frames/location-map-header.svg";
    img.onload = () => setIsLoaded(true);
  }, []);

  const styles = {
    absolute: {
      position: "absolute" as "absolute",
      top: top || "0px",
      left: left || "50%",
      transform: "translate(-50%, -100%)",
    },
    relative: {
      position: "relative" as "relative",
      top: top || "0px",
      left: left || "0px",
      transform: "none",
    },
  };

  // Calculate padding and sizes dynamically for both skeleton and the actual component
  const dynamicStyles = {
    padding: isHeader ? "2rem 3rem" : "1rem 2rem",
    fontSize: isHeader ? "2rem" : "1.5rem",
    "@media (max-width: 1440px)": {
      padding: isHeader ? "1.5rem 2.5rem" : "0.75rem 1.5rem",
      fontSize: isHeader ? "1.75rem" : "1.25rem",
    },
    "@media (max-width: 1024px)": {
      padding: isHeader ? "1rem 2rem" : "0.5rem 1rem",
      fontSize: isHeader ? "1.5rem" : "1rem",
    },
  };

  return (
    <Box
      sx={{
        ...styles[position],
        width: "auto",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {isLoaded ? (
        <Box
          sx={{
            width: "auto",
            padding: "1rem 2rem",
            textAlign: "center",
            backgroundImage: `url('/Frames/location-map-header.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "@media (max-width: 1440px)": {
              padding: isHeader ? "1.25rem 2.5rem" : "0.75rem 1.5rem", // Smaller padding on smaller screens
              backgroundSize: "90% 100%", // Scale down the background size
            },
            "@media (max-width: 1024px)": {
              padding: isHeader ? "1rem 2rem" : "1rem 2rem", // Even smaller padding on smaller screens
              backgroundSize: "80% 100%", // Further scale down the background size
            },
          }}
        >
          <Typography
            variant="h5" // Adjust variant based on isHeader
            component="div"
            sx={{
              color: "white",
              fontWeight: "700",
              width: "100%",
              ...dynamicStyles, // Use dynamic padding and font size
            }}
          >
            {text}
          </Typography>
        </Box>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{
            width: {
              xs: "6rem", // 96px
              sm: "8rem", // 128px
              md: "10rem", // 160px
              lg: "18.75rem", // 300px
              xl: "18.75rem", // 300px
              xxl: "20rem", // 320px
            },
            height: {
              xs: "1.6rem", // 26px
              sm: "2.5rem", // 40px
              md: "3rem", // 48px
              lg: "5rem", // 80px
              xl: "5rem", // 80px
              xxl: "5.5rem", // 88px
            },
            borderRadius: "4px", // Optional: if you want rounded corners on the skeleton
            backgroundColor: "#242E4E", // Skeleton color to match design
          }}
        />
      )}
    </Box>
  );
};

export default LocationHeader;
