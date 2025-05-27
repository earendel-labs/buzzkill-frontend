"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import ProfileLayout from "@/app/Play/User/Profile/Components/ProfileLayout/ProfileLayout";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useUserContext } from "@/context/UserContext";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { BeeCard } from "@/components/Card/BeeCard";
import BuzzkillOriginCard from "../Character/components/BuzzkillOriginCard"; // full-screen bee view

const MyBeesTab = () => {
  /* ------------------------------------------------------------------ */
  const { address } = useAccount(); // keeps TS happy; not yet used
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [tab, setTab] = useState<number>(0); // 0 = My Bees, 1 = My Hatchlings

  const {
    bees: myBees,
    stakedBees,
    loadingBees,
    fetchError,
    checkAndPromptApproval,
    setActiveBee,
  } = useUserContext();
  /* ------------------------------------------------------------------ */

  const handlePlayClick = async (beeId: number) => {
    const ok = await checkAndPromptApproval();
    if (ok) {
      setActiveBee(beeId);
      router.push("/Play");
    }
  };

  /* ---------- pill-style tab SX ---------- */
  const pillTabSx = (idx: number) => ({
    px: { xs: 2.5, md: 3.5 },
    py: 1, // slightly reduced vertical padding
    height: "32px", // explicit height helps trim excess
    minHeight: "unset", // override MUI default 48px
    lineHeight: 1.2, // stop font from bloating vertical space
    borderRadius: 2,
    fontWeight: 700,
    fontSize: isMobile ? 16 : 18,
    textTransform: "none",
    color: tab === idx ? theme.palette.Gold.dark : theme.palette.GoldFaded.main,
    backgroundColor:
      tab === idx ? theme.palette.Gold.main + "1A" : "transparent",
    "&:hover": {
      backgroundColor: theme.palette.Gold.main + "1A",
      color: theme.palette.Gold.dark,
    },
    mx: 0.5,
  });

  /* ============================== RENDER ============================= */
  return (
    <ProfileLayout loading={loadingBees}>
      {/* ░░ Secondary nav – left-aligned ░░ */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Paper
          elevation={0}
          sx={{
            px: 1,
            py: 1,
            backgroundColor: "rgba(0,0,0,0.10)",
            borderRadius: 2,
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              minHeight: "unset", // kill excess height
              height: "auto", // let it size to content
            }}
          >
            <Tab label="My Bees" sx={pillTabSx(0)} />
            <Tab label="My Hatchlings" sx={pillTabSx(1)} />
          </Tabs>
        </Paper>
      </Box>

      {/* ─────────────────────  TAB 0 : MY BEES  ───────────────────── */}
      {tab === 0 && (
        <Box sx={{ width: "100%" }}>
          {/* BuzzkillOriginCard already handles its inner layout */}
          <BuzzkillOriginCard />
        </Box>
      )}

      {/* ─────────────────  TAB 1 : MY HATCHLINGS GRID  ─────────────── */}
      {tab === 1 && (
        <Box sx={{ ml: 2 }}>
          {/* ——— Unstaked ——— */}
          <Typography variant="h6" color="white" sx={{ my: 2 }}>
            Unstaked Hatchlings
          </Typography>

          <Grid container spacing={3}>
            {!loadingBees &&
            myBees.length === 0 &&
            stakedBees.length === 0 &&
            !fetchError ? (
              <Grid item xs={12}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography mb={3}>
                    No Hatchlings found. Mint yours here
                  </Typography>
                  <PrimaryButton
                    text="Mint"
                    onClick={() => router.push("/Mint")}
                  />
                </Box>
              </Grid>
            ) : !loadingBees &&
              myBees.length === 0 &&
              stakedBees.length > 0 &&
              !fetchError ? (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography>No Unstaked Hatchlings</Typography>
                </Box>
              </Grid>
            ) : (
              myBees.map((b) => (
                <Grid key={b.id} item xs={12} sm={6} md={4}>
                  <BeeCard
                    bee={b}
                    onPlayClick={handlePlayClick}
                    isOwnedByUser
                    variant="myBees"
                  />
                </Grid>
              ))
            )}
          </Grid>

          {/* ——— Staked ——— */}
          <Typography variant="h6" color="white" sx={{ mt: 4, mb: 2 }}>
            Staked Hatchlings
          </Typography>

          <Grid container spacing={3} mb="5rem">
            {!loadingBees && stakedBees.length === 0 && !fetchError ? (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography>No Staked Hatchlings found</Typography>
                </Box>
              </Grid>
            ) : (
              stakedBees.map((b) => (
                <Grid key={b.id} item xs={12} sm={6} md={4}>
                  <BeeCard
                    bee={b}
                    onPlayClick={handlePlayClick}
                    isOwnedByUser
                    variant="myBees"
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}

      {/* loaders / errors */}
      {loadingBees && (
        <Box display="flex" justifyContent="center" mt={4}>
          <HexagonSpinner />
        </Box>
      )}
      {fetchError && (
        <Typography variant="h6" color="error" align="center">
          Failed to load Hatchlings — try again in a few minutes.
        </Typography>
      )}
    </ProfileLayout>
  );
};

export default MyBeesTab;
