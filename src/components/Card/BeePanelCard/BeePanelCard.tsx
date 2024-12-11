import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useUserContext } from "@/context/UserContext"; // Adjust import path
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard"; // Ensure correct path
import Image from "next/image";
// Dynamic import of the PrimaryButton to avoid SSR
const PrimaryButton = dynamic(
  () => import("@/components/Buttons/PrimaryButton/PrimaryButton"),
  { ssr: false }
);

const BeePanelCard: React.FC = () => {
  const { activeBee, bees, stakedBees, loadingBees } = useUserContext();
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
    <Box
      sx={{
        width: "420px",
        height: "220px",
        padding: "28px 32px",
        position: "relative", // Needed for the pseudo-element to work
        display: "flex",
        flexDirection: "column",
        backgroundColor: `rgba(34, 46, 80, 0.8)`, // Dynamic transparency
        borderRadius: "8px", // Rounded corners
        overflow: "hidden", // Ensure the pseudo-element stays within the box
        zIndex: 1, // Ensure content is above the pseudo-element
        backdropFilter: "blur(2px)",
        // Inner Shadows
        boxShadow: `
          inset 4px 4px 4px rgba(0, 0, 0, 0.25), // First inner shadow (X: 4px, Y: 4px, Blur: 4px, Color: rgba(0, 0, 0, 0.25))
          inset 0px 4px 4px rgba(0, 0, 0, 0.12)  // Second inner shadow (X: 0px, Y: 4px, Blur: 4px, Color: rgba(0, 0, 0, 0.12))
        `,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit", // Inherit border radius for gradient
          background:
            "linear-gradient(135deg,  #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)", // Golden gradient
          padding: "3px", // Border width
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor", // Apply the mask to make only the border show gradient
          maskComposite: "exclude",
          zIndex: -1, // Make sure it's behind the content
        },
      }} // Adjust transparency
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        {/* Left column with bee image or placeholder */}
        <Box
          sx={{
            width: "40%",
            padding: "0px",
            boxShadow: `
              0px 4px 4px rgba(0, 0, 0, 0.25), 
              -2px -2px 4px rgba(0, 0, 0, 0.25)  
            `,
            borderRadius: "8px", // Ensure the shadow follows the image's rounded corners
          }}
        >
          <Image
            src={activeBeeImage}
            alt={activeBee ? `Hatchling #${activeBee}` : "Placeholder"}
            width={320}
            height={320}
            style={{
              objectFit: "contain", // Maintain aspect ratio while fitting inside the container
              height: "100%", // Take up the full height of the parent container
              width: "auto", // Dynamically adjust width to maintain aspect ratio
              borderRadius: "8px", // Ensure the image itself has rounded corners
            }}
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
          ) : bees.length > 0 || stakedBees.length > 0 ? (
            <>
              <Typography
                sx={{
                  mb: 3,
                  textAlign: "center",
                  maxWidth: "480px", // Set maxWidth for the paragraph
                  fontSize: {
                    xs: "0.9rem", // Smaller font for smaller screens
                    sm: "1rem", // Default font size for small-medium screens
                    xxl: "1.2rem", // Larger font size for extra extra large screens
                  },
                }}
              >
                {bees.length > 0 ? (
                  "Select Your Bee"
                ) : (
                  <>
                    You have staked Bees
                    <br />
                    View them here
                  </>
                )}
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
                You have no Hatchlings. <br />
                Mint yours here
              </Typography>
              <Box display="flex" justifyContent="center">
                <PrimaryButton text="Mint" onClick={handleMintClick} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BeePanelCard;
