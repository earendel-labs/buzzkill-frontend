import { Theme } from "@mui/material/styles";
import { white } from "tailwindcss/colors";

const buttonStyles = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: '"Vera Humana 95", "Poppins"',
        fontSize: "18px",

        fontWeight: "600",
        textTransform: "none",
        padding: "5px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: "1px",
        borderStyle: "solid",
        boxSizing: "border-box",
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
          color: "#fff",
          borderColor: theme.palette.DarkBlue.main,
          "&:hover": {
            backgroundColor: theme.palette.DarkBlue.dark,
            borderColor: theme.palette.Blue.main,
          },
          "&:active": {
            backgroundColor: theme.palette.DarkBlue.light,
            borderColor: theme.palette.DarkBlue.light,
          },
        },
        "&.primaryButton": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px 30px",
          position: "relative",
          boxSizing: "border-box",
          background:
            "linear-gradient(0deg, #68341B 0.01%, #E9B743 62%, #E9B743 95.5%, #F1B322 100%)",

          "&:hover": {
            background:
              "linear-gradient(0deg, #68341B 0.01%, #E9B743 62%, #E9B743 95.5%, #F1B322 100%)",
          },
        },
      },
    },
  },
});

export default buttonStyles;
