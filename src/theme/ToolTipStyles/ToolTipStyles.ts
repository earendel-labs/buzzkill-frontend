import { Theme } from "@mui/material/styles";

const toolTipStyles = (theme: Theme) => ({
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: theme.palette.GoldFaded.main, // Use GoldFaded for the tooltip background
        padding: "8px 16px", // Default padding
        fontFamily: theme.typography.fontFamily,
        fontSize: "0.875rem", // Adjust size as needed
        color: theme.palette.text.primary, // Default text color from the theme
        borderRadius: "4px", // Optional: adjust border radius as needed
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Optional: add shadow for better visibility
      },
      arrow: {
        color: theme.palette.GoldFaded.main, // Set arrow color to match the tooltip background
      },
    },
  },
});

export default toolTipStyles;
