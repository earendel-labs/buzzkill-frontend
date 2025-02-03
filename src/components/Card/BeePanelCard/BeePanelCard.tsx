import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import Image from "next/image";

// Dynamic import of PrimaryButton to avoid SSR issues
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

  // Get the image for the active bee or a fallback image
  const activeBeeImage =
    bees.find((bee) => bee.id === activeBee)?.imageAddress ||
    "/NFTs/Hatchlings.JPEG";

  // Media query for resolution 1400x900 to reduce vertical height and adjust spacing
  const mediaQueryStyles = {
    "@media (min-width:1400px) and (max-height:900px)": {
      height: "180px",
      width: "360px",
      padding: "20px 24px",
    },
  };

  if (loadingBees) {
    return (
      <SemiTransparentCard
        sx={{
          width: "450px",
          height: "220px",
          padding: "16px",
          backgroundColor: "rgba(34, 46, 80, 0.6)",
          "@media (min-width:1400px) and (max-height:900px)": {
            height: "180px",
            width: "360px",
            padding: "12px",
          },
        }}
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
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(34, 46, 80, 0.8)",
        borderRadius: "8px",
        overflow: "hidden",
        zIndex: 1,
        backdropFilter: "blur(2px)",
        boxShadow: `
          inset 4px 4px 4px rgba(0, 0, 0, 0.25),
          inset 0px 4px 4px rgba(0, 0, 0, 0.12)
        `,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg,  #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)",
          padding: "3px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
        },
        ...mediaQueryStyles,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        {/* Left column with bee image */}
        <Box
          sx={{
            width: "40%",
            padding: "0px",
            boxShadow: `
              0px 4px 4px rgba(0, 0, 0, 0.25),
              -2px -2px 4px rgba(0, 0, 0, 0.25)
            `,
            borderRadius: "8px",
            "@media (min-width:1400px) and (max-height:900px)": {
              width: "35%",
            },
          }}
        >
          <Image
            src={activeBeeImage}
            alt={activeBee ? `Hatchling #${activeBee}` : "Placeholder"}
            width={320}
            height={320}
            style={{
              objectFit: "contain",
              height: "100%",
              width: "auto",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Right column with text and button */}
        <Box sx={{ width: "55%", padding: "4px", textAlign: "center" }}>
          {activeBee ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              {/* Hatchling number */}
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    "@media (min-width:1400px) and (max-height:900px)": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  {`Hatchling #${activeBee}`}
                </Typography>
              </Box>

              {/* Button container */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                  mb: 6,
                  "@media (min-width:1400px) and (max-height:900px)": {
                    mb: 4,
                  },
                }}
              >
                <PrimaryButton text="Hatchlings" onClick={handleMyBeesClick} />
              </Box>
            </Box>
          ) : bees.length > 0 || stakedBees.length > 0 ? (
            <>
              <Typography
                sx={{
                  mb: 3,
                  textAlign: "center",
                  maxWidth: "480px",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    xxl: "1.2rem",
                  },
                  "@media (min-width:1400px) and (max-height:900px)": {
                    fontSize: "1rem",
                  },
                }}
              >
                {bees.length > 0
                  ? "Select Your Hatchling"
                  : "You have staked Hatchlings\nView them here"}
              </Typography>
              <Box display="flex" justifyContent="center">
                <PrimaryButton text="Hatchlings" onClick={handleMyBeesClick} />
              </Box>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  mb: 3,
                  textAlign: "center",
                  maxWidth: "480px",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    xxl: "1.2rem",
                  },
                  "@media (min-width:1400px) and (max-height:900px)": {
                    fontSize: "0.8rem",
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
