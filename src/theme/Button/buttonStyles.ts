import { Theme } from "@mui/material/styles";

const buttonStyles = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: '"Vera Humana 95", "Poppins"',
        fontSize: "18px",
        fontWeight: "600",
        textTransform: "none",
        padding: "10px 20px", // Ensure this is consistent for both buttons
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: "8px",
        borderStyle: "solid",
        boxSizing: "border-box",
        height: "auto", // Ensure height is not fixed but flexible

        "&.goldButton, &.blueConnectWallet": {
          borderWidth: "0px",
          padding: "12px 20px", // Ensure same padding for both buttons
        },

        "&.goldButton": {
          backgroundColor: theme.palette.Gold.main,
          color: "#fff",
          borderColor: theme.palette.GoldFaded.main,
          borderWidth: "1.25px",
          "&:hover": {
            backgroundColor: theme.palette.Gold.dark,
          },
          "&:active": {
            backgroundColor: theme.palette.Gold.light,
          },
        },

        "&.blueButton": {
          backgroundColor: "#568ddb",
          color: "#fff",
          borderColor: theme.palette.DarkBlue.main,
          "&:hover": {
            backgroundColor: "#4272ce",
            color: "#fff",
            borderColor: theme.palette.Gold.main,
          },
          "&:active": {
            backgroundColor: "#385fbd",
            color: "#fff",
            borderColor: theme.palette.DarkBlue.light,
          },
          "&.Mui-disabled": {
            backgroundColor: "#222e50",
            color: "#385fbd",
            borderColor: "#222e50",
          },
        },

        "&.blueConnectWallet": {
          backgroundColor: theme.palette.DarkBlue.main,
          color: "#fff",
          borderColor: theme.palette.DarkBlue.dark,
          borderWidth: "1.25px",
          "&:hover": {
            backgroundColor: "#4272ce",
            color: "#fff",
            borderColor: theme.palette.DarkBlue.light,
          },
          "&:active": {
            backgroundColor: "#385fbd",
            color: "#fff",
            borderColor: theme.palette.DarkBlue.light,
          },
          "&.Mui-disabled": {
            backgroundColor: "#222e50",
            color: "#385fbd",
            borderColor: "#222e50",
          },
        },

        "&.primaryButton": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 30px",
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
