// src/components/ControlPanels/Hive/Bees/BeeGrid.tsx

import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SyntheticEvent } from "react";
import BeeCardHive from "@/components/Card/BeeCardHive/BeeCardHive";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { Hatchling } from "@/types/Hatchling";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const beeCategories = [
  { label: "All Bees", filter: "all" },
  { label: "Your Bees", filter: "you" },
];

interface BeeGridProps {
  bees: Hatchling[]; // Array of staked bees
  variant?: "default" | "myBees"; // Context variants
}

const BeeGrid: React.FC<BeeGridProps> = ({ bees, variant = "default" }) => {
  const { address } = useUserContext(); // Current user's address
  const [selectedTab, setSelectedTab] = React.useState<string>(
    variant === "default" ? "all" : "you"
  );

  const theme = useTheme();
  const is1440pxOrLower = useMediaQuery("(max-width: 1440px)");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleMintClick = () => {
    window.open("https://dagora.xyz/launchpad/buzzkill", "_blank");
  };

  const handleBuyClick = () => {
    window.open("/mint", "_blank");
  };

  // Filter bees based on selected tab
  const filteredBees =
    selectedTab === "all"
      ? bees
      : bees.filter(
          (bee) => bee.ownerAddress.toLowerCase() === address?.toLowerCase()
        );

  // Determine if there are any bees to display
  const hasBees = filteredBees.length > 0;

  // Define a handler for Play Click (only for 'Your Bees' variant)
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
        padding: "20px",
        height: "83vh",
        overflowY: "auto",
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
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
      {/* Conditionally render Tabs only in 'default' variant */}
      {variant === "default" && (
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
      )}

      {/* Bee Cards Grid */}
      {hasBees ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // 1 column on extra-small screens
              sm: "repeat(2, 1fr)", // 2 columns on small screens
              md: "repeat(3, 1fr)", // 3 columns on medium screens
              lg: "repeat(3, 1fr)", // 3 columns on large screens
              xl: "repeat(3, 1fr)", // 3 columns on extra-large screens
            },
            justifyItems: "center",
            gap: "1.5em", // Reduced gap for better fit
            padding: "0 1em", // Reduced horizontal padding
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
              variant={selectedTab === "myBees" ? "myBees" : "default"} // Adjust variant based on tab
              additionalInfo={
                {
                  // Pass any additional info if needed
                }
              }
            />
          ))}
        </Box>
      ) : (
        // Show message if no bees are available
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            textAlign: "center",
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
              ? "No bees found in this category."
              : "You don't own any bees. Please mint or buy a bee from a secondary market."}
          </Typography>
          {variant === "default" && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
              <PrimaryButton text="Mint" onClick={handleMintClick} />
              <PrimaryButton text="Buy" onClick={handleBuyClick} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default BeeGrid;
