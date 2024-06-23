import { createTheme, Theme } from "@mui/material/styles";
import buttonStyles from "./Button/buttonStyles";
import linkStyles from "./TextStyles/linkStyles";

// Extend the Palette interface to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    NavBarBackground: Palette["primary"];
    cardBorder: Palette["primary"];
    FooterBackground: Palette["primary"];
    Blue: Palette["primary"];
    DarkBlue: Palette["primary"];
    Orange: Palette["primary"];
    DarkOrange: Palette["primary"];
    Gold: Palette["primary"];
    GoldFaded: Palette["primary"];
  }
  interface PaletteOptions {
    NavBarBackground?: PaletteOptions["primary"];
    cardBorder?: PaletteOptions["primary"];
    FooterBackground?: PaletteOptions["primary"];
    Blue?: PaletteOptions["primary"];
    DarkBlue?: PaletteOptions["primary"];
    Orange?: PaletteOptions["primary"];
    DarkOrange?: PaletteOptions["primary"];
    Gold?: PaletteOptions["primary"];
    GoldFaded?: PaletteOptions["primary"];
  }
}

const getTheme = (): Theme => {
  // Create the base theme with your custom palette colors
  const baseTheme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        light: "#63a4ff",
        dark: "#004ba0",
      },
      secondary: {
        main: "#dc004e",
        light: "#ff5c8d",
        dark: "#9a0036",
      },
      NavBarBackground: {
        main: "rgba(34, 46, 80, 0.8)",
        light: "rgba(34, 46, 80, 0.8)",
        dark: "rgba(34, 46, 80, 0.8)",
      },
      cardBorder: {
        main: "#151515",
        light: "#151515",
        dark: "#151515",
      },
      FooterBackground: {
        main: "#222E50",
        light: "#F0EEDF",
        dark: "#050C17",
      },
      Blue: {
        main: "#007991",
        light: "#0091AC",
        dark: "##055e74",
      },
      DarkBlue: {
        main: "#222E50",
        light: "##385fbd",
        dark: "##2e447a",
      },
      Orange: {
        main: "#CC5803",
        light: "#f88408",
        dark: "#b63f07",
      },
      DarkOrange: {
        main: "#A72608",
        light: "#d02e00",
        dark: "#84220a",
      },
      Gold: {
        main: "#F2B417",
        light: "#c3790b",
        dark: "#C3790B",
      },
      GoldFaded: {
        main: "rgba(242, 180, 23, 0.2)",
        light: "rgba(242, 180, 23, 0.2)",
        dark: "rgba(242, 180, 23, 0.2)",
      },
      background: {
        default: "#2e447a",
        paper: "#E8E7E1",
      },
      text: {
        primary: "#ffffff",
        secondary: "#555555",
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
      h1: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: "2.5rem",
      },
      h2: {
        fontFamily: '"Poppins", sans-serif',
      },
      h3: {
        fontFamily: '"Poppins", sans-serif',
      },
      h4: {
        fontFamily: '"Poppins", sans-serif',
      },
      h5: {
        fontFamily: '"Poppins", sans-serif',
      },
      h6: {
        fontFamily: '"Poppins", sans-serif',
      },
      body1: {
        fontFamily: '"Poppins", sans-serif',
      },
      body2: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: "16px",
      },
    },
  });

  // Apply button and link styles with the correct theme
  const themeWithStyles = createTheme(baseTheme, {
    components: {
      ...buttonStyles(baseTheme),
      ...linkStyles(baseTheme),
    },
  });

  return themeWithStyles;
};

export default getTheme;
