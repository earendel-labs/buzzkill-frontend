import { Theme } from "@mui/material/styles";

const tabStyles = (theme: Theme) => ({
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: theme.palette.Gold.main, // Gold color for the tab line
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontSize: "1.5rem", // Larger font size
        fontFamily: '"Vera Humana 95", "Poppins"',
        textTransform: "none", // Keep text case as provided
        fontWeight: "normal",
        "&.Mui-selected": {
          fontWeight: "bold", // Bold when selected
          color: theme.palette.Gold.main, // Gold color for the selected tab
        },
      },
    },
  },
});

export default tabStyles;
