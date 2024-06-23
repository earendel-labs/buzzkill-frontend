import { Theme } from "@mui/material/styles";

const buttonStyles = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: "16x",
        fontWeight: "600",
        textTransform: "none",
        padding: "5px 30px 5px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: "2px",
        orderStyle: "solid",
        boxSizing: "border-box",
        color: "#ffffff",
        "&.goldButton": {
          backgroundColor: theme.palette.Orange.main,
          color: theme.palette.Gold.contrastText,
          borderColor: theme.palette.Gold.main,
          "&:hover": {
            backgroundColor: theme.palette.Gold.dark,
            borderColor: theme.palette.Gold.dark,
          },
          "&:active": {
            backgroundColor: theme.palette.Gold.light,
            borderColor: theme.palette.Gold.light,
          },
        },
        "&.blueButton": {
          backgroundColor: theme.palette.Blue.main,
          color: theme.palette.Blue.contrastText,
          borderColor: theme.palette.Blue.main,
          "&:hover": {
            backgroundColor: theme.palette.Blue.dark,
            borderColor: theme.palette.Blue.dark,
          },
          "&:active": {
            backgroundColor: theme.palette.Blue.light,
            borderColor: theme.palette.Blue.light,
          },
        },
      },
    },
  },
});

export default buttonStyles;
