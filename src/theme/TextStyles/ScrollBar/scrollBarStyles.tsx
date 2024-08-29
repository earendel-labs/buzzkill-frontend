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
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E9B743",
          borderRadius: "4px",
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
