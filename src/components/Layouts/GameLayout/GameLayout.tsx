// src/components/Layouts/GameLayout/GameLayout.tsx
import React, { ReactNode } from "react";
import { useLoading } from "../../../context/LoadingContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Layout/Header/Header";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

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
        <HexagonSpinner />
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
      <Header isGameLayout={true} />
      <Box>{children}</Box>
    </Box>
  );
};

export default GameLayout;
