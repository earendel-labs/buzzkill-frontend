// HomePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layouts/Layout/Layout";
import Typography from "@mui/material/Typography";
import { Box, Snackbar, Alert } from "@mui/material";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import { useRouter } from "next/navigation";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useSession } from "next-auth/react";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import Image from "next/image";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();
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
          width="100vw"
          flexDirection="column"
          sx={{
            backgroundImage: (theme) =>
              theme.palette.customBackgrounds.boxGradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <HexagonSpinner />
          <Typography className="body1" padding="44px 0px">
            Loading World...
          </Typography>
        </Box>
      )}

      {/* Background Image  */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
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
      <Box
        sx={{
          width: { xs: "95%", sm: "65%", md: "50%", lg: "50%", xl: "38%" },
          mx: { xs: "1rem", md: "auto" },
          my: { sm: "2rem", md: "auto" },
        }}
      >
        <SemiTransparentCard transparency={0.7}>
          <Box
            padding={{ xs: "2rem 0rem", sm: "2rem 2rem", md: "3rem" }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "15rem",
                  sm: "17rem",
                  md: "20rem",
                  lg: "45rem",
                },
                position: "relative",
                aspectRatio: "16/9",
              }}
            >
              <Image
                src="/Maps/backgroundText.svg"
                alt="Buzzkill Text"
                fill // Makes it responsive within the container
                sizes="(max-width: 600px) 75vw, (max-width: 960px) 85vw, 850px" // Adaptive sizes
                style={{ objectFit: "contain" }} // Maintain aspect ratio
              />
            </Box>

            {/* Render login message if not authenticated */}
            {!session && error === "auth" && (
              <Typography
                variant="h6"
                sx={{
                  marginTop: 2,
                  paddingX: {
                    xs: "28px",
                    sm: "auto",
                  },
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  color: theme.palette.Orange.main,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                Please login or create an account to play
              </Typography>
            )}

            {/* Buttons Row - Stack on small screens */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack buttons on mobile
                gap: { xs: 2, sm: 3, md: 6 },
                mt: { xs: 2, sm: 2, md: 2 },
                mb: { xs: 1, sm: 1, md: 0 },
                width: { xs: "75%", sm: "100%" },
                justifyContent: "center",
              }}
            >
              <LoginButton />
              <DefaultButton
                className="blueButton"
                onClick={handleClick}
                sx={{
                  width: { xs: "100%", sm: "155px" }, // Full width on mobile
                  fontSize: { xs: "16px", sm: "18px" },
                }}
              >
                Mint
              </DefaultButton>
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
