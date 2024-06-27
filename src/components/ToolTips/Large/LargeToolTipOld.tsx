import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton"; // Adjust the import path as needed

interface LargeToolTipProps {
  title: string;
  contentLabel?: string; // Mark contentLabel as optional
  contentValue?: string; // Mark contentValue as optional
  isHive?: boolean; // Add isHive as an optional parameter
  additionalLabel1?: string; // Additional label 1
  additionalValue1?: string; // Additional value 1
  additionalLabel2?: string; // Additional label 2
  additionalValue2?: string; // Additional value 2
  primaryButtonClick?: () => void; // Callback for primary button click, optional
  secondaryButtonClick?: () => void; // Callback for secondary button click, optional
}

const LargeToolTip: React.FC<LargeToolTipProps> = ({
  title,
  contentLabel,
  contentValue,
  isHive = false, // Default to false
  additionalLabel1,
  additionalValue1,
  additionalLabel2,
  additionalValue2,
  primaryButtonClick,
  secondaryButtonClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        padding: "20px", // Adjust padding if content is not provided
        backgroundImage: `url('/Frames/ToolTips/LargeToolTip.svg')`,
        backgroundSize: "contain", // Ensure the image scales to fit the container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "inline-flex", // Fit content
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "280px", // Fixed width for the tooltip
        height: "170px", // Dynamic height based on content
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          marginBottom: "5px", // Margin between title and first label
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
            width: "100%",
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
      {isHive && additionalLabel1 && additionalValue1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
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
            {additionalLabel1}
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
            {additionalValue1}
          </Typography>
        </Box>
      )}
      {isHive && additionalLabel2 && additionalValue2 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
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
            {additionalLabel2}
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
            {additionalValue2}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: isHive ? "space-between" : "center",
          gap: isHive ? "2px" : "0",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {primaryButtonClick && (
          <PrimaryButton text="Primary" onClick={primaryButtonClick} />
        )}
        {isHive && secondaryButtonClick && (
          <PrimaryButton text="Secondary" onClick={secondaryButtonClick} />
        )}
      </Box>
    </Box>
  );
};

export default LargeToolTip;
