// components/CharacterDashboard.tsx
// TODO: This is no longer used, we could delete this
"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Snackbar,
  Typography,
  LinearProgress,
} from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import Layout from "@/components/Layouts/Layout/Layout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import LeftButton from "@/components/Buttons/CarouselNavigation/LeftButton";
import RightButton from "@/components/Buttons/CarouselNavigation/RightButton";
import UpgradeDialog from "./components/UpgradeDialog";
import BeeHeader from "./components/BeeHeader";
import StatsTab from "./components/StatsTab";
import TraitsTab from "./components/TraitsTab";
import UpgradesTab from "./components/UpgradesTab";
import { useBuzzkillOriginsContext } from "@/context/BuzzkillOriginsContext";
import StyledModal from "@/components/Modals/StyledModal/StyledModal";
import type { BeeStats } from "@/types/OriginsStats";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { formatNumber } from "@/utils/formatNumber";

export default function CharacterDashboard() {
  const { buzzkillOriginBees, loading, refreshBuzzkillOriginBees } =
    useBuzzkillOriginsContext();

  /* ---------- local state ---------- */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [honey, setHoney] = useState(3356);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState("");
  const [tabValue, setTabValue] = useState(0);

  /* ---------- snackbar ---------- */
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");
  const closeSnackbar = () => setSnackbarOpen(false);

  /* ---------- modal ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [initialising, setInitialising] = useState(false);
  const [initResult, setInitResult] = useState<{
    tokenId: number;
    points: number;
    phase: string;
  } | null>(null);

  /* ---------- progress bar ---------- */
  const [progress, setProgress] = useState(100);

  /* auto-close in 2 s (100 ms tick, –5 each) */
  useEffect(() => {
    if (modalOpen && !initialising && initResult) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p <= 0) {
            clearInterval(interval);
            setModalOpen(false);
            return 0;
          }
          return p - 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [modalOpen, initialising, initResult]);

  /* ---------- initialise bee ---------- */
  const initializeBee = useCallback(async () => {
    const tokenId = Number(buzzkillOriginBees[currentIndex].id);

    setInitialising(true);
    setInitResult(null);
    setModalOpen(true);

    setSnackbarMsg("Initialising…");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    try {
      const res = await fetch(
        "/api/buzzkill-origins/initialiseBuzzkillOrigins",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      setInitResult({
        tokenId,
        points: data.points,
        phase: data.phase,
      });
      setInitialising(false);

      setSnackbarMsg(`Initialised you earned ${formatNumber(data.points)} pts`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      await refreshBuzzkillOriginBees();
    } catch (err: any) {
      setModalOpen(false);
      setInitialising(false);
      setSnackbarMsg(`Init failed: ${err.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [buzzkillOriginBees, currentIndex, refreshBuzzkillOriginBees]);

  /* ---------- guards ---------- */
  if (loading) return <Layout>Loading your Buzzkill Origins…</Layout>;
  if (!buzzkillOriginBees.length) return <Layout>No bees found.</Layout>;

  const currentBee: BeeStats = buzzkillOriginBees[currentIndex];

  /* ---------- handlers ---------- */
  const leftDisabled = currentIndex === 0;
  const rightDisabled = currentIndex === buzzkillOriginBees.length - 1;
  const showPrev = () => !leftDisabled && setCurrentIndex((i) => i - 1);
  const showNext = () => !rightDisabled && setCurrentIndex((i) => i + 1);
  const handleTabChange = (_: unknown, v: number) => setTabValue(v);
  const openUpgradeDialog = (stat: string) => {
    setSelectedStat(stat.toLowerCase());
    setUpgradeDialogOpen(true);
  };

  const upgradeStat = () => {
    const cost = 500;
    if (honey < cost) {
      setUpgradeDialogOpen(false);
      return;
    }
    setHoney((h) => h - cost);
    switch (selectedStat) {
      case "attack":
        currentBee.attack += 5;
        break;
      case "defence":
        currentBee.defence += 5;
        break;
      case "foraging":
        currentBee.foraging += 5;
        break;
      case "energy":
        currentBee.maxEnergy += 10;
        break;
      case "health":
        currentBee.maxHealth += 10;
        break;
      case "yield":
        currentBee.maxYield += 10;
        break;
    }
    setUpgradeDialogOpen(false);
  };

  /* ---------- render ---------- */
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 2,
        }}
      >
        <SemiTransparentCard
          sx={{
            width: "100%",
            maxWidth: 1400,
            minHeight: { xs: 500, md: 600 },
            py: 1,
            px: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <LeftButton disabled={leftDisabled} onClick={showPrev} />
            </Grid>

            <Grid item xs>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={5}>
                  <BeeHeader beeStats={currentBee} honey={honey} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ py: 1, mb: 1 }}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{
                        minHeight: 36,
                        "& .MuiTab-root": {
                          fontSize: "1.1rem",
                          minHeight: 36,
                          p: "6px 12px",
                        },
                        "& .MuiTabs-indicator": { height: 3 },
                      }}
                    >
                      <Tab label="Stats" />
                      <Tab label="Traits" />
                      <Tab label="Upgrades" />
                    </Tabs>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    {tabValue === 0 && (
                      <StatsTab
                        beeStats={currentBee}
                        openUpgradeDialog={openUpgradeDialog}
                        initializeBee={initializeBee}
                        initialising={initialising}
                      />
                    )}
                    {tabValue === 1 && <TraitsTab beeStats={currentBee} />}
                    {tabValue === 2 && (
                      <UpgradesTab
                        beeStats={currentBee}
                        openUpgradeDialog={openUpgradeDialog}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <RightButton disabled={rightDisabled} onClick={showNext} />
            </Grid>
          </Grid>
        </SemiTransparentCard>
      </Box>

      <UpgradeDialog
        upgradeDialogOpen={upgradeDialogOpen}
        setUpgradeDialogOpen={setUpgradeDialogOpen}
        selectedStat={selectedStat}
        honey={honey}
        upgradeStat={upgradeStat}
      />

      {/* init / success modal */}
      <StyledModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {initialising && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              p: 3,
            }}
          >
            <HexagonSpinner />
            <Typography align="center">
              Initialising Buzzkill&nbsp;Origins #
              {buzzkillOriginBees[currentIndex].id} …
            </Typography>
          </Box>
        )}

        {!initialising && initResult && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 3,
              p: 3,
              width: "100%",
              position: "relative",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Initialised Buzzkill&nbsp;Origins #{initResult.tokenId}
            </Typography>
            <Typography variant="body1">
              Earned {formatNumber(initResult.points)} pts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phase {initResult.phase}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 4,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#FFD700",
                },
              }}
            />
          </Box>
        )}
      </StyledModal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          severity={snackbarSeverity}
          variant="filled"
          elevation={6}
          onClose={closeSnackbar}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </Layout>
  );
}
