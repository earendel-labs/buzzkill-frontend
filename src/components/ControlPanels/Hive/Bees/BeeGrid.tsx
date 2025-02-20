"use client";

import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import { SyntheticEvent } from "react";
import BeeCardHive from "@/components/Card/BeeCardHive/BeeCardHive";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { Hatchling } from "@/types/Hatchling";
import { useUserContext } from "@/context/UserContext";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useSound } from "@/context/SoundContext"; // Import useSound context

const beeCategories = [
  { label: "All Hatchlings", filter: "all" },
  { label: "Your Hatchlings", filter: "you" },
];

interface BeeGridProps {
  bees: Hatchling[];
  variant?: "default" | "myBees";
  /** If the parent wants to show an initial spinner. */
  loading?: boolean;
}

const BeeGrid: React.FC<BeeGridProps> = ({
  bees,
  variant = "default",
  loading = false,
}) => {
  const { address } = useUserContext();
  const { isMuted } = useSound(); // Access the sound context
  const [selectedTab, setSelectedTab] = useState<string>(
    variant === "default" ? "all" : "you"
  );

  const [unstakingLoading, setUnstakingLoading] = useState(false);
  const combinedLoading = loading || unstakingLoading;

  const handleUnstakeLoadingChange = useCallback((isLoading: boolean) => {
    setUnstakingLoading(isLoading);
  }, []);

  const theme = useTheme();
  const is1440pxOrLower = useMediaQuery("(max-width: 1440px)");

  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);

    // Play sound if not muted
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0; // Reset sound to start from beginning
      hoverSound.play();
    }
  };

  const handleMintClick = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    window.open("/Mint", "_blank");
  };

  const handleHatchlingsClick = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    window.open("/Play/User/Profile/MyBees", "_blank");
  };

  // Filter and sort the bees based on tab and ownership
  const filteredBees = useMemo(() => {
    let filtered = bees;
    if (selectedTab === "you") {
      filtered = bees.filter(
        (bee) => bee.ownerAddress.toLowerCase() === address?.toLowerCase()
      );
    }
    return filtered.sort((a, b) => {
      const isUserBeeA =
        a.ownerAddress.toLowerCase() === address?.toLowerCase();
      const isUserBeeB =
        b.ownerAddress.toLowerCase() === address?.toLowerCase();

      if (isUserBeeA && !isUserBeeB) return -1;
      if (!isUserBeeA && isUserBeeB) return 1;
      return 0;
    });
  }, [bees, selectedTab, address]);

  const hasBees = filteredBees.length > 0;

  // Render the tabs if variant=default
  const tabsSection = variant === "default" && (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      centered
      sx={{
        mb: 3,
        borderRadius: "2px",
        width: "100%",
      }}
    >
      {beeCategories.map((category) => (
        <Tab
          key={category.filter}
          label={category.label}
          value={category.filter}
          sx={{
            color: "#E9B743",
            "&.Mui-selected": { color: "#915E28", fontWeight: "bold" },
            fontSize: "1.25rem",
          }}
        />
      ))}
    </Tabs>
  );

  // Decide what to show based on combinedLoading + hasBees
  let content;
  if (combinedLoading) {
    content = (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <HexagonSpinner />
        <Typography className="body1" padding="24px 0px">
          Loading Bees...
        </Typography>
      </Box>
    );
  } else if (hasBees) {
    content = (
      <Fade in={true} timeout={200}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
              xxl: "repeat(4, 1fr)",
            },
            justifyItems: "center",
            gap: "1.5em",
            padding: "1em 1em",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {filteredBees.map((bee) => (
            <BeeCardHive
              key={bee.id}
              bee={bee}
              isOwnedByUser={
                bee.ownerAddress.toLowerCase() === address?.toLowerCase()
              }
              variant={selectedTab === "myBees" ? "myBees" : "default"}
              onUnstakeLoadingChange={handleUnstakeLoadingChange}
            />
          ))}
        </Box>
      </Fade>
    );
  } else {
    content = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#D4AF37",
            mb: 4,
            fontSize: 24,
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {variant === "default"
            ? "You have no Hatchlings in this Hive"
            : "You don't own any Hatchlings. Please mint or buy a Hatchling from a secondary market."}
        </Typography>
        {variant === "default" && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            {/* <PrimaryButton text="Mint" onClick={handleMintClick} /> */}
            {/* <PrimaryButton text="Hatchlings" onClick={handleHatchlingsClick} /> */}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
        padding: "20px",
        height: "80%",
        overflowY: "auto",
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        [theme.breakpoints.up("lg")]: {
          maxWidth: "90%",
        },
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#68341B",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E9B743",
          borderRadius: "4px",
        },
      }}
    >
      {tabsSection}
      {content}
    </Box>
  );
};

export default BeeGrid;
