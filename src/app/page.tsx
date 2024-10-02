"use client";

import React from "react";
import Layout from "@/components/Layouts/Layout/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import { useRouter } from "next/navigation";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard"; // Import the semi-transparent card

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Mint");
  };

  return (
    <Layout>
      {/* Background Image */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/Maps/BuzzkillMap.jpg"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            minWidth: "100vw", // Ensure the image stretches to the full viewport width
            minHeight: "100vh", // Ensure the image stretches to the full viewport height
          }}
        />
      </Box>

      {/* Centered Semi-Transparent Card */}
      <Box width="55%">
        <SemiTransparentCard>
          <Box
            padding="3rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center everything horizontally
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* Main Title */}
            <Box
              component="img"
              src="/Maps/backgroundText.svg"
              sx={{
                width: "85%",
                height: "85%",
              }}
            />

            {/* Buttons Row */}
            <Box
              sx={{
                display: "flex",
                gap: 8,
                mt: 6, // Increased margin-top for more spacing below the buttons
              }}
            >
              <LoginButton />
              <Button
                className="blueButton"
                onClick={handleClick}
                sx={{
                  width: "155px",
                  fontSize: "18px",
                }}
              >
                Mint
              </Button>
            </Box>
          </Box>
        </SemiTransparentCard>
      </Box>
    </Layout>
  );
};

const App: React.FC = () => {
  return <HomePage />;
};

export default App;
