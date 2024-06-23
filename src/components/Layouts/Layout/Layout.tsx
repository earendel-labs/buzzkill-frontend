"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingX: {
            xs: "16px",
            sm: "24px",
            md: "32px",
            lg: "48px",
            xl: "64px",
          },
        }}
      ></Container>
      <Footer />
    </Box>
  );
};

export default Layout;
