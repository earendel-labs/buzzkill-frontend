import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import UserResourcesBackground from "@/components/User/UserResources/UserResourcesBackground";
interface MapHeaderProps {
  text: string;
}

const MapHeader: React.FC<MapHeaderProps> = ({ text }) => {
  const theme = useTheme();

  return (
    <UserResourcesBackground>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "white",
          fontWeight: "700",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "5px 20px", // Padding around the text
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: "1.7rem",
            lg: "2rem",
            xl: "2.5rem",
            xxl: "3rem",
          },
        }}
      >
        {text}
      </Typography>
    </UserResourcesBackground>
  );
};

export default MapHeader;
