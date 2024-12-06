import { Theme } from "@mui/material/styles";

const linkStyles = (theme: Theme) => ({
  MuiLink: {
    styleOverrides: {
      root: {
        fontFamily: theme.typography.fontFamily,
        "&.linkStyle1": {
          color: "#ffffff",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "500",
          "&:hover": {
            color: theme.palette.LightBlue.main,
          },
          "&:active": {
            color: theme.palette.LightBlue.dark,
          },
        },
        "&.linkStyle2": {
          color: "#ffffff",
          fontSize: "22px",
          fontWeight: "800",
          textDecoration: "none",
          "&:hover": {
            color: theme.palette.LightBlue.main,
          },
          "&:active": {
            color: theme.palette.LightBlue.dark,
          },
        },
      },
    },
  },
});

export default linkStyles;
