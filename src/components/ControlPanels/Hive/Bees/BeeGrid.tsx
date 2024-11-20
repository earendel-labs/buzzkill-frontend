import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SyntheticEvent } from "react";
import BeeCard from "../Old/BeeCard";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { BeeInfo, BeeType } from "@/types/BeeInfo";

const beeCategories = [
  { label: "All Bees", filter: "all" },
  { label: "Your Bees", filter: "yours" },
];

// Example data for bees

// Example data for bees
const allBees: BeeInfo[] = [
  {
    ownerAddress: "user",
    nftAddress: "0x1234562",
    beeName: "Worker Bee",
    beeURL: "/NFTs/WorkerBee.png",
    beeType: BeeType.Worker,
    level: 1,
    energyValue: 50,
    healthValue: 100,
    productivityValue: 70,
    attackValue: 30,
    defenceValue: 40,
    forageValue: 60,
    status: "idle",
    location: "hive",
    environment: "earth",
  },
  {
    ownerAddress: "other",
    nftAddress: "0x4563456",
    beeName: "Queen Bee",
    beeURL: "/NFTs/Queens/earth-queen.png",
    beeType: BeeType.Queen,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "earth",
  },
  {
    ownerAddress: "other",
    nftAddress: "0x789928",
    beeName: "Queen Bee",
    beeURL: "/NFTs/Queens/ice-queen.png",
    beeType: BeeType.Queen,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "ice",
  },
  {
    ownerAddress: "user",
    nftAddress: "0xabc42",
    beeName: "Queen Bee",
    beeURL: "/NFTs/Queens/fire-queen.png",
    beeType: BeeType.Queen,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "fire",
  },
  {
    ownerAddress: "other",
    nftAddress: "0xa12ef3",
    beeName: "Worker Bee",
    beeURL: "/NFTs/WorkerBee.png",
    beeType: BeeType.Worker,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "fire",
  },
  {
    ownerAddress: "other",
    nftAddress: "0xdef135g",
    beeName: "Worker Bee",
    beeURL: "/NFTs/WorkerBee.png",
    beeType: BeeType.Worker,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "fire",
  },
  {
    ownerAddress: "other",
    nftAddress: "0xdef12345",
    beeName: "Worker Bee",
    beeURL: "/NFTs/WorkerBee.png",
    beeType: BeeType.Worker,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "fire",
  },
  {
    ownerAddress: "other",
    nftAddress: "0xdefg1",
    beeName: "Worker Bee",
    beeURL: "/NFTs/WorkerBee.png",
    beeType: BeeType.Worker,
    level: 5,
    energyValue: 80,
    healthValue: 150,
    productivityValue: 200,
    attackValue: 100,
    defenceValue: 120,
    forageValue: 90,
    status: "active",
    location: "hive",
    environment: "fire",
  },
];

const BeeGrid: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedBeeAddress, setSelectedBeeAddress] = useState<string | null>(
    null
  ); // Unified state for selected bee's nftAddress

  // Get the theme and use the theme's breakpoints
  const theme = useTheme();
  const is1440pxOrLower = useMediaQuery("(max-width: 1440px)"); // Explicit check for 1440px

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleMintClick = () => {
    window.open("https://dagora.xyz/launchpad/buzzkill", "_blank");
  };

  const handleBuyClick = () => {
    window.open("/mint", "_blank");
  };

  const filteredWorkerBees = allBees.filter(
    (bee) =>
      bee.beeType === BeeType.Worker &&
      (selectedTab === "all" || bee.ownerAddress === "user")
  );

  const filteredQueenBees = allBees.filter(
    (bee) =>
      bee.beeType === BeeType.Queen &&
      (selectedTab === "all" || bee.ownerAddress === "user")
  );

  const hasQueenBees = filteredQueenBees.length > 0;
  const hasWorkerBees = filteredWorkerBees.length > 0;

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "2px",
        padding: "20px",
        height: "83vh", // Height relative to the viewport
        overflowY: "auto", // Enables vertical scrolling for the entire container
        boxSizing: "border-box", // Include padding in the width calculation
        margin: "0 auto", // Center the BeeGrid
        display: "flex", // Centering components on larger screens
        flexDirection: "column",
        alignItems: "center", // Centers all components horizontally
        [theme.breakpoints.up("lg")]: {
          maxWidth: "90%", // Constrain width on large screens
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
      {/* Tabs for filtering */}
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

      {/* Queen Bees Section */}
      {hasQueenBees && (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: 36,
              color: "#D4AF37",
              mb: 2,
              textAlign: "left",
              ml: { xs: 1, sm: 3 },
            }}
          >
            Queen Bees
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // Force 3 columns across all screen sizes
              justifyItems: "center", // Center the items within the columns
              gap: "2em", // Space between items
              padding: "0 2em", // Padding on the sides
              width: "100%", // Full width to occupy the parent
            }}
          >
            {filteredQueenBees.map((bee) => (
              <BeeCard
                key={bee.nftAddress}
                beeInfo={bee}
                isSelected={selectedBeeAddress === bee.nftAddress}
                onSelect={() => setSelectedBeeAddress(bee.nftAddress)}
                cardSize={is1440pxOrLower ? "large" : "extraLarge"}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Worker Bees Section */}
      {hasWorkerBees && (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: 36,
              color: "#D4AF37",
              mt: 4,
              mb: 2,
              textAlign: "left",
              ml: { xs: 1, sm: 3 },
            }}
          >
            Worker Bees
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fit, minmax(80px, 1fr))", // 1 column minimum
                sm: "repeat(auto-fit, minmax(80px, 1fr))", // 2 columns
                md: "repeat(auto-fit, minmax(80px, 1fr))", // 3 columns
                lg: "repeat(auto-fit, minmax(150px, 1fr))", // 3-4 columns depending on space
                xl: "repeat(auto-fit, minmax(250px, 1fr))", // 4 columns
                xxl: "repeat(4, 1fr)",
              },
              justifyItems: "center", // Center the items
              gap: "2em 3em", // Space between items
              padding: "0em 2em", // Padding around the grid
              width: "100%", // Full width of the container
              boxSizing: "border-box", // Ensure padding is included in width calculations
            }}
          >
            {filteredWorkerBees.map((bee) => (
              <BeeCard
                key={bee.nftAddress}
                beeInfo={bee}
                isSelected={selectedBeeAddress === bee.nftAddress}
                onSelect={() => setSelectedBeeAddress(bee.nftAddress)}
                cardSize={is1440pxOrLower ? "large" : "extraLarge"}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Show message if no bees are available */}
      {!hasQueenBees && !hasWorkerBees && (
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
              fontSize: 38,
              maxWidth: "100%",
              width: "100%",
            }}
          >
            You don't own any bees. Please mint or buy a bee from a secondary
            market.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <PrimaryButton text="Mint" onClick={handleMintClick} />
            <PrimaryButton text="Buy" onClick={handleBuyClick} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BeeGrid;
