// HomePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layouts/Layout/Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import { useRouter } from "next/navigation";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useSession } from "next-auth/react";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import Image from "next/image";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    const loggingOutParam = params.get("loggingOut");
    const inviteCode = params.get("invite");

    if (errorParam) setError(errorParam);

    if (loggingOutParam) {
      params.delete("loggingOut");
      const cleanUrl = `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.replace(cleanUrl);
    }

    // Check invite code validity if present
    if (inviteCode) {
      fetch(`/api/user/validateInviteCode?invite=${inviteCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            setSnackbarSeverity("success");
            setSnackbarMessage("Valid invite code used!");
          } else {
            setSnackbarSeverity("error");

            setSnackbarMessage(
              "Invalid invite code. Continuing signup without invite."
            );
          }
          setSnackbarOpen(true); // Open the snackbar with the result message
        })
        .catch((error) => {
          setSnackbarSeverity("error");

          console.error("Error validating invite code:", error);
          setSnackbarMessage("Error checking invite code. Please try again.");
          setSnackbarOpen(true);
        });
    }
  }, [router]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Redirect user after successful login, only if the auth error was present initially
  useEffect(() => {
    if (session && (error === "auth" || !error)) {
      router.push("/Play"); // Redirect to Play once the session is established
    }
  }, [session, error, router]);

  const handleClick = () => {
    router.push("/Mint");
  };
  return (
    <Layout>
      {/* Conditionally render loading spinner */}
      {!isImageLoaded && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
          position="fixed"
          width="100vw"
          bgcolor="background.default"
          zIndex={1300} // Ensures the spinner is above other components
        >
          <HexagonSpinner />
          <Typography className="body1" padding="24px 0px">
            Loading World...
          </Typography>
        </Box>
      )}

      {/* Background Image with Updated Next.js 13 Image Props */}
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
        <Image
          src="/Maps/BuzzkillMap.jpg"
          alt="Background map image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={() => setIsImageLoaded(true)} // Updated to use onLoad
          priority
        />
      </Box>

      {/* Centered Semi-Transparent Card */}
      <Box width="55%">
        <SemiTransparentCard transparency={0.5}>
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
            <Image
              src="/Maps/backgroundText.svg"
              alt="Buzzkill Text "
              width={850}
              height={850}
              style={{ width: "85%", height: "85%" }} // Adjust style if necessary
            />

            {/* Render login message if not authenticated */}
            {!session && error === "auth" && (
              <Typography variant="h6" color="red" sx={{ marginTop: 4 }}>
                Please login or create an account to play
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
      {/* Snackbar for invite code validation */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default HomePage;
