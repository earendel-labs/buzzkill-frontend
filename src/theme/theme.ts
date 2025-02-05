import { createTheme, Theme } from "@mui/material/styles";
import buttonStyles from "./Button/buttonStyles";
import linkStyles from "./TextStyles/linkStyles";
import tabStyles from "./TabStyles/tabStyles";
import textBoxStyles from "./TextBoxStyles/textBoxStyles";
import toolTipStyles from "./ToolTipStyles/ToolTipStyles"; // Adjust the path accordingly

// Extend the Palette interface to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    NavBarBackground: Palette["primary"];
    cardBorder: Palette["primary"];
    FooterBackground: Palette["primary"];
    Blue: Palette["primary"];
    DarkBlue: Palette["primary"];
    LightBlue: Palette["primary"];
    Orange: Palette["primary"];
    DarkOrange: Palette["primary"];
    Gold: Palette["primary"];
    GoldFaded: Palette["primary"];
    BlueFaded: Palette["primary"];
    ContrarianBlue: Palette["primary"];
    OneIDRed: Palette["primary"];
    DarkBlueFaded: Palette["primary"];
    OneIDRedFaded: Palette["primary"];

    customBackgrounds: {
      boxGradient: string;
    };
  }
  interface PaletteOptions {
    NavBarBackground?: PaletteOptions["primary"];
    cardBorder?: PaletteOptions["primary"];
    FooterBackground?: PaletteOptions["primary"];
    Blue?: PaletteOptions["primary"];
    DarkBlue?: PaletteOptions["primary"];
    LightBlue?: PaletteOptions["primary"];
    Orange?: PaletteOptions["primary"];
    DarkOrange?: PaletteOptions["primary"];
    Gold?: PaletteOptions["primary"];
    GoldFaded?: PaletteOptions["primary"];
    BlueFaded?: PaletteOptions["primary"];
    ContrarianBlue?: PaletteOptions["primary"];
    OneIDRed?: PaletteOptions["primary"];
    DarkBlueFaded?: PaletteOptions["primary"];
    OneIDRedFaded: PaletteOptions["primary"];

    customBackgrounds?: {
      boxGradient?: string;
    };
  }

  interface TypographyVariants {
    ToolTipLabel: React.CSSProperties;
    ToolTipValue: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    ToolTipLabel?: React.CSSProperties;
    ToolTipValue?: React.CSSProperties;
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    ToolTipLabel: true;
    ToolTipValue: true;
  }
}

const getTheme = (): Theme => {
  const baseTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1536,
        xxl: 1800,
      },
    },
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
        main: "rgba(34, 46, 80, 0.7)",
        light: "rgba(34, 46, 80, 0.6)",
        dark: "rgba(34, 46, 80, 0.8)",
      },
      cardBorder: {
        main: "#151515",
        light: "#151515",
        dark: "#151515",
      },
      FooterBackground: {
        main: "rgba(34, 46, 80, 0.7)",
        light: "rgba(34, 46, 80, 0.8)",
        dark: "rgba(34, 46, 80, 0.8)",
      },
      Blue: {
        main: "#007991",
        light: "#0091AC",
        dark: "#055e74",
      },
      DarkBlue: {
        main: "#222E50",
        light: "#385fbd",
        dark: "#2e447a",
      },
      Orange: {
        main: "#CC5803",
        light: "#ff842e",
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
      LightBlue: {
        main: "#a2c8ee",
        light: "#4172cf",
        dark: "#76aae4",
      },
      BlueFaded: {
        main: "rgba(0, 121, 145, 0.4)",
        light: "rgba(0, 145, 172, 0.4)",
        dark: "rgba(5, 94, 116, 0.7)",
      },
      DarkBlueFaded: {
        main: "rgba(34, 46, 80, 0.4)",
        light: "rgba(61, 78, 125, 0.3)",
        dark: "rgba(34, 46, 80, 0.5)",
      },
      GoldFaded: {
        main: "rgba(242, 180, 23, 0.4)",
        light: "rgba(242, 180, 23, 0.4)",
        dark: "rgba(242, 180, 23, 0.4)",
      },
      ContrarianBlue: {
        main: "#ACC0E4",
      },
      OneIDRed: {
        main: "#D9180F",
        dark: "#4a0805",
        light: "#881914",
      },
      OneIDRedFaded: {
        main: "rgba(217, 25, 15, 0.4)",
        dark: "rgba(74, 8, 5, 0.4)",
        light: "rgba(136, 25, 20, 0.4)",
      },
      customBackgrounds: {
        boxGradient: `
          linear-gradient(rgba(5, 11, 43, 0.7), rgba(5, 11, 43, 0.1)),
          conic-gradient(from -23.81deg at 72.82% 162.44%, #2E447A -44.57deg, #027790 7.76deg, #007991 20.98deg, #195C84 52deg, #2E447A 88.68deg, #2E447A 315.43deg, #027790 367.76deg);
        `,
      },
      background: {
        default: "#2e447a",
        paper: "#a3c8ed",
      },
      text: {
        primary: "#ffffff",
        secondary: "#cfb167",
      },
    },
    typography: (palette) => ({
      fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
      h1: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontWeight: "bold",
        fontSize: "5rem",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
      },
      h2: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontWeight: "bold",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
        fontSize: "4rem",
      },
      h3: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontWeight: "bold",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
        fontSize: "3.5rem",
      },
      h4: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontWeight: "bold",
        WebkitTextStroke: `1px ${palette.DarkOrange.main}`,
        fontSize: "2.5rem",
      },
      h5: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontWeight: "bold",
        fontSize: "2rem",
      },
      h6: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontSize: "1.25rem",
        fontWeight: "bold",
        WebkitTextStroke: `0px ${palette.DarkBlue.main}`,
      },
      body1: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontSize: "1.125rem",
      },
      body2: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontSize: "1rem",
      },
      ToolTipLabel: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontSize: "1.125rem",
        fontWeight: "700",
        lineHeight: "100%",
        color: palette.Gold.main,
      },
      ToolTipValue: {
        fontFamily: "var(--font-vera-humana), var(--font-poppins), sans-serif",
        fontSize: "1.125rem",
        fontWeight: "700",
        lineHeight: "100%",
        WebkitTextStroke: `0.3px ${palette.DarkBlue.main}`,
      },
    }),
  });

  const themeWithStyles = createTheme(baseTheme, {
    components: {
      ...buttonStyles(baseTheme),
      ...linkStyles(baseTheme),
      ...tabStyles(baseTheme),
      ...toolTipStyles(baseTheme),
      ...textBoxStyles(baseTheme),
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "#c8ddf5", // Change to your desired color
            fontSize: "0.875rem", // Optional: adjust the font size if needed
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#0C2C4C",
            backgroundImage: `
            linear-gradient(rgba(5, 11, 43, 0.7), rgba(5, 11, 43, 0.1)),
            conic-gradient(from -23.81deg at 72.82% 162.44%, #2E447A -44.57deg, #027790 7.76deg, #007991 20.98deg, #195C84 52deg, #2E447A 88.68deg, #2E447A 315.43deg, #027790 367.76deg);
border-radius: 0px`,
          },
        },
      },
    },
  });

  return themeWithStyles;
};

export default getTheme;
