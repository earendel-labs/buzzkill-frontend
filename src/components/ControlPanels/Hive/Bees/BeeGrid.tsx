import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, useMediaQuery } from "@mui/material";
import { SyntheticEvent } from "react";
import BeeContainer from "./BeeContainer";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";

// Dummy data for tabs and image URLs
const beeCategories = [
  { label: "All Bees", filter: "all" },
  { label: "Your Bees", filter: "yours" },
];

// Dummy data for all bees
const allBeeImages = [
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "user" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },
  { category: "earth", url: "/NFTs/WorkerBee.png", owner: "other" },

  // Additional dummy data...
];

// Dummy data for all queen bees
const queenBeeImages = [
  { category: "earth", url: "/NFTs/Queens/earth-queen.png", owner: "other" },
  { category: "ice", url: "/NFTs/Queens/ice-queen-sword.png", owner: "other" },
  // Additional dummy data...
];

function BeeGrid() {
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const is1440pxOrLower = useMediaQuery("(max-width:1440px)");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleMintClick = () => {
    window.open("https://dagora.xyz/launchpad/buzzkill", "_blank");
  };

  const handleBuyClick = () => {
    window.open("/mint", "_blank");
  };

  const filteredWorkerImages =
    selectedTab === "all"
      ? allBeeImages
      : allBeeImages.filter((image) => image.owner === "user");

  const filteredQueenImages =
    selectedTab === "all"
      ? queenBeeImages
      : queenBeeImages.filter((image) => image.owner === "user");

  const hasQueenBees = filteredQueenImages.length > 0;
  const hasWorkerBees = filteredWorkerImages.length > 0;

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "4px",
        padding: "20px",
        height: "80vh", // Height relative to the viewport
        overflowY: "auto", // Enables vertical scrolling for the entire container
        boxSizing: "border-box", // Include padding in the width calculation
        margin: "0 auto", // Center the BeeGrid
        maxWidth: "1200px", // Add a maximum width to contain the content within a reasonable space
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#68341B",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#E9B743", // 915E28
          borderRadius: "4px",
          border: "0.5px solid #E9B743", // Optional: To add space around the thumb
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#915E28", // Color change on hover
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
          borderRadius: "8px",
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
              fontSize: "1.25rem", // Adjust the font size
            }}
          />
        ))}
      </Tabs>

      {/* Queen Bees Section */}
      {hasQueenBees && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: 36,
              color: "#D4AF37",
              mb: 2,
              ml: 3,
              textAlign: "left",
            }}
          >
            Queen Bees
          </Typography>

          <Box
            sx={{
              display: "flex", // Use flexbox to align items
              justifyContent: "center", // Center the Bee Containers horizontally
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2em", // Small gap between the Bee Containers
                width: "60%", // Ensure the inner Box takes up the full width of the parent Box
                maxWidth: "900px", // Control the maximum width to avoid stretching
                justifyContent: "center", // Ensure the items are centered within the grid
              }}
            >
              {filteredQueenImages.map((image, index) => (
                <BeeContainer key={index} imageUrl={image.url} />
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Worker Bees Section */}
      {hasWorkerBees && (
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: 36,
              color: "#D4AF37",
              mb: 2,
              ml: 3,
              textAlign: "left",
            }}
          >
            Worker Bees
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${is1440pxOrLower ? 3 : 4}, 1fr)`,
              gridAutoRows: "minmax(100px, auto)", // Adjust this value to control the height of each row
              gap: "2em 3em",
              padding: "2em",
              borderRadius: "4px",
              boxSizing: "border-box", // Include padding in the width calculation
            }}
          >
            {filteredWorkerImages.map((image, index) => (
              <BeeContainer key={index} imageUrl={image.url} />
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
            height: "80%", // Ensures the content takes up the full height of the parent container
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#D4AF37",
              mb: 4,
              fontSize: 38,
              maxWidth: "60%", // Constrains the width of the text to 50% of the parent container
              width: "100%", // Ensures the text takes up the full available width within the constraint
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
