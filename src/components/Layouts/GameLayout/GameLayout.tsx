import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Theme,
  useTheme,
  CssBaseline,
} from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import Header from "../Layout/Header/Header";

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md")); // Matches md (960px) and below
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const checkOrientation = () => setIsPortrait(mediaQuery.matches);

    checkOrientation(); // Initial check
    mediaQuery.addEventListener("change", checkOrientation);

    return () => mediaQuery.removeEventListener("change", checkOrientation);
  }, []);

  if (isTabletOrSmaller && isPortrait) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
          color: "white",
          textAlign: "center",
          padding: theme.spacing(5),
        }}
      >
        <SemiTransparentCard
          sx={{ padding: theme.spacing(2), maxWidth: "30rem" }}
        >
          <Typography variant="h6">
            Please rotate your device to landscape mode to play the game.
          </Typography>
        </SemiTransparentCard>
      </Box>
    );
  }

  return (
    <>
      {" "}
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
    </>
  );
}
