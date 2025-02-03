"use client";

import React, { useMemo, useState, useCallback } from "react";
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
  const [selectedTab, setSelectedTab] = useState<string>(
    variant === "default" ? "all" : "you"
  );

  // Local “unstaking” loading so we can show a spinner
  const [unstakingLoading, setUnstakingLoading] = useState(false);

  // Combine parent’s loading + local
  const combinedLoading = loading || unstakingLoading;

  // This callback is provided to BeeCardHive so it can set BeeGrid loading
  const handleUnstakeLoadingChange = useCallback((isLoading: boolean) => {
    setUnstakingLoading(isLoading);
  }, []);

  const theme = useTheme();
  const is1440pxOrLower = useMediaQuery("(max-width: 1440px)");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleMintClick = () => {
    window.open("/Mint", "_blank");
  };

  const handleHatchlingsClick = () => {
    window.open("/User/Profile/MyBees", "_blank");
  };

  // Filter and sort the bees based on tab and ownership
  const filteredBees = useMemo(() => {
    let filtered = bees;
    if (selectedTab === "you") {
      filtered = bees.filter(
        (bee) => bee.ownerAddress.toLowerCase() === address?.toLowerCase()
      );
    }

    // Sort user's bees first
    return filtered.sort((a, b) => {
      const isUserBeeA =
        a.ownerAddress.toLowerCase() === address?.toLowerCase();
      const isUserBeeB =
        b.ownerAddress.toLowerCase() === address?.toLowerCase();

      // User-owned bees come first
      if (isUserBeeA && !isUserBeeB) return -1;
      if (!isUserBeeA && isUserBeeB) return 1;

      // Maintain order for bees owned by the same user type
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
    // 1) Show spinner if loading
    content = (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%" // Ensures full width
        height="100%"
      >
        <HexagonSpinner />
        <Typography className="body1" padding="24px 0px">
          Loading Bees...
        </Typography>
      </Box>
    );
  } else if (hasBees) {
    // 2) Show the bees in a Fade
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
              xxl: "repeat(5, 1fr)",
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
              // Provide callback so BeeCardHive can toggle "unstaking" spinner
              onUnstakeLoadingChange={handleUnstakeLoadingChange}
            />
          ))}
        </Box>
      </Fade>
    );
  } else {
    // 3) No bees
    content = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          width: "100%", // Ensures full width
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
            ? "No Hatchlings found in this category."
            : "You don't own any Hatchlings. Please mint or buy a Hatchling from a secondary market."}
        </Typography>
        {variant === "default" && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <PrimaryButton text="Mint" onClick={handleMintClick} />
            <PrimaryButton text="Hatchlings" onClick={handleHatchlingsClick} />
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
        alignItems: "stretch", // Changed from "center" to "stretch"
        width: "100%", // Ensures the parent Box takes full width
        [theme.breakpoints.up("lg")]: {
          maxWidth: "90%",
        },
        // scrollbar styling...
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
