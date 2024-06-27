import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton"; // Adjust the import path as needed
import LargeTallToolTip from "@/components/ToolTips/LargeTall/LargeTallToolTip"; // Adjust the import path as needed

interface ResourcePressedProps {
  resourceType: string;
  resourceAvailable: string;
  onForageClick: () => void; // Callback for Forage button click
}

const ResourcePressed: React.FC<ResourcePressedProps> = ({
  resourceType,
  resourceAvailable,
  onForageClick,
}) => {
  const theme = useTheme();

  return (
    <LargeTallToolTip>
      <Box
        sx={{
          width: "240px", // Adjust width as needed
          padding: "10px",
          gap: "12px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundSize: "contain", // Ensure the image scales to fit the container
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            fontSize: "22px",
            lineHeight: "100%",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            color: "#FFFFFF",
            marginBottom: "10px",
          }}
        >
          {resourceType}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <Typography variant="ToolTipLabel">Availability</Typography>
          <Typography variant="ToolTipValue">{resourceAvailable}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <PrimaryButton text="Forage" onClick={onForageClick} />
        </Box>
      </Box>
    </LargeTallToolTip>
  );
};

export default ResourcePressed;
