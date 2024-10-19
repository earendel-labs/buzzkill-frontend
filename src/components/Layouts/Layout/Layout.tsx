"use client";

import React, { useState, useEffect, useTransition } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import Typography from "@mui/material/Typography";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, registerLoading, unregisterLoading } = useLoading();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Manually trigger the loading state when navigating
  const handleNavigate = (url: string) => {
    registerLoading(); // Set loading to true
    startTransition(() => {
      router.push(url); // Perform the navigation
      unregisterLoading(); // Set loading to false when done
    });
  };

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

      <Box
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
      >
        {/* Show spinner if loading, otherwise show the children */}
        {isLoading || isPending ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="65vh" // Ensure it takes up most of the page for proper centering
            flexGrow={1}
          >
            <HexagonSpinner />
            <Typography marginTop="24px">Fetching data...</Typography>
          </Box>
        ) : (
          children
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
