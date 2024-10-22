import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useUserContext } from "@/context/UserContext"; // Adjust import path
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard"; // Ensure correct path

// Dynamic import of the PrimaryButton to avoid SSR
const PrimaryButton = dynamic(
  () => import("@/components/Buttons/PrimaryButton/PrimaryButton"),
  { ssr: false }
);

const BeePanelCard: React.FC = () => {
  const { activeBee, bees, loadingBees } = useUserContext();
  const router = useRouter();

  const handleMyBeesClick = () => {
    router.push("/Play/User/Profile/MyBees");
  };

  const handleMintClick = () => {
    router.push("/Mint");
  };

  // Find the image of the activeBee if it exists
  const activeBeeImage =
    bees.find((bee) => bee.id === activeBee)?.imageAddress ||
    "/NFTs/WorkerBee.png";

  if (loadingBees) {
    return (
      <SemiTransparentCard
        sx={{
          width: "450px",
          height: "220px",
          padding: "16px",
          backgroundColor: "rgba(34, 46, 80, 0.6)",
        }} // Adjust transparency
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </SemiTransparentCard>
    );
  }

  return (
    <SemiTransparentCard
      transparency={0.85}
      sx={{
        width: "420px",
        height: "200px",
        padding: "20px",
      }} // Adjust transparency
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {/* Left column with bee image or placeholder */}
        <Box sx={{ width: "40%", padding: "4px" }}>
          <img
            src={activeBeeImage}
            alt={activeBee ? `Hatchling #${activeBee}` : "Placeholder"}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>

        {/* Right column with text and button */}
        <Box sx={{ width: "55%", padding: "4px", textAlign: "center" }}>
          {activeBee ? (
            <>
              {/* Container for Typography and Button */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start" // Start the text at the top
                alignItems="center" // Horizontally center the text and button
                sx={{
                  height: "100%", // Full height to distribute content
                }}
              >
                {/* Typography at the top */}
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center", // Keep text horizontally centered
                    mb: 4, // Ensure no top margin
                  }}
                >
                  <Typography variant="h6">
                    {`Hatchling #${activeBee}`}
                  </Typography>
                </Box>

                {/* Use flexGrow to push the button towards the center */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1, // Take up the remaining space to push the button down
                    mb: 6,
                  }}
                >
                  <PrimaryButton text="My Bees" onClick={handleMyBeesClick} />
                </Box>
              </Box>
            </>
          ) : bees.length > 0 ? (
            <>
              <Typography
                sx={{
                  mb: 3,
                  textAlign: "center",
                  maxWidth: "480px", // Set maxWidth for the paragraph
                  fontSize: {
                    xs: "0.9rem", // Smaller font for smaller screens
                    sm: "1rem", // Default font size for small-medium screens
                    xxl: "1.2rem", // Default font size for small-medium screens
                  },
                }}
              >
                Select Your Bee
              </Typography>
              <Box display="flex" justifyContent="center">
                <PrimaryButton text="My Bees" onClick={handleMyBeesClick} />
              </Box>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  mb: 3,
                  textAlign: "center",
                  maxWidth: "480px", // Set maxWidth for the paragraph
                  fontSize: {
                    xs: "0.9rem", // Smaller font for smaller screens
                    sm: "1rem", // Default font size for small-medium screens
                    xxl: "1.2rem", // Default font size for small-medium screens
                  },
                }}
              >
                You have no Hatchlings. <br></br>
                Mint yours here
              </Typography>
              <Box display="flex" justifyContent="center">
                <PrimaryButton text="Mint" onClick={handleMintClick} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </SemiTransparentCard>
  );
};

export default BeePanelCard;
