import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useUserContext } from "@/context/UserContext"; // Adjust import path
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

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
      <Box
        sx={{
          width: "450px",
          height: "220px",
          padding: "16px",
          backgroundColor: "rgba(34, 46, 80, 0.6)", // Semi-transparent background
          borderRadius: "12px",
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Elevation for depth
          position: "relative", // Pseudo-element positioning
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            background:
              "linear-gradient(135deg, rgba(34, 46, 80, 0.6) 0%, rgba(215, 215, 215, 0.3) 97%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            zIndex: -1,
          },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "420px",
        height: "200px",
        padding: "20px",
        backgroundColor: "rgba(34, 46, 80, 0.75)", // More opaque background
        borderRadius: "16px",
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)", // Higher elevation
        position: "relative", // For pseudo-elements
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(34, 46, 80, 0.6) 0%, rgba(215, 215, 215, 0.3) 97%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
        },
      }}
    >
      {/* Left column with bee image */}
      <Box
        sx={{
          width: "40%",
          boxShadow:
            "0px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)", // Both shadows
          borderRadius: "8px", // Maintain rounded corners for the image
        }}
      >
        <Image
          src={activeBeeImage}
          alt={activeBee ? `Hatchling #${activeBee}` : "Placeholder"}
          layout="responsive"
          width={500}
          height={500}
          style={{ borderRadius: "8px" }}
        />
      </Box>

      {/* Right column with text and button */}
      <Box
        sx={{
          width: "55%",
          padding: "4px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Ensure top/bottom layout
          alignItems: "center",
        }}
      >
        {activeBee ? (
          <>
            {/* Typography at the top */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              {`Hatchling #${activeBee}`}
            </Typography>

            {/* Button towards the bottom */}
            <Box>
              <PrimaryButton text="My Bees" onClick={handleMyBeesClick} />
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
                  xs: "0.9rem",
                  sm: "1rem",
                  xxl: "1.2rem",
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
                textAlign: "justify",
                maxWidth: "480px", // Set maxWidth for the paragraph
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  xxl: "1.2rem",
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
  );
};

export default BeePanelCard;
