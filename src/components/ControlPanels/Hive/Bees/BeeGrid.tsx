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
import BeeCard from "./BeeCard";
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

function BeeGrid() {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedBeeAddress, setSelectedBeeAddress] = useState<string | null>(
    null
  ); // Unified state for selected bee's nftAddress

  // Get the theme and use the theme's breakpoints
  const theme = useTheme();
  const is1440pxOrLower = useMediaQuery(theme.breakpoints.down("lg")); // Correct usage

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
        maxWidth: "100%",
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
          width: "100%", // Make sure the tabs stretch across
          maxWidth: {
            xs: "100%", // Full width for small screens
            md: "60%", // Constrain width for larger screens
            lg: "60%", // Constrain further for large screens
          },
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
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)", // 1 item per row on extra small screens
                sm: "repeat(1, 1fr)", // 1 item per row on small screens
                md: "repeat(2, 1fr)", // 2 items per row on medium screens
                lg: "repeat(3, 1fr)", // 3 items per row on large screens
                xl: "repeat(3, 1fr)", // 3 items per row on extra large screens
              },
              justifyContent: "center",
              alignItems: "center",
              gap: "2em 2em",
              padding: "0em 2em",
              borderRadius: "4px",
              boxSizing: "border-box",
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
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              },
              justifyContent: "center",
              alignItems: "center",
              gap: "2em 3em",
              padding: "0em 2em",
              borderRadius: "4px",
              boxSizing: "border-box",
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
}

export default BeeGrid;
