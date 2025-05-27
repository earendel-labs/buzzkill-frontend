// components/BeePanelCard.tsx
"use client";

import React, { useState, useEffect } from "react";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { useUserContext } from "@/context/UserContext";
import { useBuzzkillOriginsContext } from "@/context/BuzzkillOriginsContext";

/* -------------------------------------------------------------------------- */

const BeePanelCard: React.FC = () => {
  /* ---------- contexts ---------- */
  const { activeBee, bees, stakedBees, loadingBees } = useUserContext();
  const { buzzkillOriginBees } = useBuzzkillOriginsContext();

  /* ---------- hooks ---------- */
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  /* ---------- local state ---------- */
  const [expanded, setExpanded] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // controls Fade visibility

  /* ---------- effects ---------- */
  useEffect(() => {
    if (expanded) setFadeIn(true);
  }, [expanded]);

  /* ---------- handlers ---------- */
  const handleToggleExpand = () => {
    if (!isSmallScreen) return;

    if (!expanded) {
      setExpanded(true);
    } else {
      setFadeIn(false);
      setTimeout(() => setExpanded(false), 200); // wait for Fade-out
    }
  };

  const handleMyBeesClick = () => router.push("/Play/User/Profile/MyBees");

  const handleBuyCharactersClick = () =>
    router.push("https://dagora.xyz/launchpad/buzzkill-origins");

  /* ---------- derived ---------- */
  const activeBeeImage =
    bees.find((b) => b.id === activeBee)?.imageAddress ||
    "/NFTs/default-hatchling.png";

  /* ---------- loading ---------- */
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
          p: { xs: 1, sm: 1, md: 2 },
          bgcolor: "rgba(34, 46, 80, 0.6)",
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

  /* ---------- render ---------- */
  return (
    <Box
      sx={{
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
        p: { xs: 1, sm: 2, md: 3, lg: "28px 24px" },
        gap: { sm: 0.5, md: 2.5, lg: 2 },
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        bgcolor: "rgba(15, 28, 48, 0.85)",
        borderRadius: { sm: "6px", md: "8px" },
        overflow: "hidden",
        zIndex: 1,
        backdropFilter: "blur(2px)",
        boxShadow:
          "inset 4px 4px 4px rgba(0,0,0,0.25), inset 0px 4px 4px rgba(0,0,0,0.12)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)",
          padding: "3px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
        },
      }}
    >
      {/* ---------- thumbnail ---------- */}
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
            marginLeft: isSmallScreen && expanded ? "12px" : 0,
            boxShadow:
              activeBeeImage !== "/NFTs/default-hatchling.png"
                ? "0px 4px 4px rgba(0,0,0,0.25), -2px -2px 4px rgba(0,0,0,0.25)"
                : "none",
            "&:hover": { background: "none", transform: "scale(1.02)" },
            "&:active": { transform: "scale(0.98)" },
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

      {/* ---------- details ---------- */}
      {isSmallScreen ? (
        <Collapse
          in={expanded}
          orientation="vertical"
          timeout={250}
          unmountOnExit
          sx={{ width: "100%", p: expanded ? 0.5 : 0 }}
        >
          <Fade in={fadeIn} timeout={200} mountOnEnter unmountOnExit>
            <Box>
              <DetailsBox
                activeBee={activeBee}
                bees={bees}
                stakedBees={stakedBees}
                buzzkillOriginBees={buzzkillOriginBees}
                onMyBees={handleMyBeesClick}
                onBuyCharacters={handleBuyCharactersClick}
              />
            </Box>
          </Fade>
        </Collapse>
      ) : (
        <DetailsBox
          activeBee={activeBee}
          bees={bees}
          stakedBees={stakedBees}
          buzzkillOriginBees={buzzkillOriginBees}
          onMyBees={handleMyBeesClick}
          onBuyCharacters={handleBuyCharactersClick}
        />
      )}
    </Box>
  );
};

/* -------------------------------------------------------------------------- */

interface DetailsBoxProps {
  activeBee: number | null;
  bees: any[];
  stakedBees: any[];
  buzzkillOriginBees: any[];
  onMyBees: () => void;
  onBuyCharacters: () => void;
}

const DetailsBox: React.FC<DetailsBoxProps> = ({
  activeBee,
  bees,
  stakedBees,
  buzzkillOriginBees,
  onMyBees,
  onBuyCharacters,
}) => {
  /* ---------- priority 1: Buzzkill Origins ---------- */
  if (buzzkillOriginBees.length > 0) {
    return (
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "55%" },
          p: { xs: 1, sm: 1, md: 1 },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            mb: { xs: 1, sm: 1, md: 1.8 },
            whiteSpace: "pre-line",
            fontSize: { xs: "0.4rem", sm: "0.8rem", md: "1rem" },
          }}
        >
          {"You have Buzzkill NFTs\nView them here"}
        </Typography>
        <Box display="flex" justifyContent="center">
          <PrimaryButton
            text="View"
            onClick={onMyBees}
            sx={{ p: { sm: "2px 32px", md: "4px 32px", lg: "8px 32px" } }}
          />
        </Box>
      </Box>
    );
  }

  /* ---------- priority 2: Active hatchling ---------- */
  if (activeBee) {
    return (
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "55%" },
          p: { xs: 1, sm: 1, md: 1 },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", mb: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.4rem", sm: "0.8rem", md: "1rem" },
            }}
          >
            {`Hatchling #${activeBee}`}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, mb: { xs: 2, sm: 6 } }}>
          <PrimaryButton
            text="Hatchlings"
            onClick={onMyBees}
            sx={{ p: { sm: "2px 32px", md: "4px 32px", lg: "8px 32px" } }}
          />
        </Box>
      </Box>
    );
  }

  /* ---------- priority 3: Hatchlings list or staked ---------- */
  if (bees.length > 0 || stakedBees.length > 0) {
    return (
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "55%" },
          p: { xs: 1, sm: 1, md: 1 },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            mb: { xs: 1, sm: 1, md: 1.8 },
            whiteSpace: "pre-line",
            fontSize: { xs: "0.4rem", sm: "0.8rem", md: "1rem" },
          }}
        >
          {bees.length > 0
            ? "Select Your Hatchling"
            : "You have staked Hatchlings\nView them here"}
        </Typography>
        <Box display="flex" justifyContent="center">
          <PrimaryButton
            text="Hatchlings"
            onClick={onMyBees}
            sx={{ p: { sm: "2px 32px", md: "4px 32px", lg: "8px 32px" } }}
          />
        </Box>
      </Box>
    );
  }

  /* ---------- priority 4: No characters ---------- */
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "55%" },
        p: { xs: 1, sm: 1, md: 1 },
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          mb: { xs: 1, sm: 1, md: 1.8 },
          whiteSpace: "pre-line",
          fontSize: { xs: "0.4rem", sm: "0.8rem", md: "1rem" },
        }}
      >
        {"You have no characters.\nBuy them here"}
      </Typography>
      <Box display="flex" justifyContent="center">
        <PrimaryButton
          text="Buy"
          onClick={onBuyCharacters}
          sx={{ p: { sm: "2px 32px", md: "4px 32px", lg: "8px 32px" } }}
        />
      </Box>
    </Box>
  );
};

export default BeePanelCard;
