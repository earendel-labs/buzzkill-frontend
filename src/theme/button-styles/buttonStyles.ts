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
        borderRadius: "6px",
        borderStyle: "solid",
        boxSizing: "border-box",
        height: "auto",
        padding: "12px 24px",

        "&.blueConnectWallet": {
          backgroundColor: theme.palette.DarkBlue.main,
          color: "#fff",
          borderRadius: "6px",
          padding: "12px 24px",
          borderColor: theme.palette.DarkBlue.dark,
          borderWidth: "1.5px",
          "&:hover": {
            backgroundColor: "#4272ce",
            borderColor: theme.palette.DarkBlue.light,
          },
          "&.Mui-disabled": {
            backgroundColor: "#222e50",
            color: "#385fbd",
            borderColor: "#222e50",
          },
        },
        "&.darkBlueButton": {
          background: `linear-gradient(180deg, ${theme.palette.Blue.light} 0%, ${theme.palette.DarkBlue.main} 100%)`,
          color: "#fff",
          borderRadius: "6px",
          padding: "12px 24px",
          border: `2px solid ${theme.palette.Blue.light}`, // More visible outline
          boxShadow: "inset 0px -2px 4px rgba(0, 0, 0, 0.4)", // Subtle depth, no glow

          "&:hover": {
            background: `linear-gradient(180deg, ${theme.palette.Blue.main} 0%, ${theme.palette.DarkBlue.main} 100%)`,
            borderColor: theme.palette.Blue.main,
          },

          "&:active": {
            background: `linear-gradient(180deg, ${theme.palette.DarkBlue.main} 0%, ${theme.palette.DarkBlue.dark} 100%)`,
            borderColor: theme.palette.DarkBlue.dark,
            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.5)", // Slight press effect
          },

          "&.Mui-disabled": {
            background: `linear-gradient(180deg, ${theme.palette.DarkBlueFaded.light} 0%, ${theme.palette.DarkBlueFaded.dark} 100%)`,
            color: "#5e7bc7",
            borderColor: theme.palette.DarkBlueFaded.dark,
            opacity: 0.5,
          },
        },

        "&.goldButton": {
          background: "linear-gradient(180deg, #E9B743 0%, #C5972E 100%)",
          color: "#2E2E2E",
          borderRadius: "6px",
          border: "1px solid #8F6224",
          "&:hover": {
            background: "linear-gradient(180deg, #F1C75B 0%, #D4A141 100%)",
            color: "#fff",
            borderColor: theme.palette.Gold.light,
          },
          "&:active": {
            background: "linear-gradient(180deg, #D4A141 0%, #A67D2A 100%)",
          },
        },

        "&.blueButton": {
          background: "linear-gradient(180deg, #1b48f5 0%, #122a9e 100%)",
          color: "#fff",
          borderRadius: "6px",
          padding: "10px 24px",
          border: "1.5px solid #0E1C6A",
          "&:hover": {
            background: "linear-gradient(180deg, #2A4CAF 0%, #1C398A 100%)",
            borderColor: "#2C51A7",
          },
          "&:active": {
            background: "linear-gradient(180deg, #1C398A 0%, #122a9e 100%)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#1A1F3A", // Darker blue to make it clear it's disabled
            color: "#5e7bc7",
            borderColor: "#1A1F3A",
            opacity: 0.6,
          },
        },
        "&.blueButtonSmall": {
          background: `linear-gradient(180deg, ${theme.palette.Blue.light} 0%, ${theme.palette.Blue.main} 50%, ${theme.palette.Blue.dark} 100%)`,
          color: "#fff",
          borderRadius: "6px",
          border: `1.5px solid ${theme.palette.Blue.dark}`,
          boxSizing: "border-box",
          textTransform: "none",
          padding: "6px 16px", // Smaller padding for a compact button
          "&:hover": {
            background: `linear-gradient(180deg, ${theme.palette.Blue.main} 0%, ${theme.palette.Blue.light} 50%, ${theme.palette.Blue.dark} 100%)`,
            borderColor: theme.palette.Blue.dark,
          },
          "&:active": {
            background: `linear-gradient(180deg, ${theme.palette.Blue.dark} 0%, ${theme.palette.Blue.main} 50%, ${theme.palette.Blue.light} 100%)`,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.BlueFaded.main,
            color: theme.palette.text.secondary,
            borderColor: theme.palette.BlueFaded.main,
            opacity: 0.6,
          },
        },

        "&.orangeButton": {
          background:
            "linear-gradient(180deg, #D56217 0%, #9B3611 50%, #75290E 100%)",
          color: "#fff",
          adding: "8px 24px",
          borderRadius: "6px",
          border: "1px solid #6A220C",
          boxShadow:
            "inset 2px 2px 4px rgba(0, 0, 0, 0.25), inset -2px -2px 4px rgba(0, 0, 0, 0.25)",
          "&:hover": {
            background:
              "linear-gradient(180deg, #E07320 0%, #BA5614 50%, #8A320D 100%)",
            borderColor: "#8A320D",
          },
          "&:active": {
            background:
              "linear-gradient(180deg, #C75712 0%, #8C2E0C 50%, #5C1C08 100%)",
          },
          "&.Mui-disabled": {
            background:
              "linear-gradient(180deg, #8F4C24 0%, #6E2F14 50%, #4E1E0C 100%)", // Muted, less vibrant
            border: "1px solid #5A2612", // Subtle but clear border
            color: "#A87B5E", // Faded text color
            boxShadow:
              "inset 1px 1px 3px rgba(0, 0, 0, 0.2), inset -1px -1px 3px rgba(0, 0, 0, 0.2)",
          },
        },

        "&.oneIDRedButton": {
          background: "linear-gradient(180deg, #E24848 0%, #9A1E1E 100%)",
          borderRadius: "6px",
          border: "1.5px solid #7D1A1A",
          padding: "4px 16px",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(180deg, #FF5E5E 0%, #B42323 100%)",
          },
          "&:active": {
            background: "linear-gradient(180deg, #C93434 0%, #8B1919 100%)",
          },
        },
        
        "&.redButton": {
          background: "linear-gradient(180deg, #E24848 0%, #9A1E1E 100%)",
          color: "#fff",
          fontWeight: "bold",
          padding: "10px 24px",
          borderRadius: "6px",
          border: "1.5px solid #7D1A1A",
          boxShadow: "inset 0px -3px 6px rgba(0, 0, 0, 0.3)",

          "&:hover": {
            background: "linear-gradient(180deg, #FF5E5E 0%, #B42323 100%)",
            borderColor: "#B42323",
            boxShadow: "inset 0px -2px 5px rgba(0, 0, 0, 0.25)",
          },

          "&:active": {
            background: "linear-gradient(180deg, #C93434 0%, #8B1919 100%)",
            borderColor: "#8B1919",
            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.4)",
          },

          "&.Mui-disabled": {
            opacity: 0.6,
            background: "linear-gradient(180deg, #E24848 0%, #9A1E1E 100%)",
            boxShadow: "none",
          },
        },

        "&.primaryButton": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 30px",
          borderRadius: "6px",
          background: "linear-gradient(180deg, #E9B743 0%, #A56E28 100%)",
          border: "1.5px solid #7D511E",
          "&:hover": {
            background: "linear-gradient(180deg, #F1C75B 0%, #BE8435 100%)",
          },
        },
        "&.goldButtonHorizontal": {
          background: "linear-gradient(to right, #c9a227, #f0c850)", // Default gold gradient
          color: "black",
          fontWeight: "bold",
          padding: "8px 30px",
          borderRadius: "6px",
          border: "1px solid #8F6224",
          boxShadow: "inset 0px -3px 6px rgba(0, 0, 0, 0.3)", // Creates a subtle depth effect

          "&:hover": {
            background: "linear-gradient(to right, #e1bb50, #f5d470)", // Lighter gold gradient
            borderColor: "#e1bb50",
            boxShadow: "inset 0px -2px 5px rgba(0, 0, 0, 0.25)", // Softens the shadow on hover
          },

          "&:active": {
            background: "linear-gradient(to right, #f1c75b, #ffde80)", // Pressed state lighter gold
            borderColor: "#f1c75b",
            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.4)", // Press effect for depth
          },

          "&.Mui-disabled": {
            opacity: 0.6,
            background: "linear-gradient(to right, #c9a227, #f0c850)", // Keeps original gold when disabled
            boxShadow: "none", // Removes shadow effect for disabled state
          },
        },
        "&.goldOutlinedButton": {
          color: "#f0c850",
          padding: "10px 20px",
          border: "1.5px solid #c9a227",
          fontWeight: "bold",
          borderRadius: "6px",
          background: "transparent",
          transition: "all 0.2s ease-in-out",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle outer shadow for 3D depth

          "&:hover": {
            background: "rgba(240, 200, 80, 0.1)", // Light gold glow effect
            borderColor: "#f0c850",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.4)", // Slightly stronger shadow on hover
          },

          "&:active": {
            background: "rgba(240, 200, 80, 0.2)", // Slightly deeper glow on press
            borderColor: "#d4a141",
            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.5)", // Inset shadow for pressed effect
          },

          "&.Mui-disabled": {
            color: "#a88b4e",
            borderColor: "#a88b4e",
            background: "transparent",
            opacity: 0.5,
            boxShadow: "none", // Remove shadow for disabled state
          },
        },
        // **Figma Button - Only This One Uses the Special Disabled State**
        "&.figmaButton": {
          background:
            "linear-gradient(0deg,rgb(142, 72, 39) 0.01%, #E9B743 62%, #E9B743 95.5%, #F1B322 100%)",
          borderRadius: "6px",

          border: "2px solid #4d2614",
          color: "#fff",
          "&:hover": {
            background:
              "radial-gradient(78.22% 240.77% at 50% 50%, #E9B743 4.86%, #E9B743 36.11%, #E9B743 73.5%, #7A4621 100%)",
            boxShadow:
              "inset -2px -2px 22px rgba(0, 0, 0, 0.25), inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
          },
          "&.Mui-disabled": {
            background:
              "radial-gradient(78.22% 240.77% at 50% 50%, #D0AC57 0%, #A98E51 0.01%, #A5863D 37%, #74553F 100%)",
            border: "2px solid #C6A864",
          },
        },
      },
    },
  },
});

export default buttonStyles;
