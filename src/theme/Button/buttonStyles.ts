import { Theme } from "@mui/material/styles";

const buttonStyles = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: "18px",
        fontWeight: "800",
        textTransform: "none",
        padding: "10px 20px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        borderStyle: "solid",
        boxSizing: "border-box",
        height: "auto",  

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

        "&.goldButton": {
          backgroundColor: theme.palette.Gold.main,
          color: "#2E2E2E",
          borderColor: theme.palette.Gold.dark,
          borderWidth: "1.25px",
          "&:hover": {
            backgroundColor: theme.palette.Gold.light,
            color: "#fff",
            borderColor: theme.palette.Gold.light,
          },
          "&:active": {
            backgroundColor: theme.palette.Gold.light,
            color: "#fff",
            borderColor: theme.palette.Gold.light,
          },
          "&.Mui-disabled": {
            backgroundColor: "#222e50",
            color: "#385fbd",
            borderColor: "#222e50",
          },
        },

        "&.blueButton": {
          backgroundColor: "#1b48f5",
          color: "#fff",
          borderColor: theme.palette.DarkBlue.main,
          "&:hover": {
            backgroundColor: "#5992ff",
            color: "#fff",
            borderColor: theme.palette.Gold.main,
          },
          "&:active": {
            backgroundColor: "#8eb9ff",
            color: "#fff",
            borderColor: theme.palette.DarkBlue.light,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.DarkBlueFaded.dark,
            color: "#5e9dff",
            borderColor: theme.palette.DarkBlueFaded.dark,
          },
        },

        "&.oneIDRedButton": {
          backgroundColor: theme.palette.OneIDRed.light,
          padding: "4px 16px",
          borderRadius: "6px",
          color: "#fff",
          borderColor: theme.palette.OneIDRed.light,
          "&:hover": {
            backgroundColor: theme.palette.OneIDRed.dark,
            color: "#fff",
            borderColor: theme.palette.OneIDRed.dark,
          },
          "&:active": {
            backgroundColor: theme.palette.OneIDRed.light,
            color: "#fff",
            borderColor: theme.palette.OneIDRed.light,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.OneIDRedFaded.dark,
            color: "#9c4b48",
            borderColor: theme.palette.OneIDRedFaded.dark,
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
