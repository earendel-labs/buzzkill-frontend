import { Theme } from "@mui/material/styles";

const linkStyles = (theme: Theme) => ({
  MuiLink: {
    styleOverrides: {
      root: {
        "&.linkStyle1": {
          color: "#ffffff",
          textDecoration: "none",
          fontSize: "16px",
          "&:hover": {
            color: theme.palette.GoldFaded.main,
          },
          "&:active": {
            color: theme.palette.Gold.light,
          },
        },
        "&.linkStyle2": {
          fontSize: "18px",
          fontWeight: theme.typography.h6.fontWeight,
          color: theme.palette.text.primary,
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
