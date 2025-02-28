import { Theme } from "@mui/material/styles";

const buttonStyles = (theme: Theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: "18px",
        fontWeight: "800",
        textTransform: "none",
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
          padding: "10px 20px",
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
          padding: "10px 20px",
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
          padding: "10px 20px",
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

        "&.orangeButton": {
          backgroundColor: theme.palette.Orange.main,
          color: "#fff",
          padding: "10px 20px",
          borderColor: theme.palette.Orange.main,
          "&:hover": {
            backgroundColor: theme.palette.Orange.light,
            color: "#fff",
            borderColor: theme.palette.Orange.light,
          },
          "&:active": {
            backgroundColor: theme.palette.Orange.dark,
            color: "#fff",
            borderColor: theme.palette.Orange.dark,
          },
          "&.Mui-disabled": {
            backgroundColor: "#692d1e",
            color: "#9b4322",
            borderColor: "#692d1e",
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

        // New Figma-based style variant
        "&.figmaButton": {
          background:
            "linear-gradient(0deg,rgb(142, 72, 39) 0.01%, #E9B743 62%, #E9B743 95.5%, #F1B322 100%)",
          border: "3px solid #4d2614",
          color: "#fff",
          borderRadius: "4px",
          "&:hover": {
            background:
              "radial-gradient(78.22% 240.77% at 50% 50%, #E9B743 4.86%, #E9B743 36.11%, #E9B743 73.5%, #7A4621 100%)",
            boxShadow:
              "inset -2px -2px 22px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
          },
          "&:active": {
            background:
              "radial-gradient(78.22% 240.77% at 50% 50%, #E9B743 4.86%, #E9B743 36.11%, #E9B743 73.5%, #7A4621 100%)",
            border: "2px solid #DCA425",
            boxShadow:
              "inset 2px 2px 20px rgba(0, 0, 0, 0.25), inset -2px -2px 20px rgba(0, 0, 0, 0.25)",
          },
          "&.Mui-disabled": {
            background:
              "radial-gradient(78.22% 240.77% at 50% 50%, #D0AC57 0%, #A98E51 0.01%, #A5863D 37%, #74553F 100%)",
            border: "2px solid #C6A864",
            boxShadow:
              "inset 2px 2px 20px rgba(0, 0, 0, 0.25), inset -2px -2px 20px rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  },
});

export default buttonStyles;
