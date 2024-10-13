import { Theme } from "@mui/material/styles";

const textBoxStyles = (theme: Theme) => ({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled", // Set the default variant to filled
      },
      root: {
        "& .MuiFilledInput-root": {
          background: "rgb(232, 241, 250)",
        },
      },
    },
    root: {
      "& .MuiFilledInput-root": {
        background: "rgb(232, 241, 250)",
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            background: "rgb(232, 241, 250)",
          },
        },
      },
    },
  },
});

export default textBoxStyles;
