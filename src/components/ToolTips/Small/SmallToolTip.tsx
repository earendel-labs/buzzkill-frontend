import React, { useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SmallToolTipProps {
  title: string;
  contentLabel?: string; // Mark contentLabel as optional
  contentValue?: string; // Mark contentValue as optional
  isAction?: boolean; // New optional prop to determine if tooltip acts as a modal
  onButtonClick?: () => void; // Callback for button click
  onClose?: () => void; // Callback to close the tooltip
}

const SmallToolTip: React.FC<SmallToolTipProps> = ({
  title,
  contentLabel,
  contentValue,
  isAction = false, // Default to false
  onButtonClick,
  onClose,
}) => {
  const theme = useTheme();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (isAction) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isAction]);

  return (
    <Box
      ref={tooltipRef}
      sx={{
        position: "relative",
        padding: "20px 40px",
        backgroundImage: `url('/Frames/ToolTips/smallToolTip.svg')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "auto",
        height: "auto",
        zIndex: isAction ? 2000 : "auto", // High z-index for modal
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          marginBottom: "5px",
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
            minWidth: "200px",
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
      {isAction && onButtonClick && (
        <Button
          onClick={onButtonClick}
          variant="contained"
          color="primary"
          sx={{ marginTop: "10px" }}
        >
          Action Button
        </Button>
      )}
    </Box>
  );
};

export default SmallToolTip;
