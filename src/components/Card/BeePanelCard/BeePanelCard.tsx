import React from "react";
import {
  Box,
  Typography,
  Skeleton,
  useMediaQuery,
  useTheme,
  Collapse,
  Fade,
  Tooltip,
} from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import Image from "next/image";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";

const BeePanelCard: React.FC = () => {
  const { activeBee, bees, stakedBees, loadingBees } = useUserContext();
  const theme = useTheme();
  const router = useRouter();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = React.useState(false);
  // Controls fade-in/fade-out of the details
  const [fadeIn, setFadeIn] = React.useState(false);

  // Enable fade-in as soon as expanded is set
  React.useEffect(() => {
    if (expanded) {
      setFadeIn(true);
    }
  }, [expanded]);

  const handleToggleExpand = () => {
    if (isSmallScreen) {
      if (!expanded) {
        setExpanded(true);
      } else {
        setFadeIn(false);
        // Wait for the Fade to complete before collapsing
        setTimeout(() => {
          setExpanded(false);
        }, 200);
      }
    }
  };

  const handleMyBeesClick = () => {
    router.push("/Play/User/Profile/MyBees");
  };

  const handleMintClick = () => {
    router.push("/Mint");
  };

  // Active bee image or fallback
  const activeBeeImage =
    bees.find((bee) => bee.id === activeBee)?.imageAddress ||
    "/NFTs/default-hatchling.png";

  // Loading state
  if (loadingBees) {
    return (
      <SemiTransparentCard
        sx={{
          width: {
            xs: "100px",
            sm: "120px",
            md: "360px",
            lg: "360px",
            xl: "430px",
          },
          height: {
            xs: "auto",
            sm: "120px",
            md: "160px",
            lg: "160px",
            xl: "220px",
          },
          padding: { xs: "8px", sm: "8px", md: "16px" },
          backgroundColor: "rgba(34, 46, 80, 0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: { sm: "6px", md: "8px" } }}
        />
      </SemiTransparentCard>
    );
  }

  return (
    <Box
      sx={{
        // Keep a larger width on small screens while details are visible/fading out
        width: {
          xs: isSmallScreen && !expanded ? "90px" : "100px",
          sm: isSmallScreen && !expanded ? "120px" : "290px",
          md: isSmallScreen && !expanded ? "280px" : "360px",
          lg: "360px",
          xl: "430px",
        },
        height: {
          xs: "auto",
          sm: "120px",
          md: "160px",
          lg: "160px",
          xl: "220px",
        },
        padding: {
          xs: "8px",
          sm: "16px",
          md: "24px",
          lg: "28px 24px",
        },
        gap: { sm: "4px", md: "20px", lg: "16px", xl: "0px" },
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        bgcolor: "rgba(15, 28, 48, 0.85)",
        borderRadius: { sm: "6px", md: "8px" },
        overflow: "hidden",
        zIndex: 1,
        backdropFilter: "blur(2px)",
        boxShadow:
          "inset 4px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.12)",
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
      {/* Tooltip on mobile when not expanded */}
      <Tooltip
        title={
          isSmallScreen && !expanded
            ? "Expand to see / Select your active bee"
            : ""
        }
        disableFocusListener={!isSmallScreen || expanded}
        disableHoverListener={!isSmallScreen || expanded}
        disableTouchListener={!isSmallScreen || expanded}
      >
        <DefaultButton
          variant="text"
          disableRipple
          onClick={handleToggleExpand}
          sx={{
            minWidth: 0,
            p: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Add left margin only if expanded on mobile
            marginLeft: isSmallScreen && expanded ? "12px" : 0,
            boxShadow:
              activeBeeImage !== "/NFTs/default-hatchling.png"
                ? "0px 4px 4px rgba(0, 0, 0, 0.25), -2px -2px 4px rgba(0, 0, 0, 0.25)"
                : "none",
            ":hover": {
              background: "none",
              transform: "scale(1.02)",
            },
            ":active": {
              transform: "scale(0.98)",
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
              borderRadius: "16px",
            }}
          />
        </DefaultButton>
      </Tooltip>

      {/* Collapse for mobile, always visible otherwise */}
      {isSmallScreen ? (
        <Collapse
          in={expanded}
          orientation="vertical"
          timeout={250}
          unmountOnExit
          sx={{
            width: "100%",
            padding: expanded ? "4px" : 0,
          }}
        >
          <Fade in={fadeIn} timeout={200} mountOnEnter unmountOnExit>
            <Box>
              <DetailsBox
                activeBee={activeBee}
                bees={bees}
                stakedBees={stakedBees}
                handleMyBeesClick={handleMyBeesClick}
                handleMintClick={handleMintClick}
              />
            </Box>
          </Fade>
        </Collapse>
      ) : (
        <DetailsBox
          activeBee={activeBee}
          bees={bees}
          stakedBees={stakedBees}
          handleMyBeesClick={handleMyBeesClick}
          handleMintClick={handleMintClick}
        />
      )}
    </Box>
  );
};

interface DetailsBoxProps {
  activeBee: number | null;
  bees: Array<any>;
  stakedBees: Array<any>;
  handleMyBeesClick: () => void;
  handleMintClick: () => void;
}

const DetailsBox: React.FC<DetailsBoxProps> = ({
  activeBee,
  bees,
  stakedBees,
  handleMyBeesClick,
  handleMintClick,
}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "55%" },
        padding: { xs: "8px", sm: "4px", md: "4px" },
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
              mb: { xs: 1, sm: 1, md: 1.8 },
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
              sx={{
                padding: { sm: "2px 32px", md: "4px 32px", lg: "8px 32px" },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default BeePanelCard;
