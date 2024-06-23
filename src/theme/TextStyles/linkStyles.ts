import { Theme } from "@mui/material/styles";

const linkStyles = (theme: Theme) => ({
  MuiLink: {
    styleOverrides: {
      root: {
        "&.linkStyle1": {
          color: "#ffffff",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "500",
          "&:hover": {
            color: theme.palette.GoldFaded.main,
          },
          "&:active": {
            color: theme.palette.Gold.light,
          },
        },
        "&.linkStyle2": {
          color: "#ffffff",
          fontSize: "20px",
          fontWeight: "500",
          textDecoration: "none",
          "&:hover": {
            color: theme.palette.GoldFaded.main,
          },
          "&:active": {
            color: theme.palette.Gold.light,
          },
        },
      },
    },
  },
});

export default linkStyles;
