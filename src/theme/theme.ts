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
        main: "rgba(242, 180, 23, 0.4)",
        light: "rgba(242, 180, 23, 0.4)",
        dark: "rgba(242, 180, 23, 0.4)",
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
    typography: (palette) => ({
      fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
      h1: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontWeight: "bold",
        fontSize: "5rem",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
      },
      h2: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontWeight: "bold",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
      },
      h3: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontWeight: "bold",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
      },
      h4: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontWeight: "bold",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
      },
      h5: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontWeight: "bold",
      },
      h6: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontSize: "18px",
        fontWeight: "bold",
        WebkitTextStroke: `0px ${palette.DarkBlue.main}`
      },
      body1: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
      },
      body2: {
        fontFamily: '"Vera Humana 95", "Poppins", sans-serif',
        fontSize: "16px",
      },
    }),
  });

  const themeWithStyles = createTheme(baseTheme, {
    components: {
      ...buttonStyles(baseTheme),
      ...linkStyles(baseTheme),
    },
  });

  return themeWithStyles;
};

export default getTheme;
