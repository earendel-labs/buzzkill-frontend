import { GlobalStyles } from "@mui/material";

const GlobalScrollbarStyles = () => (
  <GlobalStyles
    styles={{
      "*": {
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#68341B",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E9B743",

          border: "0.5px solid #E9B743",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#915E28",
        },
      },
    }}
  />
);

export default GlobalScrollbarStyles;
