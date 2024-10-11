"use client";

import React, { useEffect } from "react";
import Layout from "@/components/Layouts/Layout/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import { useRouter } from "next/navigation";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useSession } from "next-auth/react"; // Import useSession to check authentication status

const HomePage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const { data: session } = useSession(); // Get session state from NextAuth

  useEffect(() => {
    // Check for the loggedOut parameter and remove it if present
    const params = new URLSearchParams(window.location.search);
    if (params.has("loggedOut")) {
      params.delete("loggedOut");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      router.replace(newUrl); // Use replace to update URL without reloading
    }
  }, [router]);
  // Check for query parameters (e.g., error) on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    setError(errorParam); // Store any error in state
  }, []);

  // Handle redirection logic after a successful session
  useEffect(() => {
    if (session && error === "auth") {
      const cleanUrl = window.location.pathname; // Remove the error from URL
      router.replace(cleanUrl); // Replace the URL without reloading the page

      // Here, we redirect to /Play if the session exists
      const referrer = document.referrer;
      if (referrer === window.location.origin + "/") {
        router.push("/Play"); // Redirect to /Play only if coming from the homepage
      }
    }
  }, [session, error, router]);

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

            {/* Conditionally render login message if not authenticated and redirected */}
            {!session && error === "auth" && (
              <Typography
                variant="h6"
                color="red"
                sx={{
                  marginTop: 4,
                }}
              >
                Please login or create an Account to Play
              </Typography>
            )}

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
