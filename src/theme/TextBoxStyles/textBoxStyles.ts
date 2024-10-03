import { Theme } from "@mui/material/styles";

const textBoxStyles = (theme: Theme) => ({
  components: {
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            backgroundColor: theme.palette.DarkBlue.main, // Background color
            color: theme.palette.DarkBlue.main,
          },
          backgroundColor: theme.palette.DarkBlue.main, // Use theme-based background colo
          "& .MuiInputBase-input": {
            backgroundColor: theme.palette.DarkBlue.main,
            color: theme.palette.DarkBlue.main,
          },
        },
      },
      styleOverrides: {
        root: {
          // Ensuring that the background and text color are set for the entire field
          "& .MuiFilledInput-root": {
            backgroundColor: theme.palette.DarkBlue.main,
            "&:hover": {
              backgroundColor: theme.palette.DarkBlue.light,
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.DarkBlue.dark,
            },
          },
          "& .MuiInputBase-input": {
            color: theme.palette.DarkBlue.contrastText, // Ensure text color
          },
          "& .Mui-disabled": {
            backgroundColor: theme.palette.DarkBlue.dark, // Background for disabled state
            color: theme.palette.DarkBlue.light, // Text color for disabled state
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.DarkBlue.main,
          "& .MuiInputBase-input": {
            color: theme.palette.DarkBlue.contrastText,
          },
          "&:hover": {
            backgroundColor: theme.palette.DarkBlue.light,
          },
          "&.Mui-focused": {
            backgroundColor: theme.palette.DarkBlue.dark,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.DarkBlue.dark,
            color: theme.palette.DarkBlue.light,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.DarkBlue.main,
          "& .MuiInputBase-input": {
            color: theme.palette.DarkBlue.contrastText,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.DarkBlue.light,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.Blue.main,
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.DarkBlue.dark,
          },
        },
      },
    },
  },
});

export default textBoxStyles;
