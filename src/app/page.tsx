"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layouts/Layout/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import { useRouter } from "next/navigation";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useSession } from "next-auth/react";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession(); // Access session from NextAuth

  // Clean up query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");

    // Check for error and clear params
    if (errorParam) {
      setError(errorParam);
      params.delete("error");

      const cleanUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      router.replace(cleanUrl);
    }
  }, [router]);

  // Redirect user after successful login, only if the auth error was present initially
  useEffect(() => {
    if (session && error === "auth") {
      router.replace("/Play"); // Redirect to /Play after successful login
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
            minWidth: "100vw",
            minHeight: "100vh",
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
              alignItems: "center",
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

            {/* Render login message if not authenticated */}
            {!session && error === "auth" && (
              <Typography variant="h6" color="red" sx={{ marginTop: 4 }}>
                Please login or create an Account to Play
              </Typography>
            )}

            {/* Buttons Row */}
            <Box sx={{ display: "flex", gap: 8, mt: 6 }}>
              <LoginButton />
              <Button
                className="blueButton"
                onClick={handleClick}
                sx={{ width: "155px", fontSize: "18px" }}
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
