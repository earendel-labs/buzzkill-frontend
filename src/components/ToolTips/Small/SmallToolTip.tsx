import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SmallToolTipProps {
  title: string;
  contentLabel?: string; // Mark contentLabel as optional
  contentValue?: string; // Mark contentValue as optional
}

const SmallToolTip: React.FC<SmallToolTipProps> = ({
  title,
  contentLabel,
  contentValue,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url('/Frames/ToolTips/smallToolTip.svg')`,
        backgroundSize: "cover", // Ensure the image scales to fit the container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex", // Fit content
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "250px",
        height: "130px",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          color: "white",
          letterSpacing: "normal",
        }}
      >
        {title}
      </Typography>
      {contentLabel && contentValue && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "150px",
          }}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              color: theme.palette.Gold.main,
              fontWeight: "bold",
              letterSpacing: "normal",
            }}
          >
            {contentLabel}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: "normal",
            }}
          >
            {contentValue}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SmallToolTip;
