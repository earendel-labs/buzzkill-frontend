import type { Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

// Define keyframes for animations
const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3); }
  50% { box-shadow: 0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5); }
  100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3); }
`;

const blueGlowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(27, 72, 245, 0.5), 0 0 10px rgba(27, 72, 245, 0.3); }
  50% { box-shadow: 0 0 8px rgba(27, 72, 245, 0.7), 0 0 15px rgba(27, 72, 245, 0.5); }
  100% { box-shadow: 0 0 5px rgba(27, 72, 245, 0.5), 0 0 10px rgba(27, 72, 245, 0.3); }
`;

const redGlowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(226, 72, 72, 0.5), 0 0 10px rgba(226, 72, 72, 0.3); }
  50% { box-shadow: 0 0 8px rgba(226, 72, 72, 0.7), 0 0 15px rgba(226, 72, 72, 0.5); }
  100% { box-shadow: 0 0 5px rgba(226, 72, 72, 0.5), 0 0 10px rgba(226, 72, 72, 0.3); }
`;

const orangeGlowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(213, 98, 23, 0.5), 0 0 10px rgba(213, 98, 23, 0.3); }
  50% { box-shadow: 0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5); }
  100% { box-shadow: 0 0 5px rgba(213, 98, 23, 0.5), 0 0 10px rgba(213, 98, 23, 0.3); }
`;

const buttonShine = keyframes`
  0% { background-position: -100px; }
  40% { background-position: 300px; }
  100% { background-position: 300px; }
`;

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
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",

        // Common shine effect for all buttons
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          transition: "left 0.8s ease",
        },
        "&:hover::before": {
          left: "100%",
        },

        // Embossed text effect for all buttons
        "& .MuiButton-label": {
          textShadow:
            "0px 1px 1px rgba(255, 255, 255, 0.3), 0px -1px 1px rgba(0, 0, 0, 0.4)",
        },

        // Flat futuristic gold button (like our menu button)
        "&.futuristicGoldButton": {
          backgroundColor: "rgba(212, 175, 55, 0.8)",
          color: "#0F1C30",
          borderRadius: "6px",
          border: "1px solid rgba(212, 175, 55, 0.9)",
          fontWeight: 700,
          letterSpacing: "1px",
          // Remove default glow outline
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.9)",
            boxShadow:
              "0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5)",
            // Optionally, you can add animation here if desired:
            // animation: `${glowPulse} 4s infinite`,
          },
          "&:active": {
            backgroundColor: "rgba(212, 175, 55, 0.7)",
            boxShadow:
              "0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(212, 175, 55, 0.4)",
            color: "rgba(15, 28, 48, 0.6)",
            borderColor: "rgba(212, 175, 55, 0.4)",
            boxShadow: "none",
            animation: "none",
          },
        },

        // Flat futuristic blue button
        "&.futuristicBlueButton": {
          backgroundColor: "rgba(27, 72, 245, 0.8)",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid rgba(27, 72, 245, 0.9)",
          fontWeight: 700,
          letterSpacing: "1px",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(27, 72, 245, 0.9)",
            boxShadow:
              "0 0 8px rgba(27, 72, 245, 0.7), 0 0 15px rgba(27, 72, 245, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(27, 72, 245, 0.7)",
            boxShadow:
              "0 0 5px rgba(27, 72, 245, 0.4), 0 0 10px rgba(27, 72, 245, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(27, 72, 245, 0.4)",
            color: "rgba(255, 255, 255, 0.6)",
            borderColor: "rgba(27, 72, 245, 0.4)",
            boxShadow: "none",
            animation: "none",
          },
        },

        // Flat futuristic red button
        "&.futuristicRedButton": {
          backgroundColor: "rgba(226, 72, 72, 0.8)",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid rgba(226, 72, 72, 0.9)",
          fontWeight: 700,
          letterSpacing: "1px",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(226, 72, 72, 0.9)",
            boxShadow:
              "0 0 8px rgba(226, 72, 72, 0.7), 0 0 15px rgba(226, 72, 72, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(226, 72, 72, 0.7)",
            boxShadow:
              "0 0 5px rgba(226, 72, 72, 0.4), 0 0 10px rgba(226, 72, 72, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(226, 72, 72, 0.4)",
            color: "rgba(255, 255, 255, 0.6)",
            borderColor: "rgba(226, 72, 72, 0.4)",
            boxShadow: "none",
            animation: "none",
          },
        },

        // Flat futuristic orange button
        "&.futuristicOrangeButton": {
          backgroundColor: "rgba(213, 98, 23, 0.8)",
          color: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid rgba(213, 98, 23, 0.9)",
          fontWeight: 700,
          letterSpacing: "1px",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(213, 98, 23, 0.9)",
            boxShadow:
              "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(213, 98, 23, 0.7)",
            boxShadow:
              "0 0 5px rgba(213, 98, 23, 0.4), 0 0 10px rgba(213, 98, 23, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(213, 98, 23, 0.4)",
            color: "rgba(255, 255, 255, 0.6)",
            borderColor: "rgba(213, 98, 23, 0.4)",
            boxShadow: "none",
            animation: "none",
          },
        },

        // Blue connect wallet button
        "&.blueConnectWallet": {
          backgroundColor: "rgba(27, 72, 245, 0.8)",
          color: "#fff",
          borderRadius: "6px",
          padding: "12px 24px",
          border: "1px solid rgba(27, 72, 245, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(66, 114, 206, 0.9)",
            borderColor: "rgba(42, 76, 175, 0.9)",
            boxShadow:
              "0 0 8px rgba(27, 72, 245, 0.7), 0 0 15px rgba(27, 72, 245, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(27, 72, 245, 0.7)",
            boxShadow:
              "0 0 5px rgba(27, 72, 245, 0.4), 0 0 10px rgba(27, 72, 245, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(34, 46, 80, 0.8)",
            color: "rgba(56, 95, 189, 0.8)",
            borderColor: "rgba(34, 46, 80, 0.8)",
            boxShadow: "none",
          },
        },

        "&.darkBlueButton": {
          backgroundColor: "rgba(27, 72, 245, 0.8)",
          color: "#fff",
          borderRadius: "6px",
          padding: "12px 24px",
          border: "1px solid rgba(94, 123, 199, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(66, 114, 206, 0.9)",
            borderColor: "rgba(66, 114, 206, 0.9)",
            boxShadow:
              "0 0 8px rgba(27, 72, 245, 0.7), 0 0 15px rgba(27, 72, 245, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(18, 42, 158, 0.8)",
            borderColor: "rgba(18, 42, 158, 0.9)",
            boxShadow:
              "0 0 5px rgba(27, 72, 245, 0.4), 0 0 10px rgba(27, 72, 245, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(34, 46, 80, 0.6)",
            color: "rgba(94, 123, 199, 0.8)",
            borderColor: "rgba(26, 31, 58, 0.8)",
            opacity: 0.5,
            boxShadow: "none",
          },
        },

        "&.goldButton": {
          backgroundColor: "rgba(212, 175, 55, 0.8)",
          color: "#0F1C30",
          borderRadius: "6px",
          border: "1px solid rgba(212, 175, 55, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(241, 199, 91, 0.9)",
            color: "#fff",
            borderColor: "rgba(241, 199, 91, 0.9)",
            boxShadow:
              "0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(212, 161, 65, 0.8)",
            boxShadow:
              "0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(212, 175, 55, 0.5)",
            color: "rgba(15, 28, 48, 0.6)",
            borderColor: "rgba(212, 175, 55, 0.5)",
            boxShadow: "none",
          },
        },

        "&.blueButton": {
          backgroundColor: "rgba(27, 72, 245, 0.8)",
          color: "#fff",
          borderRadius: "6px",
          padding: "10px 24px",
          border: "1px solid rgba(14, 28, 106, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(42, 76, 175, 0.9)",
            borderColor: "rgba(44, 81, 167, 0.9)",
            boxShadow:
              "0 0 8px rgba(27, 72, 245, 0.7), 0 0 15px rgba(27, 72, 245, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(18, 42, 158, 0.8)",
            boxShadow:
              "0 0 5px rgba(27, 72, 245, 0.4), 0 0 10px rgba(27, 72, 245, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(26, 31, 58, 0.8)",
            color: "rgba(94, 123, 199, 0.8)",
            borderColor: "rgba(26, 31, 58, 0.8)",
            opacity: 0.6,
            boxShadow: "none",
          },
        },

        "&.blueButtonSmall": {
          backgroundColor: "rgba(66, 114, 206, 0.8)",
          color: "#fff",
          borderRadius: "6px",
          border: "1px solid rgba(56, 95, 189, 0.9)",
          boxSizing: "border-box",
          textTransform: "none",
          padding: "6px 16px",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(94, 123, 199, 0.9)",
            borderColor: "rgba(56, 95, 189, 0.9)",
            boxShadow:
              "0 0 8px rgba(27, 72, 245, 0.7), 0 0 15px rgba(27, 72, 245, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(56, 95, 189, 0.8)",
            boxShadow:
              "0 0 5px rgba(27, 72, 245, 0.4), 0 0 10px rgba(27, 72, 245, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(26, 31, 58, 0.8)",
            color: theme.palette.text.secondary,
            borderColor: "rgba(26, 31, 58, 0.8)",
            opacity: 0.6,
            boxShadow: "none",
          },
        },

        "&.orangeButton": {
          backgroundColor: "rgba(213, 98, 23, 0.8)",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "6px",
          border: "1px solid rgba(224, 115, 32, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(224, 115, 32, 0.9)",
            borderColor: "rgba(138, 50, 13, 0.9)",
            boxShadow:
              "0 0 8px rgba(213, 98, 23, 0.7), 0 0 15px rgba(213, 98, 23, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(199, 87, 18, 0.8)",
            boxShadow:
              "0 0 5px rgba(213, 98, 23, 0.4), 0 0 10px rgba(213, 98, 23, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(160, 82, 38, 0.8)",
            border: "1px solid rgba(90, 38, 18, 0.8)",
            color: "rgba(168, 123, 94, 0.8)",
            opacity: 0.6,
            boxShadow: "none",
          },
        },

        "&.oneIDRedButton": {
          backgroundColor: "rgba(226, 72, 72, 0.8)",
          borderRadius: "6px",
          border: "1px solid rgba(125, 26, 26, 0.9)",
          padding: "4px 16px",
          color: "#fff",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(255, 94, 94, 0.9)",
            boxShadow:
              "0 0 8px rgba(226, 72, 72, 0.7), 0 0 15px rgba(226, 72, 72, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(201, 52, 52, 0.8)",
            boxShadow:
              "0 0 5px rgba(226, 72, 72, 0.4), 0 0 10px rgba(226, 72, 72, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(226, 72, 72, 0.5)",
            opacity: 0.5,
            boxShadow: "none",
          },
        },

        "&.redButton": {
          backgroundColor: "rgba(226, 72, 72, 0.8)",
          color: "#fff",
          fontWeight: "bold",
          padding: "10px 24px",
          borderRadius: "6px",
          border: "1px solid rgba(125, 26, 26, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(255, 94, 94, 0.9)",
            borderColor: "rgba(180, 35, 35, 0.9)",
            boxShadow:
              "0 0 8px rgba(226, 72, 72, 0.7), 0 0 15px rgba(226, 72, 72, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(201, 52, 52, 0.8)",
            borderColor: "rgba(139, 25, 25, 0.9)",
            boxShadow:
              "0 0 5px rgba(226, 72, 72, 0.4), 0 0 10px rgba(226, 72, 72, 0.2)",
          },
          "&.Mui-disabled": {
            opacity: 0.6,
            backgroundColor: "rgba(226, 72, 72, 0.5)",
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
          backgroundColor: "rgba(212, 175, 55, 0.8)",
          border: "1px solid rgba(125, 81, 30, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(241, 199, 91, 0.9)",
            boxShadow:
              "0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(212, 161, 65, 0.8)",
            boxShadow:
              "0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(212, 175, 55, 0.5)",
            opacity: 0.5,
            boxShadow: "none",
          },
        },

        "&.goldButtonHorizontal": {
          backgroundColor: "rgba(212, 175, 55, 0.8)",
          color: "#0F1C30",
          fontWeight: "bold",
          padding: "8px 30px",
          borderRadius: "6px",
          border: "1px solid rgba(143, 98, 36, 0.9)",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(241, 199, 91, 0.9)",
            borderColor: "rgba(225, 187, 80, 0.9)",
            boxShadow:
              "0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(241, 199, 91, 0.7)",
            borderColor: "rgba(241, 199, 91, 0.9)",
            boxShadow:
              "0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2)",
          },
          "&.Mui-disabled": {
            opacity: 0.6,
            backgroundColor: "rgba(212, 175, 55, 0.5)",
            boxShadow: "none",
          },
        },

        "&.goldOutlinedButton": {
          color: "#f0c850",
          padding: "10px 20px",
          border: "1.5px solid rgba(201, 162, 39, 0.9)",
          fontWeight: "bold",
          borderRadius: "6px",
          background: "transparent",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            background: "rgba(240, 200, 80, 0.1)",
            borderColor: "rgba(240, 200, 80, 0.9)",
            boxShadow:
              "0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5)",
          },
          "&:active": {
            background: "rgba(240, 200, 80, 0.2)",
            borderColor: "rgba(212, 161, 65, 0.9)",
            boxShadow:
              "0 0 5px rgba(212, 175, 55, 0.4), 0 0 10px rgba(212, 175, 55, 0.2)",
          },
          "&.Mui-disabled": {
            color: "rgba(168, 139, 78, 0.8)",
            borderColor: "rgba(168, 139, 78, 0.8)",
            background: "transparent",
            opacity: 0.5,
            boxShadow: "none",
          },
        },

        "&.figmaButton": {
          backgroundColor: "rgba(212, 175, 55, 0.8)",
          borderRadius: "6px",
          border: "2px solid rgba(212, 175, 55, 0.8)",
          color: "#fff",
          boxShadow: "none",
          animation: "none",
          "&:hover": {
            backgroundColor: "rgba(233, 183, 67, 0.9)",
            boxShadow:
              "0 0 8px rgba(212, 175, 55, 0.7), 0 0 15px rgba(212, 175, 55, 0.5)",
          },
          "&:active": {
            backgroundColor: "rgba(212, 175, 55, 0.7)",
            boxShadow:
              "0 0 5px rgba(212, 175, 55, 0.77), 0 0 10px rgba(227, 210, 153, 0.91)",
          },
          "&.Mui-disabled": {
            backgroundColor: "rgba(168, 142, 81, 0.8)",
            border: "2px solid rgba(198, 168, 100, 0.8)",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default buttonStyles;
