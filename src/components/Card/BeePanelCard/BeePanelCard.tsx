import React from "react";
import {
  Box,
  Typography,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    "/NFTs/default-hatchling.png";

  if (loadingBees) {
    return (
      <SemiTransparentCard
        sx={{
          width: { xs: "300px", sm: "420px" },
          height: { xs: "180px", sm: "220px" },
          padding: { xs: "12px", sm: "16px" },
          backgroundColor: "rgba(34, 46, 80, 0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: "6px" }}
        />
      </SemiTransparentCard>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: "100px", sm: "290px", md: "430px" },
        height: { xs: "auto", sm: "120px", md: "220px" },
        padding: { xs: "16px", sm: "16px 16px", md: "28px 32px" },
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        bgcolor: "rgba(15, 28, 48, 0.85)",
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
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "40%", md: "40%", lg: "50%" },
          padding: { xs: "0px", sm: "0px", md: "0px", lg: "12px" },
          boxShadow:
            activeBeeImage !== "/NFTs/default-hatchling.png"
              ? `0px 4px 4px rgba(0, 0, 0, 0.25),
                 -2px -2px 4px rgba(0, 0, 0, 0.25)`
              : "none",
          borderRadius: "8px",
          mb: { xs: 2, sm: 0 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            borderRadius: "12px",
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "55%" },
          padding: "4px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {activeBee ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                mb: { xs: 2, sm: 4 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                    md: "1.2rem",
                  },
                }}
              >
                {`Hatchling #${activeBee}`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                mb: { xs: 2, sm: 6 },
              }}
            >
              <PrimaryButton text="Hatchlings" onClick={handleMyBeesClick} />
            </Box>
          </Box>
        ) : bees.length > 0 || stakedBees.length > 0 ? (
          <>
            <Typography
              sx={{
                mb: { xs: 1, sm: 0, md: 3 },
                textAlign: "center",
                maxWidth: "480px",
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.4rem",
                  md: "1rem",
                },
                whiteSpace: "pre-line",
              }}
            >
              {bees.length > 0
                ? "Select Your Hatchling"
                : "You have staked Hatchlings\n View them here"}
            </Typography>
            <Box display="flex" justifyContent="center">
              <PrimaryButton text="Hatchlings" onClick={handleMyBeesClick} />
            </Box>
          </>
        ) : (
          <>
            <Typography
              sx={{
                mb: { xs: 1, sm: 1, md: 3 },
                textAlign: "center",
                maxWidth: "490px",
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.8rem",
                  md: "1rem",
                },
              }}
            >
              You have no Hatchlings.
              <br />
              Mint yours here
            </Typography>
            <Box display="flex" justifyContent="center">
              <PrimaryButton
                text="Mint"
                onClick={handleMintClick}
                sx={{ padding: { sm: "2px 32px", md: "8px 32px" } }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BeePanelCard;
