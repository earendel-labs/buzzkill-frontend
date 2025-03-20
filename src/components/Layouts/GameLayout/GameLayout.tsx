import { useState, useEffect } from "react";
import { Box, Typography, useTheme, CssBaseline } from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import Header from "../Layout/Header/Header";

interface GameLayoutProps {
  children: React.ReactNode;
}

// Identify phones
function isPhoneDevice() {
  const ua = navigator.userAgent.toLowerCase();
  const isPhoneUA =
    /mobi|iphone|ipod|android(.*)mobile|windows phone|blackberry/i.test(ua);
  const width = window.innerWidth;
  return isPhoneUA || width < 600;
}

// Identify tablets
function isTabletDevice() {
  const ua = navigator.userAgent.toLowerCase();
  const isTabletUA =
    /ipad|android(?!.*mobi)|tablet|kindle|playbook|silk|nexus\s(7|9|10)/i.test(
      ua
    );
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isTabletResolution =
    width >= 600 && width <= 1300 && height >= 600 && height <= 2000;

  return isTabletUA || isTabletResolution;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const theme = useTheme();
  const [portrait, setPortrait] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    function checkDeviceAndOrientation() {
      const phone = isPhoneDevice();
      const tablet = isTabletDevice();
      setIsMobileOrTablet(phone || tablet);
      setPortrait(window.innerHeight > window.innerWidth);
    }

    checkDeviceAndOrientation();
    window.addEventListener("resize", checkDeviceAndOrientation);

    return () => {
      window.removeEventListener("resize", checkDeviceAndOrientation);
    };
  }, []);

  if (isMobileOrTablet && portrait) {
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header isGameLayout={true} />
      <Box>{children}</Box>
    </Box>
  );
}
