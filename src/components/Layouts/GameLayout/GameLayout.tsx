// src/components/Layouts/GameLayout/GameLayout.tsx
import React, { ReactNode } from "react";
import { useLoading } from "../../../context/LoadingContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header/Header";
import CircularProgress from "@mui/material/CircularProgress";

interface GameLayoutProps {
  children: ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  const { isLoading } = useLoading();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Header />
      <Box>{children}</Box>
    </Box>
  );
};

export default GameLayout;
